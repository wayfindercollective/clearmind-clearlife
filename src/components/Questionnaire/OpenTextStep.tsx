"use client";

import { useState } from "react";

type Props = {
  question: string;
  subtext?: string;
  placeholder?: string;
  minLength: number;
  /** Skippable: always valid, empty answer allowed. */
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  onAdvance: () => void;
  onBlocked: () => void;
};

export function OpenTextStep({ question, subtext, placeholder, minLength, optional, value, onChange, onAdvance, onBlocked }: Props) {
  const [touched, setTouched] = useState(false);
  const valid = optional || value.trim().length >= minLength;

  const submit = () => {
    if (valid) onAdvance();
    else {
      setTouched(true);
      onBlocked();
    }
  };

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-display font-semibold leading-tight">{question}</h3>
      {subtext && <p className="mt-3 text-muted">{subtext}</p>}

      <textarea
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
        placeholder={placeholder}
        rows={4}
        className="mt-7 w-full resize-none rounded-xl border border-border bg-background px-5 py-4 text-lg text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
      />
      {touched && !valid && (
        <p className="mt-2 text-sm text-primary-light">A few words is plenty - whatever feels true.</p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={submit} className="btn-primary" disabled={!valid} style={{ opacity: valid ? 1 : 0.5 }}>
          {optional && !value.trim() ? "Skip" : "Continue"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-xs text-muted-dim hidden sm:block">or press Ctrl + Enter</span>
      </div>
    </div>
  );
}
