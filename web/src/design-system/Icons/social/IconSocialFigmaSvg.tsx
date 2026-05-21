import type { IconProps } from "../Icon.types";
import { applyIconSvgAttrs } from "../normalizeFigmaIconSvg";
import { normalizeSocialIconSvg } from "./normalizeSocialIconSvg";

type IconSocialFigmaSvgProps = IconProps & {
  figmaSvg: string;
  idPrefix: string;
};

/** Figma Icon/Social — monochrome silhouette via currentColor on parent. */
export function IconSocialFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  size = 24,
  "aria-hidden": ariaHidden = true,
}: IconSocialFigmaSvgProps) {
  const normalized = normalizeSocialIconSvg(figmaSvg, idPrefix);
  const html = applyIconSvgAttrs(normalized, className, size);

  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0, color: "currentColor" }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
