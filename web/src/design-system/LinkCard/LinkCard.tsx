import { Illustration3D } from "../Illustration3D";
import { IconFigmaSvg } from "../Icons/IconFigmaSvg";
import {
  FIGMA_SVG_ARROW_RIGHT_40,
  FIGMA_SVG_ARROW_UP_RIGHT_40,
} from "../Icons/large/iconFigmaSources";
import type { LinkCardProps } from "./LinkCard.types";
import styles from "./LinkCard.module.css";

const LINK_CARD_ARROW_SIZE = 40;

function LinkCardInternalArrowIcon({ idSuffix }: { idSuffix: "lead" | "follow" }) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_RIGHT_40}
      idPrefix={`link-card-arrow-${idSuffix}`}
      className={styles.arrowIcon}
      size={LINK_CARD_ARROW_SIZE}
      aria-hidden
    />
  );
}

function LinkCardExternalArrowIcon({
  idSuffix,
  className,
}: {
  idSuffix: "lead" | "follow";
  className: string;
}) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT_40}
      idPrefix={`link-card-arrow-external-${idSuffix}`}
      className={className}
      size={LINK_CARD_ARROW_SIZE}
      aria-hidden
    />
  );
}

export function LinkCard({
  title,
  illustration,
  showIllustration = true,
  size = "desktop",
  titleSize,
  external = false,
  href,
  className,
  ...rest
}: LinkCardProps) {
  const resolvedTitleSize = titleSize ?? (size === "mobile" ? "mobile" : "desktop");

  const rootClass = [
    styles.root,
    size === "mobile" ? styles.mobile : styles.desktop,
    external && styles.external,
    !showIllustration && styles.noIllustration,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClass = [
    styles.title,
    resolvedTitleSize === "desktop"
      ? styles.titleDesktop
      : size === "desktop"
        ? styles.titleMobileOpen
        : styles.titleMobile,
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
          <span className={styles.arrow} aria-hidden>
            {external ? (
              <span className={styles.arrowTrackExternal}>
                <LinkCardExternalArrowIcon
                  idSuffix="lead"
                  className={styles.arrowIconExternalLead}
                />
                <LinkCardExternalArrowIcon
                  idSuffix="follow"
                  className={styles.arrowIconExternalFollow}
                />
              </span>
            ) : (
              <span className={styles.arrowTrack}>
                <LinkCardInternalArrowIcon idSuffix="lead" />
                <LinkCardInternalArrowIcon idSuffix="follow" />
              </span>
            )}
          </span>
        ) : null}
      </span>
    </a>
  );
}
