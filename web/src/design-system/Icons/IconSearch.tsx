import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_SEARCH } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Search` — node `1185:31237` */
export function IconSearch(props: IconProps) {
  return (
    <IconFigmaSvg figmaSvg={FIGMA_SVG_SEARCH} idPrefix="icon-search" {...props} />
  );
}
