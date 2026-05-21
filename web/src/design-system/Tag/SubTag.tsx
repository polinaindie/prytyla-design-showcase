import type { SubTagProps } from "./SubTag.types";
import styles from "./SubTag.module.css";

export function SubTag({ children, className, ...rest }: SubTagProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <span className={rootClass} {...rest}>
      <span className={styles.label}>{children}</span>
      <span className={styles.underline} aria-hidden />
    </span>
  );
}
