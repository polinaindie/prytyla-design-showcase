import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_DROPDOWN } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Dropdown` — node `1185:31193` */
export function IconDropdown(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_DROPDOWN}
      idPrefix="icon-dropdown"
      {...props}
    />
  );
}
