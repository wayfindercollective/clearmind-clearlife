import { content } from "@/config/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Kicker } from "@/components/ui/Kicker";

export function About() {
  const s = content.about;
  return (
    <section id="about" className="section-screen py-16 md:py-20 border-t border-border bg-surface/30">
      <div className="container-tight w-full grid gap-10 lg:gap-16 md:grid-cols-[0.8fr_1.2fr] items-start">
        {/* Headshot */}
        <ScrollReveal className="w-full max-w-xs">
          <div className="overflow-hidden rounded-lg border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.portrait} alt={content.brand.coach} className="w-full h-auto" />
          </div>
          <p className="mt-4 text-sm text-muted-dim">{content.brand.coach} · Founder, sober since 2017</p>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal delay={100}>
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-5 text-[clamp(1.8rem,3.8vw,2.7rem)] font-display font-bold">{s.heading}</h2>
          <div className="mt-7 space-y-5 max-w-2xl">
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-foreground/85 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
