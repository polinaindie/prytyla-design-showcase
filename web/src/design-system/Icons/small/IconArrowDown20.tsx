import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_DOWN_20 } from "./iconFigmaSources";

/** Figma `Icon/20/Arrow Down` — node `1261:29064` */
export function IconArrowDown20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_DOWN_20}
      idPrefix="icon-arrow-down-20"
      size={size}
      {...props}
    />
  );
}
