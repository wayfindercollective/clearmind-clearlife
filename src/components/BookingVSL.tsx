"use client";

import { useRef, useState } from "react";
import { content } from "@/config/content";
import { track } from "@/lib/analytics";

/**
 * The short video Dan added to the booking page, mirrored here on the thank-you
 * page under the steps. Autoplays MUTED on load (the only autoplay browsers allow);
 * a "Tap for sound" affordance unmutes AND restarts from the top, so the visitor
 * hears it from the beginning with audio. Source is hotlinked from the booking
 * app's Cloudflare R2 bucket (per Nathan) - if it ever 404s, swap the URL.
 */
export function BookingVSL() {
  const ref = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);

  const enableSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    el.currentTime = 0; // restart so they hear it from the start
    el.play().catch(() => {});
    setWithSound(true);
    track("booking_vsl_unmuted", {});
  };

  return (
    <figure className="mx-auto w-full max-w-[280px] lg:max-w-none">
      <div className="relative overflow-hidden rounded-xl border border-border bg-black aspect-[9/16]">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={ref}
          src={content.thankYou.vslSrc}
          autoPlay
          muted
          loop={!withSound}
          playsInline
          preload="auto"
          controls={withSound}
          className="h-full w-full object-cover"
          onEnded={() => setWithSound(false)}
        />

        {!withSound && (
          <button
            type="button"
            onClick={enableSound}
            aria-label="Tap for sound"
            className="group absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-10 text-sm font-semibold text-white"
          >
            <span className="grid place-items-center h-8 w-8 rounded-full bg-primary text-black transition-transform group-hover:scale-105">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path
                  d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Tap for sound
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-dim">A quick word before your call</figcaption>
    </figure>
  );
}
