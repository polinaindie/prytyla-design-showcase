import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_GLOBE_20 } from "./iconFigmaSources";

/** Figma `Icon/20/Globe` — node `3:7945` */
export function IconGlobe20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_GLOBE_20}
      idPrefix="icon-globe-20"
      size={size}
      {...props}
    />
  );
}
