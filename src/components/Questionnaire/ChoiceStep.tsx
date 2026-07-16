"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ChoiceOption } from "@/config/questions";

type Props = {
  question: string;
  subtext?: string;
  options: ChoiceOption[];
  value: string;
  detailValue?: string;
  /** Advances the funnel. `detail` carries the conditional text for requiresText options. */
  onSelect: (value: string, detail?: string) => void;
  onBlocked?: () => void;
};

export function ChoiceStep({ question, subtext, options, value, detailValue, onSelect, onBlocked }: Props) {
  const [pending, setPending] = useState<string | null>(null);
  // Which requiresText option is open (restored when returning to an answered step).
  const [otherOpen, setOtherOpen] = useState<string | null>(() => {
    const match = options.find((o) => o.requiresText && o.value === value);
    return match ? match.value : null;
  });
  const [otherText, setOtherText] = useState(detailValue || "");
  const [touched, setTouched] = useState(false);

  const otherValid = otherText.trim().length >= 2;

  const choose = (opt: ChoiceOption) => {
    if (pending) return;
    if (opt.requiresText) {
      setOtherOpen(opt.value);
      return;
    }
    setOtherOpen(null);
    setPending(opt.value);
    // brief highlight, then auto-advance (no Next button)
    setTimeout(() => onSelect(opt.value), 300);
  };

  const submitOther = () => {
    if (!otherOpen) return;
    if (otherValid) onSelect(otherOpen, otherText.trim());
    else {
      setTouched(true);
      onBlocked?.();
    }
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl font-display font-semibold leading-tight">{question}</h3>
      {subtext && <p className="mt-2 text-muted">{subtext}</p>}

      <div className="mt-5 grid gap-2.5">
        {options.map((opt) => {
          const active = pending === opt.value || otherOpen === opt.value || (!pending && !otherOpen && value === opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt)}
              className={clsx(
                "group flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all",
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-primary/50 hover:bg-surface"
              )}
            >
              <span className="text-base text-foreground">{opt.label}</span>
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

      {otherOpen && (
        <div className="mt-4">
          <textarea
            autoFocus
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submitOther();
            }}
            placeholder={options.find((o) => o.value === otherOpen)?.textPlaceholder || "Say it in your own words..."}
            rows={3}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
          />
          {touched && !otherValid && (
            <p className="mt-2 text-sm text-primary-light">A few words is all it needs.</p>
          )}
          <button
            type="button"
            onClick={submitOther}
            className="btn-primary mt-4"
            disabled={!otherValid}
            style={{ opacity: otherValid ? 1 : 0.5 }}
          >
            Continue
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
