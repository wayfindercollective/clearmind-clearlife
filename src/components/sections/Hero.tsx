import { content } from "@/config/content";
import { CTAButton } from "@/components/ui/CTAButton";
import { Kicker } from "@/components/ui/Kicker";
import { Questionnaire } from "@/components/Questionnaire/Questionnaire";

export function Hero() {
  const h = content.hero;
  const a = content.apply;
  return (
    <section id="top" className="section-screen relative pt-20 md:pt-24 short:pt-[4.5rem] pb-14 md:pb-20 short:pb-10 border-b border-border">
      <div className="container-tight w-full">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy — left-aligned so the kicker hairline, headline and subhead all sit
              flush. Sized to FILL the column height beside the form, not whisper. */}
          <div className="max-w-xl">
            {/* ! overrides .kicker's unlayered 0.72rem font-size */}
            <Kicker className="text-sm!">{h.kicker}</Kicker>

            <h1 className="mt-7 short:mt-6 font-display font-extrabold text-[clamp(2.6rem,5.2vw,4.5rem)] short:text-[clamp(2.4rem,4.6vw,3.5rem)] leading-[1.04]">
              {h.headline}{" "}
              <span className="block text-muted-dim font-bold">{h.headlineDim}</span>
            </h1>

            <p className="mt-7 short:mt-5 text-xl md:text-2xl short:text-xl text-muted leading-relaxed">{h.subhead}</p>

            <div className="mt-9 short:mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              {/* On desktop the form is beside this copy, so the button only earns its
                  place on smaller screens where the form sits below the fold. Hidden via
                  a wrapper: .btn-primary's unlayered display beats an lg:hidden utility. */}
              <div className="lg:hidden">
                <CTAButton location="hero" label={h.cta} className="text-base" />
              </div>
              <a href="#results" className="link-quiet inline-flex items-center gap-2 font-medium text-lg">
                See real results
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* The application form — the conversion event, above the fold. Kept as a
              nested section#apply so SectionTracker's `main section[id]` observer and
              scrollToApply() keep working unchanged. */}
          <section
            id="apply"
            aria-label="Application form"
            className="apply-glow rounded-2xl border border-border-strong bg-surface-2 p-5 sm:p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="mb-4">
              <h2 className="text-lg font-display font-bold">{a.heading}</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">{a.intro}</p>
            </div>
            <Questionnaire />
          </section>
        </div>
      </div>
    </section>
  );
}
