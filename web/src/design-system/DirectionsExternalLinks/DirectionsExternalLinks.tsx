import { IconArrowUpRight32, IconArrowUpRight64 } from "../Icons";
import type { DirectionsExternalLinksProps } from "./DirectionsExternalLinks.types";
import styles from "./DirectionsExternalLinks.module.css";

export function DirectionsExternalLinks({
  index,
  title,
  href,
  size = "desktop",
  className,
  ...rest
}: DirectionsExternalLinksProps) {
  const rootClass = [
    styles.root,
    size === "mobile" ? styles.mobile : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Icon =
    size === "mobile" ? IconArrowUpRight32 : IconArrowUpRight64;

  return (
    <a href={href} className={rootClass} {...rest}>
      <span className={styles.content}>
        <span className={styles.index}>{index}</span>
        <span className={styles.title}>{title}</span>
      </span>
      <Icon className={styles.icon} aria-hidden />
    </a>
  );
}
