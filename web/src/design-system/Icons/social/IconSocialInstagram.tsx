import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_INSTAGRAM } from "./iconFigmaSources";

/** Figma Icon/Social Instagram — node `3:8052` */
export function IconSocialInstagram(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_INSTAGRAM}
      idPrefix="icon-social-instagram"
      {...props}
    />
  );
}
