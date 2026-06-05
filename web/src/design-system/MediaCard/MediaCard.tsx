import { IconArrowUpRight10, IconArrowUpRight32 } from "../Icons";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
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
  const isMobile = size === "mobile";
  const rootClass = [
    styles.root,
    isMobile ? styles.mobile : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={rootClass} data-size={size} {...rest}>
      <div className={styles.flipInner}>
        <div className={styles.faceFront}>
          <div className={styles.logoDefault}>
            <img
              className={styles.logoImage}
              src={publicAssetUrl(logoSrc)}
              alt={logoAlt}
              decoding="async"
              draggable={false}
            />
          </div>
        </div>

        <div className={styles.faceBack}>
          <div className={styles.backContent}>
            <div className={styles.logoCompact}>
              <img
                className={styles.logoImage}
                src={publicAssetUrl(logoSrc)}
                alt=""
                aria-hidden
                decoding="async"
                draggable={false}
              />
            </div>
            <div className={styles.divider} aria-hidden />
            <p className={styles.title}>{title}</p>
          </div>
          <span
            className={isMobile ? styles.arrowMobile : styles.arrowDesktop}
            aria-hidden
          >
            {isMobile ? (
              <IconArrowUpRight10 size={10} aria-hidden />
            ) : (
              <IconArrowUpRight32 size={32} aria-hidden />
            )}
          </span>
        </div>
      </div>
    </a>
  );
}
