import { content } from "@/config/content";
import { jimTestimonial } from "@/config/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialVideo } from "@/components/TestimonialVideo";

export function HowItWorks() {
  const s = content.howItWorks;
  return (
    <section id="program" className="section-screen py-16 md:py-20 border-t border-border bg-surface/30">
      <div className="container-tight w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} />

        <div className="mt-14 border-t border-border max-w-3xl mx-auto">
          {s.steps.map((step) => (
            <ScrollReveal key={step.n} className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-12 border-b border-border py-8 text-left">
              <span className="font-display font-bold text-3xl md:text-4xl text-muted-dim tabular-nums">{step.n}</span>
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Jim (hospitality owner) - his "built rules that work in my real business"
            story fits the process section and breaks up the text. */}
        <ScrollReveal className="mt-16 max-w-3xl mx-auto">
          <TestimonialVideo v={jimTestimonial} />
        </ScrollReveal>
      </div>
    </section>
  );
}
