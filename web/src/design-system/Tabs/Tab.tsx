import type { TabProps } from "./Tab.types";
import styles from "./Tab.module.css";

export function Tab({
  children,
  selected = false,
  className,
  ...rest
}: TabProps) {
  const tabClass = [styles.tab, selected ? styles.selected : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="tab"
      className={tabClass}
      aria-selected={selected}
      {...rest}
    >
      <span className={styles.labelShell}>
        <span
          className={styles.labelActive}
          aria-hidden={!selected}
        >
          {children}
        </span>
        <span
          className={styles.labelInactive}
          aria-hidden={selected}
        >
          {children}
        </span>
      </span>
      <span className={styles.indicator} aria-hidden />
    </button>
  );
}
