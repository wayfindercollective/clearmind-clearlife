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

      {/* The calendar IS the page: it starts at the top edge and is sized to the
          viewport (see BookingWidget). Confirmation copy + the 1-2-3 steps live in a
          slim sidebar on desktop; on mobile the heading and widget come first and the
          steps follow (grid placement below, not DOM order). */}
      {/* Wider than container-tight and with a slimmer sidebar: every extra px of
          calendar column raises the embed's scale (see BookingWidget), so the dates
          render larger. */}
      <main className="mx-auto max-w-[82rem] px-6 pt-3 md:pt-4 pb-10">
        {/* rows-[auto_1fr] pins row 1 to the heading's height so the steps list sits
            directly under it instead of the tall widget inflating row 1. */}
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-[minmax(240px,270px)_1fr] lg:grid-rows-[auto_1fr] lg:items-start">
          <div>
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

          {/* min-w-0: grid items default to min-width auto, so the widget's px-sized
              box would stretch this cell and feed its own width back into the
              column measurement (locking mobile into the desktop layout). */}
          <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <BookingWidget />
          </div>

          {/* Steps then the booking video, stacked in the left column under the heading. */}
          <div className="grid gap-5 lg:col-start-1 lg:row-start-2 lg:mt-2">
            <ol className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
              {t.nextSteps.map((stepText, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3">
                  <span className="mt-0.5 shrink-0 grid place-items-center h-6 w-6 rounded-full border border-primary/40 text-primary text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/90 leading-snug">{stepText}</span>
                </li>
              ))}
            </ol>
            <BookingVSL />
          </div>
        </div>
      </main>
    </div>
  );
}
