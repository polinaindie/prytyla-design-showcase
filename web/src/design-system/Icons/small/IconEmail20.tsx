import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_EMAIL_20 } from "./iconFigmaSources";

/** Figma `Icon/20/Email` — node `5:8743` */
export function IconEmail20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_EMAIL_20}
      idPrefix="icon-email-20"
      size={size}
      {...props}
    />
  );
}
