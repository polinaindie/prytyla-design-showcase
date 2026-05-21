import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_UP_RIGHT_32 } from "./iconFigmaSources";

/** Figma `Icon/32/Arrow-Up-Right` — node `1163:26966` */
export function IconArrowUpRight32({ size = 32, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT_32}
      idPrefix="icon-arrow-up-right-32"
      size={size}
      {...props}
    />
  );
}
