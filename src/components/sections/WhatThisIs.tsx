import { content } from "@/config/content";
import { gregTestimonial } from "@/config/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialVideo } from "@/components/TestimonialVideo";

export function WhatThisIs() {
  const s = content.whatThisIs;
  return (
    <section className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-tight w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} />

        {/* Copy left, Greg's endorsement of working with Dan on the right */}
        <div className="mt-12 grid gap-10 lg:gap-16 md:grid-cols-[1.4fr_0.6fr] md:items-center max-w-5xl mx-auto">
          <div className="space-y-7 text-left">
            {s.paragraphs.map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={160} className="w-full max-w-[240px] sm:max-w-[280px] mx-auto">
            <TestimonialVideo v={gregTestimonial} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
