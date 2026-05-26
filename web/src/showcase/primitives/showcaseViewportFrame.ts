import type { CSSProperties } from "react";
import { showcaseTypographyStyle } from "../showcaseTypography";

export function showcaseViewportFrameStyle(width: number): CSSProperties {
  return showcaseTypographyStyle(width) as CSSProperties;
}
