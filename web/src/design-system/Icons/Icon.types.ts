import type { SVGAttributes } from "react";

/** Shared props for Figma Icon/24/* components. */
export type IconProps = Omit<
  SVGAttributes<SVGSVGElement>,
  "width" | "height" | "viewBox" | "xmlns"
> & {
  /** @default 24 */
  size?: number;
  /** Payment icons: прибрати сіру плитку 36×36, лишити glyph. */
  glyphOnly?: boolean;
};
