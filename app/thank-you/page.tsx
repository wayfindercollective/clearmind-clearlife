import type { Metadata } from "next";
import { content } from "@/config/content";
import { BookingWidget } from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "You're in - Book Your Call | Clear Mind, Clear Life",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  const t = content.thankYou;
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container-tight flex items-center h-14 md:h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.brand.logo} alt={content.brand.name} className="h-8 md:h-10 w-auto" />
        </div>
      </header>

      {/* Everything above the calendar is deliberately compact: the whole point of
          this page is picking a time, so the date grid must land in the first
          viewport without scrolling - centered where the application form sat. */}
      <main className="container-tight pt-8 pb-14 md:pt-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="mb-3 flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.15em] text-muted font-semibold">
              <span className="grid place-items-center h-5 w-5 rounded-full bg-primary text-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {t.kicker}
            </p>
            <h1 className="text-[clamp(1.7rem,3.5vw,2.4rem)] leading-[1.06] font-semibold">{t.heading}</h1>
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {t.nextSteps.map((stepText, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3.5">
                <span className="mt-0.5 shrink-0 grid place-items-center h-6 w-6 rounded-full border border-primary/40 text-primary text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-snug">{stepText}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <BookingWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
