import { useEffect, useState, type RefObject } from "react";
import {
  getGeneralWidgetScrollMetrics,
  type GeneralWidgetScrollMetrics,
} from "./generalWidgetScroll";
import type { GeneralWidgetPaymentTab } from "./GeneralWidget.types";

function getScrollYRelativeToAnchor(anchor: HTMLElement | null): number {
  if (!anchor) {
    return window.scrollY;
  }
  const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, window.scrollY - anchorTop);
}

function getOffsetWithinScrollParent(
  scrollParent: HTMLElement,
  element: HTMLElement,
): number {
  let offset = 0;
  let current: HTMLElement | null = element;
  while (current && current !== scrollParent) {
    offset += current.offsetTop;
    current = current.parentElement;
  }
  return offset;
}

/** scrollTop відносно верху anchor (0 = повний віджет, 260 = compact). */
function getScrollYInContainer(
  container: HTMLElement,
  anchor: HTMLElement | null,
): number {
  if (!anchor) {
    return container.scrollTop;
  }
  const anchorStart = getOffsetWithinScrollParent(container, anchor);
  return Math.max(0, container.scrollTop - anchorStart);
}

/**
 * Відстежує scroll відносно верху віджета: window.scrollY або scroll усередині
 * `scrollContainerRef`. CSS height transition лише при поверненні offset → 0.
 */
export function useGeneralWidgetPageScroll(
  activeTab: GeneralWidgetPaymentTab,
  enabled: boolean,
  anchorRef?: RefObject<HTMLElement | null>,
  scrollOffsetOverride?: number,
  progressBarHeight?: number,
  scrollContainerRef?: RefObject<HTMLElement | null>,
): GeneralWidgetScrollMetrics & { pageScrollY: number; useHeightTransition: boolean } {
  const [pageScrollY, setPageScrollY] = useState(0);
  const [useHeightTransition, setUseHeightTransition] = useState(false);
  const isScrollFrozen = scrollOffsetOverride !== undefined;

  useEffect(() => {
    if (!enabled || isScrollFrozen) {
      return;
    }

    let disposed = false;
    let rafId = 0;
    let container: HTMLElement | null = null;

    const handleScroll = () => {
      const y = container
        ? getScrollYInContainer(container, anchorRef?.current ?? null)
        : getScrollYRelativeToAnchor(anchorRef?.current ?? null);
      setPageScrollY(y);
      setUseHeightTransition(y === 0);
    };

    const attach = () => {
      if (disposed) {
        return;
      }

      container = scrollContainerRef?.current ?? null;
      if (scrollContainerRef && !container) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      handleScroll();

      if (container) {
        container.addEventListener("scroll", handleScroll, { passive: true });
        return;
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
    };

    attach();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enabled, isScrollFrozen, anchorRef, scrollContainerRef]);

  const effectiveScrollY = isScrollFrozen ? scrollOffsetOverride : pageScrollY;

  const metrics = getGeneralWidgetScrollMetrics(
    enabled ? effectiveScrollY : 0,
    activeTab,
    progressBarHeight,
  );

  return {
    ...metrics,
    pageScrollY: effectiveScrollY,
    useHeightTransition: enabled && !isScrollFrozen ? useHeightTransition : false,
  };
}
