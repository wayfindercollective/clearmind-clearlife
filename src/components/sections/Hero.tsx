import { content } from "@/config/content";
import { CTAButton } from "@/components/ui/CTAButton";
import { Kicker } from "@/components/ui/Kicker";

export function Hero() {
  const h = content.hero;
  return (
    <section id="top" className="relative min-h-[92svh] flex items-center pt-28 pb-16 border-b border-border">
      <div className="container-tight w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center">
            <Kicker>{h.kicker}</Kicker>
          </div>

          <h1 className="mt-7 font-display font-extrabold text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02]">
            {h.headline}{" "}
            <span className="block text-muted-dim font-bold">{h.headlineDim}</span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted leading-relaxed">{h.subhead}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <CTAButton location="hero" label={h.cta} className="text-base" />
            <a href="#results" className="link-quiet inline-flex items-center gap-1.5 font-medium">
              See real results
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
