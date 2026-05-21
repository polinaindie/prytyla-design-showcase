import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_LINKEDIN } from "./iconFigmaSources";

/** Figma Icon/Social LinkedIn — node `3:8055` */
export function IconSocialLinkedIn(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_LINKEDIN}
      idPrefix="icon-social-linkedin"
      {...props}
    />
  );
}
