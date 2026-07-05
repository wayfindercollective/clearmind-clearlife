import { writtenTestimonials } from "@/config/testimonials";
import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";

export function Testimonials() {
  const s = content.results;
  return (
    <section id="results" className="py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="container-tight">
        <SectionHeading kicker={s.kicker} heading={s.heading} intro={s.intro} />
      </div>

      {/* Written / screenshot testimonials (real client assets from Dan) */}
      <div className="mt-14 relative">
        <div className="marquee-track gap-5">
          {[0, 1, 2].map((copy) =>
            writtenTestimonials.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${copy}-${i}`}
                src={src}
                alt="Client testimonial"
                className="h-60 w-auto rounded-lg border border-border object-contain bg-surface p-1 shrink-0"
                loading="lazy"
              />
            ))
          )}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="container-tight mt-14 text-center">
        <CTAButton location="results" label={s.cta} />
      </div>
    </section>
  );
}
