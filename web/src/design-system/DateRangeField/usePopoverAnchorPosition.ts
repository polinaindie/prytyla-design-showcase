import { useLayoutEffect, useState, type RefObject } from "react";

export type PopoverAnchorPosition = {
  top: number;
  left: number;
  width: number;
};

function readGapPx(): number {
  if (typeof document === "undefined") return 4;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--space-xsmall")
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 4;
}

export function usePopoverAnchorPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
): PopoverAnchorPosition | null {
  const [position, setPosition] = useState<PopoverAnchorPosition | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return undefined;
    }

    const anchor = anchorRef.current;
    if (!anchor) return undefined;

    const sync = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({
        top: rect.bottom + readGapPx(),
        left: rect.left,
        width: rect.width,
      });
    };

    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(anchor);

    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [anchorRef, open]);

  return position;
}
