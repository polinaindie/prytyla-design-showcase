import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_CHEVRON_DOWN_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Chevron-Down` — node `3:7824` */
export function IconChevronDown10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_CHEVRON_DOWN_10}
      idPrefix="icon-chevron-down-10"
      size={size}
      {...props}
    />
  );
}
