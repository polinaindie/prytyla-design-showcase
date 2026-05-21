import type { IconProps } from "../Icon.types";
import { IconIllustrationFigmaSvg } from "./IconIllustrationFigmaSvg";
import { FIGMA_SVG_ILLUSTRATION_NO_DATA } from "./iconFigmaSources";

/** Figma Icon/100×100/NoData — node `1318:53781` */
export function IconIllustrationNoData(props: IconProps) {
  return (
    <IconIllustrationFigmaSvg
      figmaSvg={FIGMA_SVG_ILLUSTRATION_NO_DATA}
      idPrefix="icon-illustration-no-data"
      {...props}
    />
  );
}
