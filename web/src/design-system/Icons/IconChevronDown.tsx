import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_CHEVRON_DOWN } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Chevron-Down` — node `1026:24646` */
export function IconChevronDown(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_CHEVRON_DOWN}
      idPrefix="icon-chevron-down"
      {...props}
    />
  );
}
