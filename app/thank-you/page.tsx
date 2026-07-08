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
        <div className="container-tight flex items-center h-20 md:h-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.brand.logo} alt={content.brand.name} className="h-16 md:h-[5rem] w-auto" />
        </div>
      </header>

      <main className="container-tight py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-muted font-semibold">
            <span className="grid place-items-center h-5 w-5 rounded-full bg-primary text-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t.kicker}
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] leading-[1.06] font-semibold">{t.heading}</h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">{t.subhead}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Booking */}
          <div>
            <h2 className="text-xl font-semibold mb-5">{t.bookingHeading}</h2>
            <BookingWidget />
          </div>

          {/* What happens next */}
          <div>
            <h2 className="text-xl font-semibold mb-5">What happens next</h2>
            <ol className="space-y-5">
              {t.nextSteps.map((stepText, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 grid place-items-center h-6 w-6 rounded-full border border-primary/40 text-primary text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 leading-snug">{stepText}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
