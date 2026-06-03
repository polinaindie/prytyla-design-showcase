import { useCallback, useEffect, useRef, useState } from "react";
import { GENERAL_WIDGET_SCROLL_RANGE } from "../../design-system/GeneralWidget/generalWidgetScroll";

const MORPH_DURATION_MS = 560;

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function useArticleMorphDemo() {
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(0);
  const rafRef = useRef(0);

  scrollYRef.current = scrollY;

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const animateTo = useCallback((target: number) => {
    cancelAnimationFrame(rafRef.current);
    const startY = scrollYRef.current;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / MORPH_DURATION_MS);
      const eased = easeInOutCubic(progress);
      setScrollY(startY + (target - startY) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  const isCollapsed = scrollY >= GENERAL_WIDGET_SCROLL_RANGE;

  const playCollapse = useCallback(
    () => animateTo(GENERAL_WIDGET_SCROLL_RANGE),
    [animateTo],
  );

  const playExpand = useCallback(() => animateTo(0), [animateTo]);

  return {
    scrollY,
    isCollapsed,
    playCollapse,
    playExpand,
  };
}
