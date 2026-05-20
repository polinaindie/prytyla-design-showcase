import type { CSSProperties, ReactNode } from "react";
import styles from "./ShowcaseGrid.module.css";

type ShowcaseGridColumns = 1 | 2 | 3 | 4;

type ShowcaseGridProps = {
  columns?: ShowcaseGridColumns;
  children: ReactNode;
};

export function ShowcaseGrid({ columns = 2, children }: ShowcaseGridProps) {
  const style = {
    "--showcase-grid-columns": String(columns),
  } as CSSProperties;

  return (
    <div className={styles.grid} style={style}>
      {children}
    </div>
  );
}
