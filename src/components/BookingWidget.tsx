"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/config/content";

// Env override wins (e.g. a test slug on preview); otherwise the committed slug is used.
const BOOKING_SLUG = process.env.NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG || content.brand.bookingSlug;

/* Sizing model - all in px, deliberately: the host page is rem-sized and users run
   OS/browser font scaling that inflates rem, but the app inside the iframe keeps its
   own 16px root. Sizing the box in px keeps box and content in lockstep.

   Numbers measured against the live booking app:
   - two-column layout needs >= ~1030px of internal width (breakpoint is 1024)
   - in that layout, content starts 64px in (croppable padding) and ends by ~740px
     internal even with a full day's time-slot list open
   The widget renders the iframe oversized at the largest scale that preserves the
   two-column layout for its column width, then crops the top and cuts the box at
   content height - so the calendar is as large as the column allows, with no dead
   band. Narrow columns (mobile) keep the app's stacked layout at a fixed 0.75. */
const TWO_COL_INTERNAL = 1040;
const TOP_PAD = 64;
const CONTENT_BOTTOM = 740;
const MOBILE_SCALE = 0.75;

export function BookingWidget() {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [colWidth, setColWidth] = useState(0);
  const resetOnce = useRef(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () => setColWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // >= 700px of column: desktop regime, scale up as far as the column allows
  // (capped at 1:1) while keeping the internal width two-column. Below that,
  // the app's stacked mobile layout at a readable fixed scale.
  const desktop = colWidth >= 700;
  const scale = desktop ? Math.min(1, colWidth / TWO_COL_INTERNAL) : MOBILE_SCALE;
  const crop = desktop ? TOP_PAD * scale : 0;
  const boxStyle: React.CSSProperties = desktop
    ? { height: `min(${Math.round((CONTENT_BOTTOM - TOP_PAD) * scale)}px, calc(100svh - 8rem))` }
    : { height: "calc(100svh - 13rem)", minHeight: 420 };

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
        {!loaded && !timedOut && (
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
              className="border-0"
              style={{
                width: `${100 / scale}%`,
                // the cropped band still needs rendering, so the iframe is taller by crop/scale
                height: `calc(${100 / scale}% + ${Math.round(crop / scale)}px)`,
                marginTop: -crop,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
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
