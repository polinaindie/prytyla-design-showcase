import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_ARROW_RIGHT_40 } from "./iconFigmaSources";

/** Figma mirror of `Icon/40/Arrow-Left` (`307:3917`) — horizontal arrow right at 40px. */
export function IconArrowRight40({ size = 40, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_ARROW_RIGHT_40}
      idPrefix="icon-arrow-right-40"
      size={size}
      {...props}
    />
  );
}
