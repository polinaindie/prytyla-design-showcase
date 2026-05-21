import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_YOUTUBE } from "./iconFigmaSources";

/** Figma Icon/Social YouTube — node `3:8056` */
export function IconSocialYouTube(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_YOUTUBE}
      idPrefix="icon-social-youtube"
      {...props}
    />
  );
}
