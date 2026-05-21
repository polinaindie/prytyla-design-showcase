import type { TooltipProps } from "./Tooltip.types";
import styles from "./Tooltip.module.css";

const SEPARATOR = " → ";

export function Tooltip({ segments, id, className }: TooltipProps) {
  if (segments.length === 0) {
    return null;
  }

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div id={id} role="tooltip" className={rootClass}>
      <p className={styles.text}>{segments.join(SEPARATOR)}</p>
    </div>
  );
}
