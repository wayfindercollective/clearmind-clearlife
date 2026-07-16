"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/config/content";

// Env override wins (e.g. a test slug on preview); otherwise the committed slug is used.
const BOOKING_SLUG = process.env.NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG || content.brand.bookingSlug;

// Visual zoom applied to the embedded booking app (iframe rendered at 1/SCALE size,
// scaled back down). 0.75 shows the intro card AND the date grid in one viewport-height
// widget without inner scrolling; below ~0.7 the app's small labels get hard to read.
const SCALE = 0.75;

export function BookingWidget() {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const resetOnce = useRef(false);

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
      {/* The embedded booking page is a full standalone app (cross-origin, so we can't
          read its content height or restyle it, and it emits no resize postMessage).
          The iframe is rendered oversized and CSS-scaled down (SCALE) so the app keeps
          its two-column desktop layout (breakpoint 1024px internal - measured; don't
          raise SCALE above ~0.77 or it collapses to the tall stacked layout).

          Desktop sizing is fit-to-content, measured against the live booking app at
          this internal width: content starts 64px in (48px at SCALE - cropped via
          --crop + negative margin) and ends by ~740px internal even with a full day's
          time-slot list open, so a 32.5rem container shows the whole flow with no dead
          band under the date grid. Mobile keeps --crop 0 (the stacked layout only has
          ~16px top padding) and stays viewport-fit. */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface [--crop:0px] lg:[--crop:48px] h-[calc(100svh-13rem)] lg:h-[min(32.5rem,calc(100svh-8.5rem))] min-h-[420px]">
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
                width: `${100 / SCALE}%`,
                // the cropped band still needs rendering, so the iframe is taller by crop/SCALE
                height: `calc(${100 / SCALE}% + calc(var(--crop) / ${SCALE}))`,
                marginTop: "calc(var(--crop) * -1)",
                transform: `scale(${SCALE})`,
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
