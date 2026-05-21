import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_CALENDAR } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Calendar` — node `1185:31219` */
export function IconCalendar(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_CALENDAR}
      idPrefix="icon-calendar"
      {...props}
    />
  );
}
