import { IconFigmaSvg } from "../IconFigmaSvg";
import type { IconProps } from "../Icon.types";
import { FIGMA_SVG_DROPDOWN_ARROW_10 } from "./iconFigmaSources";

/** Figma `Dropdown Arrow` in GeneralWidget — node `287:14761` (10×5 caret). */
export function IconDropdownArrow10({ size = 10, ...props }: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_DROPDOWN_ARROW_10}
      idPrefix="icon-dropdown-arrow-10"
      size={size}
      height={5}
      {...props}
    />
  );
}
