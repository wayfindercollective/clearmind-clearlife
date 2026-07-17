import type { Metadata } from "next";
import { content } from "@/config/content";
import { BookingWidget } from "@/components/BookingWidget";
import { BookingVSL } from "@/components/BookingVSL";

export const metadata: Metadata = {
  title: "You're in - Book Your Call | Clear Mind, Clear Life",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  const t = content.thankYou;
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto max-w-[82rem] px-6 flex items-center h-14 md:h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.brand.logo} alt={content.brand.name} className="h-12 md:h-14 w-auto" />
        </div>
      </header>

      {/* Wide (82rem) so the calendar column below gets the room to scale up. */}
      <main className="mx-auto max-w-[82rem] px-6 pt-3 md:pt-4 pb-10">
        <div className="mb-4">
          <p className="mb-2.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted font-semibold">
            <span className="grid place-items-center h-5 w-5 rounded-full bg-primary text-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t.kicker}
          </p>
          <h1 className="text-2xl md:text-[1.7rem] leading-[1.1] font-semibold">{t.heading}</h1>
        </div>

        {/* The 1-2-3 steps run horizontally across the top (stacked only on phones). */}
        <ol className="mb-5 grid gap-3 sm:grid-cols-3">
          {t.nextSteps.map((stepText, i) => (
            <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3">
              <span className="mt-0.5 shrink-0 grid place-items-center h-6 w-6 rounded-full border border-primary/40 text-primary text-xs font-semibold">
                {i + 1}
              </span>
              <span className="text-sm text-foreground/90 leading-snug">{stepText}</span>
            </li>
          ))}
        </ol>

        {/* Video (left) beside the calendar (right); calendar takes the remaining width.
            min-w-0: grid items default to min-width auto, so the widget's px-sized box
            would otherwise stretch its cell and feed its own width back into the column
            measurement (locking mobile into the desktop layout). */}
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-[minmax(240px,270px)_1fr] lg:items-start">
          <BookingVSL />
          <div className="min-w-0">
            <BookingWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
