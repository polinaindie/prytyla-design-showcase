import type { CSSProperties } from "react";
import { showcaseSemanticSpacingVars } from "../spacingShowcaseUsage";
import { showcaseTypographyStyle } from "../showcaseTypography";

export function showcaseViewportFrameStyle(
  width: number,
  options?: { constrainWidth?: boolean },
): CSSProperties {
  return {
    ...showcaseTypographyStyle(width, options),
    ...showcaseSemanticSpacingVars(width),
  } as CSSProperties;
}
