import type { CSSProperties, ReactNode } from "react";
import { compactGridColumns } from "./showcaseCompactLayout";
import styles from "./showcaseCompactCards.module.css";

type ShowcaseCompactGridProps = {
  itemCount: number;
  columns?: 2 | 3;
  children: ReactNode;
  className?: string;
};

export function ShowcaseCompactGrid({
  itemCount,
  columns,
  children,
  className,
}: ShowcaseCompactGridProps) {
  const cols = columns ?? compactGridColumns(itemCount);
  const style = { "--compact-cols": String(cols) } as CSSProperties;
  const rootClass = [styles.grid, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={rootClass} style={style}>
      {children}
    </div>
  );
}
