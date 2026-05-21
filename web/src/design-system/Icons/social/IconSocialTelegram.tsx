import { IconSocialFigmaSvg } from "./IconSocialFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SOCIAL_TELEGRAM } from "./iconFigmaSources";

/** Figma Icon/Social Telegram — node `3:8053` */
export function IconSocialTelegram(props: IconProps) {
  return (
    <IconSocialFigmaSvg
      figmaSvg={FIGMA_SVG_SOCIAL_TELEGRAM}
      idPrefix="icon-social-telegram"
      {...props}
    />
  );
}
