"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const VSL_ID = process.env.NEXT_PUBLIC_VSL_YOUTUBE_ID;

export function VslPlayer() {
  const [playing, setPlaying] = useState(false);

  if (!VSL_ID) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border-strong bg-surface/50 p-10 text-center aspect-video">
        <div>
          <p className="text-primary font-medium mb-2">Your video goes here</p>
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            Set <code className="text-platinum">NEXT_PUBLIC_VSL_YOUTUBE_ID</code> to Dan&apos;s YouTube video ID and it
            plays here.
          </p>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => {
          setPlaying(true);
          track("video_played", { context: "thank_you_vsl" });
        }}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border aspect-video"
        aria-label="Play the video"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${VSL_ID}/maxresdefault.jpg`}
          alt="Watch before your call"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/40 group-hover:bg-black/30 transition-colors">
          <span className="grid place-items-center h-16 w-16 rounded-full bg-primary text-black shadow-lg transition-transform group-hover:scale-105">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${VSL_ID}?autoplay=1&rel=0&playsinline=1`}
        title="Watch before your call"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}
