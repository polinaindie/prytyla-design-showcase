import type { HTMLAttributes } from "react";
import styles from "./NewsCardPagination.module.css";

export type NewsCardPaginationProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /** Кількість слайдів (Figma Carousel Dots). */
  count: number;
  /** Активний індекс (0-based). */
  activeIndex?: number;
};

/** Figma Main News 292:5047 — Carousel Dots (не клікабельні без onSelect). */
export function NewsCardPagination({
  count,
  activeIndex = 0,
  className,
  ...rest
}: NewsCardPaginationProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClass}
      role="tablist"
      aria-label="Слайди новин"
      {...rest}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={styles.dot}
          data-active={index === activeIndex ? "true" : "false"}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Слайд ${index + 1}`}
        />
      ))}
    </div>
  );
}
