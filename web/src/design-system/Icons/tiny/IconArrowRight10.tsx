import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_RIGHT_10 } from "./iconFigmaSources";

/** Figma `Icon/10/Arrow-Right` — node `1319:35980` */
export function IconArrowRight10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_RIGHT_10}
      idPrefix="icon-arrow-right-10"
      size={size}
      {...props}
    />
  );
}
