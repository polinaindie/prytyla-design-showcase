import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_CHEVRON_RIGHT_20 } from "./iconFigmaSources";

/** Figma Main News carousel — Icon in Button 292:5079 */
export function IconChevronRight20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_CHEVRON_RIGHT_20}
      idPrefix="icon-chevron-right-20"
      size={size}
      {...props}
    />
  );
}
