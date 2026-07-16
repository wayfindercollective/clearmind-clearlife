import { content } from "@/config/content";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Kicker } from "@/components/ui/Kicker";

export function BottomCTA() {
  const s = content.bottomCta;
  return (
    <section className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-narrow w-full">
        <ScrollReveal className="flex flex-col items-center text-center">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-6 text-[clamp(2rem,5vw,3.4rem)] font-display font-extrabold">{s.heading}</h2>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">{s.subhead}</p>
          <div className="mt-10">
            <CTAButton location="bottom" label={s.cta} arrow="up" className="text-base" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
