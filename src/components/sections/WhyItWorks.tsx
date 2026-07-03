import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhyItWorks() {
  const s = content.whyItWorks;
  return (
    <section className="py-24 md:py-32 border-t border-border bg-surface/30">
      <div className="container-tight">
        <SectionHeading kicker={s.kicker} heading={s.heading} />

        <div className="mt-14 grid sm:grid-cols-3 border-t border-border">
          {s.cards.map((card, i) => (
            <ScrollReveal
              key={card.title}
              delay={i * 80}
              className="py-9 sm:px-9 border-b sm:border-b-0 sm:border-r last:sm:border-r-0 border-border text-center"
            >
              <span className="font-display font-bold text-sm text-muted-dim tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{card.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
