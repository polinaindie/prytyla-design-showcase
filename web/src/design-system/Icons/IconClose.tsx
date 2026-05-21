import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_CLOSE } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Close` — node `3:8004` */
export function IconClose(props: IconProps) {
  return (
    <IconFigmaSvg figmaSvg={FIGMA_SVG_CLOSE} idPrefix="icon-close" {...props} />
  );
}
