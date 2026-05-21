import type { DropdownItemProps } from "./DropdownItem.types";
import styles from "./DropdownItem.module.css";

export function DropdownItem({
  className,
  children,
  disabled,
  ...rest
}: DropdownItemProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <button type="button" className={rootClass} disabled={disabled} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
