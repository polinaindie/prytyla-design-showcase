import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_PHOTOS } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/photos` — node `1280:30950` */
export function IconPhotos(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_PHOTOS}
      idPrefix="icon-photos"
      {...props}
    />
  );
}
