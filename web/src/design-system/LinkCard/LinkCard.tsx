import { Illustration3D } from "../Illustration3D";
import { IconArrowLeft40 } from "../Icons";
import type { LinkCardProps } from "./LinkCard.types";
import styles from "./LinkCard.module.css";

export function LinkCard({
  title,
  illustration,
  size = "desktop",
  titleSize,
  href,
  className,
  ...rest
}: LinkCardProps) {
  const resolvedTitleSize = titleSize ?? (size === "mobile" ? "mobile" : "desktop");

  const rootClass = [
    styles.root,
    size === "mobile" ? styles.mobile : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClass = [
    styles.title,
    resolvedTitleSize === "mobile" ? styles.titleMobile : styles.titleDesktop,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={rootClass} {...rest}>
      <span className={styles.illustrationWrap}>
        <Illustration3D variant={illustration} aria-hidden />
      </span>
      <span className={styles.body}>
        <span className={titleClass}>{title}</span>
        <IconArrowLeft40 className={styles.arrow} size={40} aria-hidden />
      </span>
    </a>
  );
}
