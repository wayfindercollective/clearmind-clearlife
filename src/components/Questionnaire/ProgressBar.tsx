export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="mb-5 short:mb-4">
      <div className="flex items-center justify-between mb-2 text-xs text-muted uppercase tracking-[0.2em]">
        <span>
          Step {step + 1} of {total}
        </span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-dark to-primary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
