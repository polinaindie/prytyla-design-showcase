import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_MENU } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Menu` — node `1115:23555` */
export function IconMenu(props: IconProps) {
  return (
    <IconFigmaSvg figmaSvg={FIGMA_SVG_MENU} idPrefix="icon-menu" {...props} />
  );
}
