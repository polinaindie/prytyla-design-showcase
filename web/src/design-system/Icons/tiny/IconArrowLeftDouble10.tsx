import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_LEFT_DOUBLE_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Arrow-Left-Double` — node `1319:36158` */
export function IconArrowLeftDouble10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_LEFT_DOUBLE_10}
      idPrefix="icon-arrow-left-double-10"
      size={size}
      {...props}
    />
  );
}
