"use client";

import { track } from "@/lib/analytics";

/** One FAQ accordion row. Client-side only so it can emit faq_expanded on open. */
export function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details
      className="group border-b border-border"
      onToggle={(e) => {
        if (e.currentTarget.open) track("faq_expanded", { question: q, index });
      }}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 list-none">
        <span className="text-lg font-medium text-foreground pr-2">{q}</span>
        <span className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="pb-6 pr-8 max-w-2xl space-y-4">
        {a.split("\n").map((para, j) => (
          <p key={j} className="text-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </details>
  );
}
