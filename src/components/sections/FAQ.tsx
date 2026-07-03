import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FAQ() {
  const s = content.faq;
  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border">
      <div className="container-narrow">
        <SectionHeading kicker={s.kicker} heading={s.heading} />
        <div className="mt-12 border-t border-border">
          {s.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 30}>
              <details className="group border-b border-border">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 list-none">
                  <span className="text-lg font-medium text-foreground pr-2">{item.q}</span>
                  <span className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-8 text-muted leading-relaxed max-w-2xl">{item.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
