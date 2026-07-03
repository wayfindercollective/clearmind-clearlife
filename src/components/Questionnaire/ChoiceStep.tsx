"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ChoiceOption } from "@/config/questions";

type Props = {
  question: string;
  subtext?: string;
  options: ChoiceOption[];
  value: string;
  onSelect: (value: string) => void; // sets answer + auto-advances
};

export function ChoiceStep({ question, subtext, options, value, onSelect }: Props) {
  const [pending, setPending] = useState<string | null>(null);

  const choose = (v: string) => {
    if (pending) return;
    setPending(v);
    // brief highlight, then auto-advance (no Next button)
    setTimeout(() => onSelect(v), 300);
  };

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-display font-semibold leading-tight">{question}</h3>
      {subtext && <p className="mt-3 text-muted">{subtext}</p>}

      <div className="mt-7 grid gap-3">
        {options.map((opt) => {
          const active = pending === opt.value || (!pending && value === opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt.value)}
              className={clsx(
                "group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all",
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface/50 hover:border-primary/50 hover:bg-surface"
              )}
            >
              <span className="text-lg text-foreground">{opt.label}</span>
              <span
                className={clsx(
                  "grid place-items-center h-6 w-6 rounded-full border transition-colors",
                  active ? "border-primary bg-primary text-black" : "border-border-strong text-transparent"
                )}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
