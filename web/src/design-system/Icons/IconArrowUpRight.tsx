import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_ARROW_UP_RIGHT } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Arrow-Up-Right` — node `5:8891` */
export function IconArrowUpRight(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_UP_RIGHT}
      idPrefix="icon-arrow-up-right"
      {...props}
    />
  );
}
