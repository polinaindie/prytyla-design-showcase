import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_FACEBOOK } from "./iconFigmaSources";

/** Figma Icon/Social Facebook — node `3:8051` */
export function IconSocialFacebook(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_FACEBOOK}
      idPrefix="icon-social-facebook"
      {...props}
    />
  );
}
