import { Questionnaire } from "@/components/Questionnaire/Questionnaire";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Kicker } from "@/components/ui/Kicker";

export function Application() {
  return (
    <section id="apply" className="py-24 md:py-32 border-t border-border bg-surface/30">
      <div className="container-tight">
        <ScrollReveal className="max-w-2xl mx-auto mb-12 flex flex-col items-center text-center">
          <Kicker>Apply</Kicker>
          <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-display font-bold">Apply for a call</h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            A few honest questions, then pick a time to talk. Takes about two minutes.
          </p>
        </ScrollReveal>

        {/* Form panel centered; inputs stay left-aligned inside for readability */}
        <div className="rounded-xl border border-border bg-background p-6 sm:p-10 md:p-12 max-w-2xl mx-auto">
          <Questionnaire />
        </div>
      </div>
    </section>
  );
}
