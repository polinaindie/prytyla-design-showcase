import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_ERROR } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Error` — node `1256:29906` */
export function IconError(props: IconProps) {
  return (
    <IconFigmaSvg figmaSvg={FIGMA_SVG_ERROR} idPrefix="icon-error" {...props} />
  );
}
