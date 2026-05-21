import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_CLOSE_20 } from "./iconFigmaSources";

/** Figma `Icon/20/Close` — node `1318:53976` */
export function IconClose20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_CLOSE_20}
      idPrefix="icon-close-20"
      size={size}
      {...props}
    />
  );
}
