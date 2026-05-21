import type { IconProps } from "../Icon.types";
import { applyIconSvgAttrs } from "../normalizeFigmaIconSvg";
import { normalizeIllustrationIconSvg } from "./normalizeIllustrationIconSvg";

type IconIllustrationFigmaSvgProps = IconProps & {
  figmaSvg: string;
  idPrefix: string;
};

/** Figma Icon/100×100 — colors preserved from export. */
export function IconIllustrationFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  size = 100,
  "aria-hidden": ariaHidden = true,
}: IconIllustrationFigmaSvgProps) {
  const normalized = normalizeIllustrationIconSvg(figmaSvg, idPrefix);
  const html = applyIconSvgAttrs(normalized, className, size);

  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0 }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
