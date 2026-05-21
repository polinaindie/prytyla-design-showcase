import type { Guideline } from "./showcase.types";
import styles from "./ShowcaseDoDont.module.css";

type ShowcaseDoDontProps = {
  do: Guideline[] | string[];
  dont: Guideline[] | string[];
};

function toText(items: Guideline[] | string[]): string[] {
  return items.map((item) => (typeof item === "string" ? item : item.text));
}

export function ShowcaseDoDont({ do: doItems, dont: dontItems }: ShowcaseDoDontProps) {
  const doLines = toText(doItems);
  const dontLines = toText(dontItems);

  return (
    <div className={styles.grid}>
      <div className={`${styles.panel} ${styles.do}`}>
        <p className={styles.heading}>✓ Do</p>
        <ul className={styles.list}>
          {doLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className={`${styles.panel} ${styles.dont}`}>
        <p className={styles.heading}>✗ Don't</p>
        <ul className={styles.list}>
          {dontLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
