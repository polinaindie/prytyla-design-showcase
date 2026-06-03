import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { GENERAL_WIDGET_PROGRESS_SECTION_FALLBACK_H } from "./generalWidgetScroll";

/**
 * Один раз вимірює висоту progress section у повному (t=0) стані.
 * Під час scroll morph висота не перераховується — без стрибків header/widget.
 */
export function useStableProgressSectionHeight(enabled: boolean): {
  height: number;
  ref: (node: HTMLDivElement | null) => void;
} {
  const [height, setHeight] = useState(GENERAL_WIDGET_PROGRESS_SECTION_FALLBACK_H);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const capturedRef = useRef(false);

  const ref = useCallback((node: HTMLDivElement | null) => {
    nodeRef.current = node;
  }, []);

  useLayoutEffect(() => {
    if (!enabled || capturedRef.current) {
      return;
    }

    const node = nodeRef.current;
    if (!node) {
      return;
    }

    const capture = () => {
      const measured = node.offsetHeight;
      if (measured > 0 && !capturedRef.current) {
        capturedRef.current = true;
        setHeight(measured);
      }
    };

    capture();
    const rafId = requestAnimationFrame(capture);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  return { height, ref };
}
