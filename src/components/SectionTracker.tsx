"use client";

import { useEffect } from "react";
import { analytics, markFormReached } from "@/lib/analytics";

/**
 * Fires section_viewed once for each named landing section as it scrolls into
 * view, and apply_section_reached + opens the question_progress gate when the
 * application form (#apply) is reached. IntersectionObserver runs off the main
 * thread, so this adds no scroll-frame cost. Renders nothing.
 */
export function SectionTracker() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const seen = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).id;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          obs.unobserve(entry.target); // once each
          analytics.sectionViewed(id);
          if (id === "apply") {
            analytics.applySectionReached("scroll");
            markFormReached();
          }
        }
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return null;
}
