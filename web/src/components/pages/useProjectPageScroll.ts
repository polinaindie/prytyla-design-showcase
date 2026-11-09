import { useEffect, useRef, useState } from "react";
import { GENERAL_WIDGET_SCROLL_RANGE } from "../../design-system/GeneralWidget/generalWidgetScroll";

/** px — мінімальний рух, щоб вважати його напрямком скролу (відсікає дрижання тачпада). */
const DIRECTION_THRESHOLD = 6;
/** px — свайп пальцем, після якого жест на верху сторінки запускає згортання/розгортання. */
const TOUCH_THRESHOLD = 12;
const MORPH_DURATION_MS = 900;

/**
 * Чи може вкладений прокручуваний блок (напр. список реквізитів) прийняти цей жест.
 * direction > 0 — прокрутка вниз, < 0 — вгору.
 */
function canScrollInside(target: EventTarget | null, direction: number): boolean {
  let node = target instanceof Element ? target : null;
  while (node && node !== document.documentElement && node !== document.body) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight + 1) {
      if (direction > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
      if (direction < 0 && node.scrollTop > 0) return true;
    }
    node = node.parentElement;
  }
  return false;
}

type Phase = "expanded" | "collapsing" | "collapsed" | "expanding";

type ProjectPageScroll = {
  /**
   * 0…GENERAL_WIDGET_SCROLL_RANGE — живить morph віджета (articleScrollOffset).
   * Лінійний за часом; пом'якшення робить сторінка.
   */
  offset: number;
  /** false — скрол вниз (меню сховане), true — на самому верху або скрол вгору. */
  menuVisible: boolean;
  /** window.scrollY ≥ threshold — показати кнопку «нагору». */
  scrolledPastFold: boolean;
};

/**
 * Згортання віджета — окрема анімація, а не прив'язка до пікселів скролу:
 * 1. Перший жест вниз на самому верху (wheel / touch / клавіатура) НЕ скролить сторінку,
 *    а запускає колапс; поки він триває, скрол заблокований, тож контент їде вгору
 *    разом із картою і нічого не «губиться» під нею.
 * 2. Коли колапс завершився — сторінка скролиться як зазвичай (контент під карткою).
 * 3. Повернення на верх (або жест вгору на верху) розгортає віджет.
 * Також: меню ховається при скролі вниз / з'являється при скролі вгору, прапорець для «нагору».
 */
export function useProjectPageScroll(
  options: { menuLocked?: boolean; foldThreshold?: number } = {},
): ProjectPageScroll {
  const { menuLocked = false, foldThreshold = 600 } = options;
  const [offset, setOffset] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const [scrolledPastFold, setScrolledPastFold] = useState(false);
  const menuLockedRef = useRef(menuLocked);

  useEffect(() => {
    menuLockedRef.current = menuLocked;
    if (menuLocked) {
      setMenuVisible(true);
    }
  }, [menuLocked]);

  useEffect(() => {
    let phase: Phase = "expanded";
    let current = 0;
    let rafId = 0;
    let lastY = Math.max(0, window.scrollY);
    let touchStartY = 0;

    const animating = () => phase === "collapsing" || phase === "expanding";

    const animateTo = (target: number, onDone: () => void) => {
      cancelAnimationFrame(rafId);
      const from = current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion || from === target) {
        current = target;
        setOffset(target);
        onDone();
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / MORPH_DURATION_MS);
        current = from + (target - from) * progress;
        setOffset(current);
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          onDone();
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const collapse = () => {
      if (phase !== "expanded") return;
      phase = "collapsing";
      window.scrollTo({ top: 0, behavior: "instant" });
      animateTo(GENERAL_WIDGET_SCROLL_RANGE, () => {
        phase = "collapsed";
        lastY = Math.max(0, window.scrollY);
      });
    };

    const expand = () => {
      if (phase !== "collapsed") return;
      phase = "expanding";
      setMenuVisible(true);
      animateTo(0, () => {
        phase = "expanded";
        lastY = Math.max(0, window.scrollY);
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (animating()) {
        event.preventDefault();
        return;
      }
      if (window.scrollY > 0) return;
      if (canScrollInside(event.target, event.deltaY)) return;
      if (phase === "expanded" && event.deltaY > 0) {
        event.preventDefault();
        collapse();
      } else if (phase === "collapsed" && event.deltaY < 0) {
        event.preventDefault();
        expand();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (animating()) {
        event.preventDefault();
        return;
      }
      if (window.scrollY > 0) return;
      const dy = (event.touches[0]?.clientY ?? touchStartY) - touchStartY;
      if (canScrollInside(event.target, -dy)) return;
      if (phase === "expanded" && dy < -TOUCH_THRESHOLD) {
        event.preventDefault();
        collapse();
      } else if (phase === "collapsed" && dy > TOUCH_THRESHOLD) {
        event.preventDefault();
        expand();
      }
    };

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      setScrolledPastFold(y >= foldThreshold);

      if (animating()) {
        /* Скрол заблокований на час анімації: тримаємо сторінку на верху. */
        if (y !== 0) window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }

      /* Запасний шлях (scrollbar, клавіатура, «нагору»): згортання від першого зсуву. */
      if (phase === "expanded" && y > DIRECTION_THRESHOLD) {
        collapse();
        return;
      }
      if (phase === "collapsed" && y <= 0 && lastY > 0) {
        expand();
        lastY = 0;
        return;
      }

      const delta = y - lastY;
      if (y <= 0 || menuLockedRef.current) {
        setMenuVisible(true);
      } else if (delta > DIRECTION_THRESHOLD) {
        setMenuVisible(false);
      } else if (delta < -DIRECTION_THRESHOLD) {
        setMenuVisible(true);
      }
      if (Math.abs(delta) > DIRECTION_THRESHOLD || y <= 0) {
        lastY = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [foldThreshold]);

  return { offset, menuVisible, scrolledPastFold };
}
