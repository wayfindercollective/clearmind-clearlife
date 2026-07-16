import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Framework() {
  const s = content.framework;
  return (
    <section id="method" className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-tight w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} intro={s.lede} />

        <div className="mt-14 border-t border-border max-w-3xl mx-auto">
          {s.principles.map((p, i) => (
            <ScrollReveal
              key={p.key}
              delay={i * 70}
              className="grid md:grid-cols-[3rem_8rem_1fr] items-start gap-3 md:gap-8 border-b border-border py-8 text-left"
            >
              <span className="font-display font-bold text-2xl text-muted-dim tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-muted leading-relaxed max-w-xl">{p.body}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-display font-semibold text-platinum leading-snug">{s.closer}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
