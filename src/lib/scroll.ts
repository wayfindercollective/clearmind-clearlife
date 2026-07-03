/** Custom rAF scroll to the application - ~900ms easeOutCubic, offset above the progress bar. */
export function scrollToApply() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("apply");
  if (!el) return;

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const start = window.scrollY;
  const yOffset = -72;
  const target = el.getBoundingClientRect().top + start + yOffset;

  if (reduce) {
    window.scrollTo(0, target);
    return;
  }

  const dist = target - start;
  const duration = 900;
  let startTime: number | null = null;
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (ts: number) => {
    if (startTime === null) startTime = ts;
    const p = Math.min(1, (ts - startTime) / duration);
    window.scrollTo(0, start + dist * easeOutCubic(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
