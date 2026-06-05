import { IconFigmaSvg } from "../Icons/IconFigmaSvg";
import {
  FIGMA_SVG_ARROW_UP_RIGHT_32,
  FIGMA_SVG_ARROW_UP_RIGHT_64,
} from "../Icons/large/iconFigmaSources";
import type { DirectionsExternalLinksProps } from "./DirectionsExternalLinks.types";
import styles from "./DirectionsExternalLinks.module.css";

function DirectionsExternalLinksArrowIcon({
  idSuffix,
  size,
  figmaSvg,
  className,
}: {
  idSuffix: "lead" | "follow";
  size: 28 | 64;
  figmaSvg: string;
  className: string;
}) {
  return (
    <IconFigmaSvg
      figmaSvg={figmaSvg}
      idPrefix={`directions-external-arrow-${idSuffix}`}
      className={className}
      size={size}
      aria-hidden
    />
  );
}

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

  const iconSize = size === "mobile" ? 28 : 64;
  const figmaSvg =
    size === "mobile"
      ? FIGMA_SVG_ARROW_UP_RIGHT_32
      : FIGMA_SVG_ARROW_UP_RIGHT_64;

  return (
    <a href={href} className={rootClass} {...rest}>
      <span className={styles.content}>
        <span className={styles.index}>{index}</span>
        <span className={styles.title}>{title}</span>
      </span>
      <span className={styles.arrow} aria-hidden>
        <span className={styles.arrowTrack}>
          <DirectionsExternalLinksArrowIcon
            idSuffix="lead"
            size={iconSize}
            figmaSvg={figmaSvg}
            className={styles.arrowIconLead}
          />
          <DirectionsExternalLinksArrowIcon
            idSuffix="follow"
            size={iconSize}
            figmaSvg={figmaSvg}
            className={styles.arrowIconFollow}
          />
        </span>
      </span>
    </a>
  );
}
