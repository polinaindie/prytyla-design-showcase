import { IconArrowUpRight10, IconArrowUpRight32 } from "../Icons";
import type { MediaCardProps } from "./MediaCard.types";
import styles from "./MediaCard.module.css";

export function MediaCard({
  href,
  logoSrc,
  logoAlt = "",
  title,
  size = "desktop",
  className,
  ...rest
}: MediaCardProps) {
  const rootClass = [
    styles.root,
    size === "mobile" ? styles.mobile : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={rootClass} data-size={size} {...rest}>
      <div className={styles.content}>
        <div className={styles.expandedBlock}>
          <div className={styles.logoCompact}>
            <img
              className={styles.logoImage}
              src={logoSrc}
              alt=""
              aria-hidden
              decoding="async"
              draggable={false}
            />
          </div>
          <div className={styles.divider} aria-hidden />
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.logoDefault}>
          <img
            className={styles.logoImage}
            src={logoSrc}
            alt={logoAlt}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
      <span
        className={size === "desktop" ? styles.arrowDesktop : styles.arrowMobile}
        aria-hidden
      >
        {size === "desktop" ? (
          <IconArrowUpRight32 size={32} aria-hidden />
        ) : (
          <IconArrowUpRight10 size={10} aria-hidden />
        )}
      </span>
    </a>
  );
}
