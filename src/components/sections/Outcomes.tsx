import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTAButton } from "@/components/ui/CTAButton";

export function Outcomes() {
  const s = content.outcomes;
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container-tight">
        <SectionHeading kicker={s.kicker} heading={s.heading} />

        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 max-w-4xl mx-auto border-t border-border text-left">
          {s.items.map((item, i) => (
            <ScrollReveal as="li" key={item} delay={i * 45} className="flex items-start gap-4 border-b border-border py-5">
              <span className="mt-1 shrink-0 text-platinum">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-lg text-foreground/90 leading-snug">{item}</span>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-14 text-center">
          <CTAButton location="outcomes" label={content.outcomes.cta} />
        </ScrollReveal>
      </div>
    </section>
  );
}
