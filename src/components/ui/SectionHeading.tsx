import clsx from "clsx";
import { ScrollReveal } from "./ScrollReveal";
import { Kicker } from "./Kicker";

type Props = {
  kicker?: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ kicker, heading, intro, align = "center", className }: Props) {
  return (
    <ScrollReveal className={clsx(align === "center" ? "text-center mx-auto max-w-2xl flex flex-col items-center" : "max-w-3xl", className)}>
      {kicker && <Kicker className="mb-5">{kicker}</Kicker>}
      <h2 className="text-[clamp(1.9rem,4.2vw,3rem)] font-display font-bold">{heading}</h2>
      {intro && <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">{intro}</p>}
    </ScrollReveal>
  );
}
