import clsx from "clsx";

/** Quiet section label: muted mono-ish uppercase with a short leading hairline. */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx("kicker", className)}>{children}</span>;
}
