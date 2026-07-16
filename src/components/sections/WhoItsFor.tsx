import { content } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhoItsFor() {
  const s = content.whoItsFor;
  return (
    <section className="section-screen py-16 md:py-20 border-t border-border">
      <div className="container-tight w-full">
        <SectionHeading kicker={s.kicker} heading={s.heading} />

        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2 max-w-4xl mx-auto text-left">
          <ScrollReveal>
            <h3 className="text-sm uppercase tracking-[0.14em] text-muted font-semibold mb-6">{s.forHeading}</h3>
            <ul className="border-t border-border">
              {s.forItems.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border py-4">
                  <span className="mt-1 shrink-0 text-platinum">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-foreground/90 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h3 className="text-sm uppercase tracking-[0.14em] text-muted-dim font-semibold mb-6">{s.notHeading}</h3>
            <ul className="border-t border-border">
              {s.notItems.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border py-4">
                  <span className="mt-2 shrink-0 h-px w-3 bg-muted-dim" aria-hidden />
                  <span className="text-muted leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
