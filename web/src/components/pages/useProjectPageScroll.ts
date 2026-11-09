import { useEffect, useRef, useState, type RefObject } from "react";

/** px — мінімальний рух, щоб вважати його напрямком скролу (відсікає дрижання тачпада). */
const DIRECTION_THRESHOLD = 6;

type ProjectPageScroll = {
  /** window.scrollY відносно верху `anchorRef` (≥ 0) — живить morph віджета. */
  offset: number;
  /** false — скрол вниз (меню сховане), true — на самому верху або скрол вгору. */
  menuVisible: boolean;
  /** window.scrollY ≥ threshold — показати кнопку «нагору». */
  scrolledPastFold: boolean;
};

/**
 * Один passive scroll-listener на сторінку:
 * - `offset` для GeneralWidget layout=article (articleScrollOffset);
 * - напрямок скролу для меню (ховається вниз, з'являється вгору над
 *   breadcrumbs + віджетом);
 * - прапорець для кнопки «нагору».
 */
export function useProjectPageScroll(
  anchorRef: RefObject<HTMLElement | null>,
  options: { menuLocked?: boolean; foldThreshold?: number } = {},
): ProjectPageScroll {
  const { menuLocked = false, foldThreshold = 600 } = options;
  const [offset, setOffset] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const [scrolledPastFold, setScrolledPastFold] = useState(false);
  const lastY = useRef(0);
  const menuLockedRef = useRef(menuLocked);

  useEffect(() => {
    menuLockedRef.current = menuLocked;
    if (menuLocked) {
      setMenuVisible(true);
    }
  }, [menuLocked]);

  useEffect(() => {
    const update = () => {
      const y = Math.max(0, window.scrollY);
      const anchorTop = anchorRef.current
        ? anchorRef.current.getBoundingClientRect().top + window.scrollY
        : 0;

      setOffset(Math.max(0, y - anchorTop));
      setScrolledPastFold(y >= foldThreshold);

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
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef, foldThreshold]);

  return { offset, menuVisible, scrolledPastFold };
}
