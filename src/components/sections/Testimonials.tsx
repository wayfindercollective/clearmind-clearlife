"use client";

import { useRef, useState } from "react";
import { videoTestimonials, writtenTestimonials, type VideoTestimonial } from "@/config/testimonials";
import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { track } from "@/lib/analytics";

function TestimonialVideo({ v }: { v: VideoTestimonial }) {
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
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface aspect-[4/5]">
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
          className="absolute inset-0 grid place-items-center bg-black/35 hover:bg-black/25 transition-colors"
          aria-label={`Play ${v.name}'s testimonial`}
        >
          <span className="grid place-items-center h-14 w-14 rounded-full bg-primary text-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 text-left">
            <span className="block font-semibold text-foreground">{v.name}</span>
            {v.role && <span className="block text-xs text-muted">{v.role}</span>}
          </span>
        </button>
      )}
    </div>
  );
}

export function Testimonials() {
  const s = content.results;
  return (
    <section id="results" className="py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="container-tight">
        <SectionHeading kicker={s.kicker} heading={s.heading} intro={s.intro} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {videoTestimonials.map((v) => (
            <TestimonialVideo key={v.name} v={v} />
          ))}
        </div>
      </div>

      {/* Written / screenshot testimonials (real client assets from Dan) */}
      <div className="mt-16 relative">
        <div className="marquee-track gap-5">
          {[0, 1, 2].map((copy) =>
            writtenTestimonials.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${copy}-${i}`}
                src={src}
                alt="Client testimonial"
                className="h-60 w-auto rounded-lg border border-border object-contain bg-surface p-1 shrink-0"
                loading="lazy"
              />
            ))
          )}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
