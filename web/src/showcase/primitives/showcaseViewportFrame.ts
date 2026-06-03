import type { CSSProperties } from "react";
import { showcaseTypographyStyle } from "../showcaseTypography";

export function showcaseViewportFrameStyle(
  width: number,
  options?: { constrainWidth?: boolean },
): CSSProperties {
  return showcaseTypographyStyle(width, options) as CSSProperties;
}
