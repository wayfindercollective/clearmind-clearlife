import { content } from "@/config/content";
import { Questionnaire } from "@/components/Questionnaire/Questionnaire";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Kicker } from "@/components/ui/Kicker";

export function Application() {
  const s = content.apply;
  return (
    <section id="apply" className="py-24 md:py-32 border-t border-border bg-surface/30">
      <div className="container-tight">
        <ScrollReveal className="max-w-2xl mx-auto mb-12 flex flex-col items-center text-center">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-display font-bold">{s.heading}</h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">{s.intro}</p>
          <p className="mt-3 text-muted-dim">{s.deRisk}</p>
        </ScrollReveal>

        {/* Form panel centered; inputs stay left-aligned inside for readability */}
        <div className="rounded-xl border border-border bg-background p-6 sm:p-10 md:p-12 max-w-2xl mx-auto">
          <Questionnaire />
        </div>
      </div>
    </section>
  );
}
