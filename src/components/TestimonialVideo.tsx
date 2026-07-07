"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import type { VideoTestimonial } from "@/config/testimonials";
import { track } from "@/lib/analytics";

const ASPECT: Record<VideoTestimonial["aspect"], string> = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
};

export function TestimonialVideo({ v, className }: { v: VideoTestimonial; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    el.controls = true;
    el.play().catch(() => {});
    setPlaying(true);
    track("video_played", { testimonial: v.name });
  };

  return (
    <figure className={className}>
      <div className={clsx("relative overflow-hidden rounded-lg border border-border bg-black", ASPECT[v.aspect])}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 grid place-items-center bg-black/25 hover:bg-black/15 transition-colors"
            aria-label={`Play ${v.name}'s testimonial`}
          >
            <span className="grid place-items-center h-14 w-14 rounded-full bg-primary text-black">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted text-center">{v.caption}</figcaption>
    </figure>
  );
}
