import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_RIGHT_DOUBLE_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Arrow-Right-Double` — node `1319:36159` */
export function IconArrowRightDouble10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_RIGHT_DOUBLE_10}
      idPrefix="icon-arrow-right-double-10"
      size={size}
      {...props}
    />
  );
}
