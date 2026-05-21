import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_MORE_HORIZONTAL } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/More-Horizontal` — node `3:7776` */
export function IconMoreHorizontal(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_MORE_HORIZONTAL}
      idPrefix="icon-more-horizontal"
      {...props}
    />
  );
}
