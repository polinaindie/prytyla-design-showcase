import { Illustration3D } from "../Illustration3D";
import { IconArrowUpRight40 } from "../Icons";
import type { LinkCardProps } from "./LinkCard.types";
import styles from "./LinkCard.module.css";

export function LinkCard({
  title,
  illustration,
  showIllustration = true,
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
    !showIllustration && styles.noIllustration,
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
      {showIllustration ? (
        <span className={styles.illustrationWrap}>
          <Illustration3D variant={illustration} aria-hidden />
        </span>
      ) : null}
      <span className={styles.body}>
        <span className={titleClass}>{title}</span>
        {size !== "mobile" ? (
          <IconArrowUpRight40 className={styles.arrow} size={40} aria-hidden />
        ) : null}
      </span>
    </a>
  );
}
