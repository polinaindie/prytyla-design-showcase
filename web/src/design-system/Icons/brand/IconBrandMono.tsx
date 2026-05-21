import type { IconProps } from "../Icon.types";
import { IconBrandFigmaSvg } from "./IconBrandFigmaSvg";
import { FIGMA_SVG_BRAND_MONO } from "./iconFigmaSources";

export type IconBrandMonoProps = Omit<IconProps, "size"> & {
  width?: number;
  height?: number;
};

/** Figma Icon/24/Mono — node `760:2510`, viewBox 0 0 58 24 */
export function IconBrandMono({ width = 58, height = 24, ...props }: IconBrandMonoProps) {
  return (
    <IconBrandFigmaSvg
      figmaSvg={FIGMA_SVG_BRAND_MONO}
      idPrefix="icon-brand-mono"
      width={width}
      height={height}
      {...props}
    />
  );
}
