import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_ARROW_LEFT } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Arrow-Left` — node `5:8884` */
export function IconArrowLeft(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_LEFT}
      idPrefix="icon-arrow-left"
      {...props}
    />
  );
}
