import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_SPARKLE_14 } from "./iconFigmaSources";

/** Figma GeneralWidget subscription callout — node `287:14999` */
export function IconSparkle14({ size = 14, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_SPARKLE_14}
      idPrefix="icon-sparkle-14"
      size={size}
      {...props}
    />
  );
}
