import { useEffect, useRef, useState } from "react";
import { GENERAL_WIDGET_SCROLL_RANGE } from "../../design-system/GeneralWidget/generalWidgetScroll";

/** px — мінімальний рух, щоб вважати його напрямком скролу (відсікає дрижання тачпада). */
const DIRECTION_THRESHOLD = 6;
/** px — скрол від верху, після якого віджет один раз програє анімацію згортання. */
const COLLAPSE_AT = 8;
const MORPH_DURATION_MS = 560;

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

type ProjectPageScroll = {
  /**
   * 0…GENERAL_WIDGET_SCROLL_RANGE — живить morph віджета (articleScrollOffset).
   * Не прив'язаний до пікселів скролу: один жест скролу запускає плавну анімацію
   * згортання, повернення на верх сторінки — розгортання.
   */
  offset: number;
  /** false — скрол вниз (меню сховане), true — на самому верху або скрол вгору. */
  menuVisible: boolean;
  /** window.scrollY ≥ threshold — показати кнопку «нагору». */
  scrolledPastFold: boolean;
};

/**
 * Один passive scroll-listener на сторінку:
 * - цільовий стан віджета (collapsed / expanded) + time-based анімація до нього;
 * - напрямок скролу для меню (ховається вниз, з'являється вгору над
 *   breadcrumbs + віджетом);
 * - прапорець для кнопки «нагору».
 */
export function useProjectPageScroll(
  options: { menuLocked?: boolean; foldThreshold?: number } = {},
): ProjectPageScroll {
  const { menuLocked = false, foldThreshold = 600 } = options;
  const [offset, setOffset] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const [scrolledPastFold, setScrolledPastFold] = useState(false);
  const lastY = useRef(0);
  const collapsedRef = useRef(false);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const menuLockedRef = useRef(menuLocked);

  useEffect(() => {
    menuLockedRef.current = menuLocked;
    if (menuLocked) {
      setMenuVisible(true);
    }
  }, [menuLocked]);

  useEffect(() => {
    const animateTo = (target: number) => {
      cancelAnimationFrame(rafRef.current);
      const from = offsetRef.current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion || from === target) {
        offsetRef.current = target;
        setOffset(target);
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / MORPH_DURATION_MS);
        const value = from + (target - from) * easeInOutCubic(progress);
        offsetRef.current = value;
        setOffset(value);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const update = () => {
      const y = Math.max(0, window.scrollY);

      setScrolledPastFold(y >= foldThreshold);

      if (!collapsedRef.current && y > COLLAPSE_AT) {
        collapsedRef.current = true;
        animateTo(GENERAL_WIDGET_SCROLL_RANGE);
      } else if (collapsedRef.current && y <= 0) {
        collapsedRef.current = false;
        animateTo(0);
      }

      const delta = y - lastY.current;
      if (y <= 0 || menuLockedRef.current) {
        setMenuVisible(true);
      } else if (delta > DIRECTION_THRESHOLD) {
        setMenuVisible(false);
      } else if (delta < -DIRECTION_THRESHOLD) {
        setMenuVisible(true);
      }
      if (Math.abs(delta) > DIRECTION_THRESHOLD || y <= 0) {
        lastY.current = y;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", update);
    };
  }, [foldThreshold]);

  return { offset, menuVisible, scrolledPastFold };
}
