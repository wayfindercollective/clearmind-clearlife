import { content } from "@/config/content";
import { Questionnaire } from "@/components/Questionnaire/Questionnaire";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Kicker } from "@/components/ui/Kicker";

export function Application() {
  const s = content.apply;
  return (
    <section id="apply" className="py-24 md:py-32 border-t border-border bg-background">
      <div className="container-tight">
        <ScrollReveal className="max-w-2xl mx-auto mb-10 flex flex-col items-center text-center">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-display font-bold">{s.heading}</h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">{s.intro}</p>
        </ScrollReveal>

        {/* Elevated card: lighter surface + strong border + float shadow so the form
            clearly reads as a distinct interactive panel against the dark page. */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-border-strong bg-surface-2 p-6 sm:p-10 md:p-12 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]">
          <Questionnaire />
        </div>
      </div>
    </section>
  );
}
