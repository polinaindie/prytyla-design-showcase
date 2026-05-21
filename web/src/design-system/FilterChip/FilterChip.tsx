import type { FilterChipProps } from "./FilterChip.types";
import styles from "./FilterChip.module.css";

export function FilterChip({
  state = "default",
  className,
  children,
  disabled,
  ...rest
}: FilterChipProps) {
  const isActive = state === "active";
  const rootClass = [
    styles.root,
    isActive ? styles.active : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={rootClass}
      disabled={disabled}
      aria-pressed={isActive}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
    </button>
  );
}
