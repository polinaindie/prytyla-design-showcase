import type { IconProps } from "../Icon.types";
import { IconIllustrationFigmaSvg } from "./IconIllustrationFigmaSvg";
import { FIGMA_SVG_ILLUSTRATION_DATA_ERROR } from "./iconFigmaSources";

/** Figma Icon/100×100/DataError — node `1317:38911` */
export function IconIllustrationDataError(props: IconProps) {
  return (
    <IconIllustrationFigmaSvg
      figmaSvg={FIGMA_SVG_ILLUSTRATION_DATA_ERROR}
      idPrefix="icon-illustration-data-error"
      {...props}
    />
  );
}
