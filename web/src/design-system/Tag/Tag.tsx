import type { TagProps } from "./Tag.types";
import styles from "./Tag.module.css";

export function Tag({ children, className, ...rest }: TagProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <span className={rootClass} {...rest}>
      {children}
    </span>
  );
}
