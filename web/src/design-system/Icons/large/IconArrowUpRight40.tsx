import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_UP_RIGHT_40 } from "./iconFigmaSources";

/** Figma `Icon/40/Arrow-Up-Right` — node `307:3959` */
export function IconArrowUpRight40({ size = 40, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT_40}
      idPrefix="icon-arrow-up-right-40"
      size={size}
      {...props}
    />
  );
}
