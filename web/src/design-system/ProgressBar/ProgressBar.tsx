import type { ProgressBarProps } from "./ProgressBar.types";
import styles from "./ProgressBar.module.css";

function resolveVariant(
  value: number,
  variant: ProgressBarProps["variant"],
): "inProgress" | "done" {
  if (variant) return variant;
  return value >= 100 ? "done" : "inProgress";
}

export function ProgressBar({
  value,
  variant,
  className,
  label,
}: ProgressBarProps) {
  const resolvedVariant = resolveVariant(value, variant);
  const isDone = resolvedVariant === "done";
  const displayValue = Math.round(value);
  const fillPercent = Math.min(Math.max(value, 0), 100);
  const ariaLabel = label ?? `Прогрес: ${displayValue}%`;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const badgeClass = [styles.badge, isDone ? styles.badgeDone : ""]
    .filter(Boolean)
    .join(" ");

  const badgeStyle = isDone
    ? undefined
    : { left: `${fillPercent}%` as const };

  return (
    <div
      className={rootClass}
      role="progressbar"
      aria-valuenow={displayValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div className={styles.track}>
        {!isDone ? (
          <div
            className={styles.fill}
            style={{ width: `${fillPercent}%` }}
          />
        ) : null}
      </div>
      <span className={badgeClass} style={badgeStyle}>
        {displayValue}%
      </span>
    </div>
  );
}
