"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { content } from "@/config/content";

// useLayoutEffect on the client so sizing lands before first paint (no visible
// shift); plain useEffect during SSR to avoid the React server warning.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Env override wins (e.g. a test slug on preview); otherwise the committed slug is used.
const BOOKING_SLUG = process.env.NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG || content.brand.bookingSlug;

/* Sizing model - all in px, deliberately: the host page is rem-sized and users run
   OS/browser font scaling that inflates rem, but the app inside the iframe keeps its
   own 16px root. Sizing the box in px keeps box and content in lockstep.

   Desktop shows ONLY the app's calendar panel, scaled up: the iframe is pinned to a
   fixed 1356px internal viewport (measured against the live app - it centers a
   ~1157px content block there, intro card left, calendar panel at x 700-1290 with
   content in y 64-600, including a full day's slot list AND the confirm-booking step,
   which renders inside the same panel - verified by driving the flow). The intro
   card duplicates the thank-you page copy, so it's cropped away via negative margins
   and the panel is scaled to the largest size the viewport height allows (cap 1.25x).
   The box is sized exactly to the scaled panel and centered in its column.

   Mobile (<700px column) keeps the app's stacked layout, viewport-fit, no crops. */
const FRAME_W = 1356; // fixed internal viewport width the panel geometry is measured at
// The app's grid reflows between states (fresh: panel at x~596; confirm step: x~710),
// so crop at the leftmost edge - later states just show a slim background band left.
const PANEL_LEFT = 590;
const PANEL_RIGHT = 1290;
const PANEL_TOP = 64;
const PANEL_BOTTOM = 600;
const MAX_SCALE = 1.4;
// Mobile (stacked app layout): intro card ends ~355px in, content ends ~890px -
// same crop idea, tuned with a safety band since the card height varies with width.
const MOBILE_SCALE = 0.75;
const MOBILE_TOP = 330;
const MOBILE_BOTTOM = 890;

export function BookingWidget() {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [colWidth, setColWidth] = useState(0);
  const [availH, setAvailH] = useState(0);
  const resetOnce = useRef(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () => {
      setColWidth(el.parentElement?.clientWidth ?? el.clientWidth);
      // The widget should fill the viewport below the header: available height =
      // viewport minus everything above the box (measured, so it tracks the
      // rem-sized header at any font scaling) minus a small bottom inset.
      const docTop = el.getBoundingClientRect().top + window.scrollY;
      setAvailH(window.innerHeight - docTop - 12);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el.parentElement ?? el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const panelW = PANEL_RIGHT - PANEL_LEFT;
  const panelH = PANEL_BOTTOM - PANEL_TOP;
  // Assume desktop until measured (the layout effect corrects before paint), so
  // the iframe never boots in one regime and re-lays-out into another.
  const desktop = colWidth === 0 || colWidth >= 700;
  const scale = !desktop
    ? MOBILE_SCALE
    : colWidth === 0
      ? 1
      : Math.max(0.6, Math.min(MAX_SCALE, availH / panelH, colWidth / panelW));
  const boxStyle: React.CSSProperties = desktop
    ? { width: Math.round(panelW * scale), maxWidth: "100%", height: Math.round(panelH * scale) }
    : { height: Math.round((MOBILE_BOTTOM - MOBILE_TOP) * MOBILE_SCALE) };
  const frameStyle: React.CSSProperties = desktop
    ? {
        width: FRAME_W,
        height: PANEL_BOTTOM, // internal viewport ends at the panel's content bottom
        marginLeft: -Math.round(PANEL_LEFT * scale),
        marginTop: -Math.round(PANEL_TOP * scale),
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }
    : {
        width: `${100 / MOBILE_SCALE}%`,
        height: MOBILE_BOTTOM, // internal viewport ends at the stacked content bottom
        marginTop: -Math.round(MOBILE_TOP * MOBILE_SCALE),
        transform: `scale(${MOBILE_SCALE})`,
        transformOrigin: "top left",
      };

  useEffect(() => {
    if (!BOOKING_SLUG) return;
    // No-www is the canonical host (www 301-redirects here); avoids a redirect hop in the frame.
    const base = `https://wayfindercollective.io/book/team/${BOOKING_SLUG}`;
    let qs = "";
    try {
      const raw = sessionStorage.getItem("bookingPrefill");
      if (raw) {
        const p = JSON.parse(raw);
        const params = new URLSearchParams();
        if (p.name) params.set("name", p.name);
        if (p.email) params.set("email", p.email);
        if (p.phone) params.set("phone", p.phone);
        qs = params.toString() ? `?${params.toString()}` : "";
        sessionStorage.removeItem("bookingPrefill");
      }
    } catch {}
    setUrl(base + qs);

    const t = setTimeout(() => setTimedOut(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const externalLink = BOOKING_SLUG ? `https://wayfindercollective.io/book/team/${BOOKING_SLUG}` : "#";

  const onIframeLoad = () => {
    setLoaded(true);
    // Reveal as soon as the app's document is ready. A short 250ms hold + the
    // 300ms opacity fade smooth the app's availability-check relayout without the
    // long spinner that made the widget feel slow next to the instant video.
    setTimeout(() => setRevealed(true), 250);
    // The embedded calendar auto-focuses a control on load, which makes the browser
    // scroll the whole page down to it (past the heading). Reset to top once, right
    // after the first load, to keep the confirmation heading in view.
    if (!resetOnce.current) {
      resetOnce.current = true;
      window.scrollTo({ top: 0 });
      setTimeout(() => window.scrollTo({ top: 0 }), 250);
    }
  };

  // Not configured (local review) — show a clear placeholder, never a broken iframe.
  if (!BOOKING_SLUG) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border-strong bg-surface/50 p-10 text-center min-h-[420px]">
        <div>
          <p className="text-primary font-medium mb-2">Booking calendar</p>
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            The Wayfinder booking widget appears here once{" "}
            <code className="text-platinum">NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG</code> is set. Prefill (name / email /
            phone) is already wired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={boxRef} className="relative overflow-hidden rounded-2xl border border-border bg-surface" style={boxStyle}>
        {!revealed && !timedOut && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {timedOut && !loaded ? (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <p className="text-foreground font-medium mb-3">Taking longer than usual to load.</p>
              <a href={externalLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Your Call Now
              </a>
            </div>
          </div>
        ) : (
          url && (
            <iframe
              src={url}
              title="Book your discovery call"
              onLoad={onIframeLoad}
              allow="camera; microphone; payment"
              className="border-0 transition-opacity duration-300"
              style={{ ...frameStyle, opacity: revealed ? 1 : 0 }}
            />
          )
        )}
      </div>

      {/* Always-available escape hatch: covers CSP frame-ancestors blocks, strict privacy
          settings, etc. - the embed can silently fail without triggering the load timeout. */}
      <p className="mt-2 text-center text-xs text-muted-dim">
        Calendar not loading?{" "}
        <a href={externalLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
          Open it in a new tab
        </a>
      </p>
    </div>
  );
}
