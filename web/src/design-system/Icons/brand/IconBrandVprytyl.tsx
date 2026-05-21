import type { IconProps } from "../Icon.types";
import { IconBrandFigmaSvg } from "./IconBrandFigmaSvg";
import { FIGMA_SVG_BRAND_VPRYTYL } from "./iconFigmaSources";

export type IconBrandVprytylProps = Omit<IconProps, "size"> & {
  width?: number;
  height?: number;
};

/** Figma Icon/Vprytyl — node `1363:36149`, viewBox 0 0 99 13 */
export function IconBrandVprytyl({
  width = 99,
  height = 13,
  ...props
}: IconBrandVprytylProps) {
  return (
    <IconBrandFigmaSvg
      figmaSvg={FIGMA_SVG_BRAND_VPRYTYL}
      idPrefix="icon-brand-vprytyl"
      width={width}
      height={height}
      {...props}
    />
  );
}
