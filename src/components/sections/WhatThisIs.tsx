import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhatThisIs() {
  const s = content.whatThisIs;
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container-narrow">
        <SectionHeading kicker={s.kicker} heading={s.heading} />
        <div className="mt-10 space-y-6 text-center">
          {s.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
