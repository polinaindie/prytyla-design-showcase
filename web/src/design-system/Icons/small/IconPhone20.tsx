import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_PHONE_20 } from "./iconFigmaSources";

/** Figma `Icon/20/Phone` — node `5:8742` */
export function IconPhone20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_PHONE_20}
      idPrefix="icon-phone-20"
      size={size}
      {...props}
    />
  );
}
