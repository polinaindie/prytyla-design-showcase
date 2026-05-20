import { useCallback, useEffect, useRef, useState } from "react";

/** Viewport Y (px) where the active step aligns while the card is sticky. */
const SNAP_ACTIVATE_Y = 120;

type Options = {
  stepCount: number;
};

function readStepFromSnaps(snapRefs: (HTMLElement | null)[], stepCount: number): number {
  let bestIndex = 0;
  let bestDist = Infinity;

  for (let i = 0; i < stepCount; i++) {
    const snap = snapRefs[i];
    if (!snap) continue;
    const dist = Math.abs(snap.getBoundingClientRect().top - SNAP_ACTIVATE_Y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function useHowItWorksScroll({ stepCount }: Options) {
  const hostRef = useRef<HTMLElement | null>(null);
  const snapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStepRef = useRef(0);
  const rafRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  const setSnapRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      snapRefs.current[index] = el;
    },
    [],
  );

  const getSpacer = useCallback(() => {
    return hostRef.current?.querySelector<HTMLElement>("[data-how-spacer]") ?? null;
  }, []);

  const applyStep = useCallback((stepIndex: number) => {
    if (stepIndex === activeStepRef.current) return;
    activeStepRef.current = stepIndex;
    setActiveStep(stepIndex);
  }, []);

  const pickActiveStep = useCallback(() => {
    applyStep(readStepFromSnaps(snapRefs.current, stepCount));
  }, [applyStep, stepCount]);

  const schedulePick = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      pickActiveStep();
    });
  }, [pickActiveStep]);

  useEffect(() => {
    pickActiveStep();
    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);
    return () => {
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pickActiveStep, schedulePick]);

  const scrollToStep = useCallback(
    (index: number) => {
      const clamped = Math.min(stepCount - 1, Math.max(0, index));
      const snap = snapRefs.current[clamped];
      const spacer = getSpacer();

      applyStep(clamped);

      if (snap) {
        const top = snap.getBoundingClientRect().top + window.scrollY - SNAP_ACTIVATE_Y;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      if (!spacer) return;

      const zoneHeight = spacer.offsetHeight / stepCount;
      const targetTop =
        spacer.getBoundingClientRect().top + window.scrollY - SNAP_ACTIVATE_Y + clamped * zoneHeight;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    },
    [applyStep, getSpacer, stepCount],
  );

  return { hostRef, activeStep, setSnapRef, scrollToStep };
}
