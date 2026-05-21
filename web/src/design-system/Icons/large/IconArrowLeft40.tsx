import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_LEFT_40 } from "./iconFigmaSources";

/** Figma `Icon/40/Arrow-Left` — node `307:3917` */
export function IconArrowLeft40({ size = 40, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_LEFT_40}
      idPrefix="icon-arrow-left-40"
      size={size}
      {...props}
    />
  );
}
