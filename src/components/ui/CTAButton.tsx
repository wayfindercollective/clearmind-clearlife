"use client";

import clsx from "clsx";
import { analytics } from "@/lib/analytics";
import { scrollToApply } from "@/lib/scroll";

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
  return (
    <button
      type="button"
      onClick={() => {
        analytics.ctaClicked(location, typeof text === "string" ? text : (label ?? "Apply"));
        scrollToApply();
      }}
      className={clsx(variant === "primary" ? "btn-primary" : "btn-line", className)}
    >
      {text}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={ARROWS[arrow]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
