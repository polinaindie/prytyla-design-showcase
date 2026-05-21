import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_X } from "./iconFigmaSources";

/** Figma Icon/Social X — node `3:8054` */
export function IconSocialX(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_X}
      idPrefix="icon-social-x"
      {...props}
    />
  );
}
