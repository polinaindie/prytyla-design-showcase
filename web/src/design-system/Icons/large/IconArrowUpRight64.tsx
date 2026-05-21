import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_UP_RIGHT_64 } from "./iconFigmaSources";

/** Figma `Icon/64/Arrow-Up-Right` — node `103:6345` */
export function IconArrowUpRight64({ size = 64, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT_64}
      idPrefix="icon-arrow-up-right-64"
      size={size}
      {...props}
    />
  );
}
