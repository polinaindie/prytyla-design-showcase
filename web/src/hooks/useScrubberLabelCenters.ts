import { useCallback, useLayoutEffect, useRef, useState } from "react";

/** Horizontal center of each scrubber label as 0–1 relative to the labels row width. */
export function useScrubberLabelCenters(stepCount: number) {
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row || row.offsetWidth === 0) return;

    const rowLeft = row.getBoundingClientRect().left;
    const rowWidth = row.offsetWidth;
    const next = Array.from({ length: stepCount }, (_, i) => {
      const btn = itemRefs.current[i];
      if (!btn) return NaN;
      const r = btn.getBoundingClientRect();
      return (r.left + r.width / 2 - rowLeft) / rowWidth;
    });

    if (next.every((n) => Number.isFinite(n))) {
      setCenters(next);
    }
  }, [stepCount]);

  useLayoutEffect(() => {
    measure();
    const row = rowRef.current;
    if (!row) return;

    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const getProgress = useCallback(
    (stepIndex: number) => {
      const last = stepCount - 1;
      if (last <= 0) return 0;
      if (stepIndex <= 0) return 0;
      if (stepIndex >= last) return 1;
      if (centers.length === stepCount) {
        return centers[stepIndex] ?? stepIndex / last;
      }
      return stepIndex / last;
    },
    [centers, stepCount],
  );

  const getInterpolatedProgress = useCallback(
    (scrollProgress: number) => {
      const last = stepCount - 1;
      if (last <= 0) return 0;

      if (centers.length === stepCount) {
        const pos = Math.min(last, scrollProgress * last);
        const i0 = Math.floor(pos);
        const i1 = Math.min(last, i0 + 1);
        const t = pos - i0;
        const c0 = centers[i0] ?? 0;
        const c1 = centers[i1] ?? 1;
        return c0 + (c1 - c0) * t;
      }

      return scrollProgress;
    },
    [centers, stepCount],
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return { rowRef, setItemRef, getProgress, getInterpolatedProgress, remeasure: measure };
}
