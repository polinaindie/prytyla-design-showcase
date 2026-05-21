import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_UP_RIGHT_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Arrow-Up-Right` — node `817:15808` */
export function IconArrowUpRight10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT_10}
      idPrefix="icon-arrow-up-right-10"
      size={size}
      {...props}
    />
  );
}
