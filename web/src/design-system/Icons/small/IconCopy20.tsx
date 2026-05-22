import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_COPY_20 } from "./iconFigmaSources";

/** Figma Copy Icon — node `284:13987` */
export function IconCopy20({ size = 20, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_COPY_20}
      idPrefix="icon-copy-20"
      size={size}
      {...props}
    />
  );
}
