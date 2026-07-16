"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { analytics } from "@/lib/analytics";
import { scrollToApply } from "@/lib/scroll";

/** True while the application card (#apply) is at least partly on screen.
    Starts true so CTAs never flash their shine during initial paint. */
function useApplyInView() {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = document.getElementById("apply");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return inView;
}

type Props = {
  location: string;
  label?: string;
  variant?: "primary" | "line";
  /** Arrow points the way the button scrolls: "down" for CTAs above the form, "up" for below. */
  arrow?: "down" | "up";
  className?: string;
  children?: React.ReactNode;
};

const ARROWS = {
  down: "M12 5v14M6 13l6 6 6-6",
  up: "M12 19V5M6 11l6-6 6 6",
} as const;

export function CTAButton({ location, label, variant = "primary", arrow = "down", className, children }: Props) {
  const text = children ?? label ?? "Apply";
  // Shine sweep only while the application form is off-screen - the moment the
  // form is visible the buttons go quiet and the card's own glow takes over.
  const applyInView = useApplyInView();
  return (
    <button
      type="button"
      onClick={() => {
        analytics.ctaClicked(location, typeof text === "string" ? text : (label ?? "Apply"));
        scrollToApply();
      }}
      className={clsx(variant === "primary" ? "btn-primary" : "btn-line", !applyInView && "btn-shine", className)}
    >
      {text}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={ARROWS[arrow]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
