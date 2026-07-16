import { grantTestimonial } from "@/config/testimonials";
import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialVideo } from "@/components/TestimonialVideo";

export function Testimonials() {
  const s = content.results;
  return (
    <section id="results" className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-tight w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} intro={s.intro} />

        {/* Featured client story (Grant) */}
        <ScrollReveal className="mt-12 max-w-3xl mx-auto">
          <TestimonialVideo v={grantTestimonial} />
        </ScrollReveal>

        <div className="mt-14 text-center">
          <CTAButton location="results" label={s.cta} arrow="up" />
        </div>
      </div>
    </section>
  );
}
