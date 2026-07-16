import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqItem } from "@/components/sections/FaqItem";

export function FAQ() {
  const s = content.faq;
  return (
    <section id="faq" className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-narrow w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} />
        <div className="mt-12 border-t border-border">
          {s.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 30}>
              <FaqItem q={item.q} a={item.a} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
