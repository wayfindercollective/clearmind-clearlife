"use client";

import { useEffect, useState } from "react";

const BOOKING_SLUG = process.env.NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG;

export function BookingWidget() {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!BOOKING_SLUG) return;
    const base = `https://www.wayfindercollective.io/book/team/${BOOKING_SLUG}`;
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

  const externalLink = BOOKING_SLUG ? `https://www.wayfindercollective.io/book/team/${BOOKING_SLUG}` : "#";

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
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface" style={{ height: "calc(100vh - 4rem)", minHeight: 560 }}>
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
            onLoad={() => setLoaded(true)}
            allow="camera; microphone; payment"
            className="w-full border-0"
            style={{ height: "calc(100vh + 420px)", marginTop: -420 }}
          />
        )
      )}
    </div>
  );
}
