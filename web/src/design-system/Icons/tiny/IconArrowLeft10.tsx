import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_LEFT_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Arrow-Left` — node `1319:35979` */
export function IconArrowLeft10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_LEFT_10}
      idPrefix="icon-arrow-left-10"
      size={size}
      {...props}
    />
  );
}
