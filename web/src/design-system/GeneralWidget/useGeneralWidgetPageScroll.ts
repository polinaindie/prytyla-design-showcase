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

/**
 * Відстежує window.scrollY відносно верху віджета (не внутрішній скрол PaymentInfo).
 * CSS height transition лише при поверненні relative scroll → 0.
 */
export function useGeneralWidgetPageScroll(
  activeTab: GeneralWidgetPaymentTab,
  enabled: boolean,
  anchorRef?: RefObject<HTMLElement | null>,
  scrollOffsetOverride?: number,
): GeneralWidgetScrollMetrics & { pageScrollY: number; useHeightTransition: boolean } {
  const [pageScrollY, setPageScrollY] = useState(0);
  const [useHeightTransition, setUseHeightTransition] = useState(false);
  const isScrollFrozen = scrollOffsetOverride !== undefined;

  useEffect(() => {
    if (!enabled || isScrollFrozen) {
      return;
    }

    const handleScroll = () => {
      const y = getScrollYRelativeToAnchor(anchorRef?.current ?? null);
      setPageScrollY(y);
      setUseHeightTransition(y === 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enabled, isScrollFrozen]);

  const effectiveScrollY = isScrollFrozen ? scrollOffsetOverride : pageScrollY;

  const metrics = getGeneralWidgetScrollMetrics(
    enabled ? effectiveScrollY : 0,
    activeTab,
  );

  return {
    ...metrics,
    pageScrollY: effectiveScrollY,
    useHeightTransition: enabled && !isScrollFrozen ? useHeightTransition : false,
  };
}
