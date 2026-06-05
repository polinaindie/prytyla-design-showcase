import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_BREADCRUMB_ARROW_7 } from "./iconFigmaSources";

/** Figma `Breadcrumb Arrow` — node `3:6956` (7×11). */
export function IconBreadcrumbArrow7({
  size = 7,
  ...props
}: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_BREADCRUMB_ARROW_7}
      idPrefix="icon-breadcrumb-arrow-7"
      size={size}
      height={11}
      {...props}
    />
  );
}
