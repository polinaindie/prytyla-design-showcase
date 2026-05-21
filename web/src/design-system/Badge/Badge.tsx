import { useId } from "react";
import { IconClose20 } from "../Icons";
import { Tooltip } from "../Tooltip";
import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.css";

export function Badge({
  children,
  onDismiss,
  dismissLabel = "Зняти",
  categoryPath,
  className,
  ...rest
}: BadgeProps) {
  const tooltipId = useId();
  const hasCategoryPath = Boolean(categoryPath?.length);
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const badge = (
    <span
      className={rootClass}
      aria-describedby={hasCategoryPath ? tooltipId : undefined}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label={dismissLabel}
      >
        <IconClose20 size={16} className={styles.dismissIcon} aria-hidden />
      </button>
    </span>
  );

  if (!hasCategoryPath) {
    return badge;
  }

  return (
    <span className={styles.wrapper}>
      <Tooltip
        id={tooltipId}
        segments={categoryPath!}
        className={styles.tooltip}
      />
      {badge}
    </span>
  );
}
