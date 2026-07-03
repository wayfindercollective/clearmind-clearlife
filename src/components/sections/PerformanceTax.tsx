import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PerformanceTax() {
  const s = content.performanceTax;
  return (
    <section id="problem" className="py-24 md:py-32 border-t border-border">
      <div className="container-tight">
        <SectionHeading kicker={s.kicker} heading={s.heading} intro={s.intro} />

        <ul className="mt-12 max-w-3xl mx-auto border-t border-border">
          {s.points.map((point, i) => (
            <ScrollReveal as="li" key={point} delay={i * 60} className="flex items-baseline gap-5 border-b border-border py-6">
              <span className="font-display text-sm text-muted-dim tabular-nums pt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg text-foreground/90 leading-relaxed">{point}</p>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-display font-semibold text-platinum leading-snug">{s.closer}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
