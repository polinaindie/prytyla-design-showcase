import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_DROPDOWN } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma Accordeon chevron — node `292:5044` (20×11 artboard). */
const DROPDOWN_ASPECT_HEIGHT = 11 / 20;

type IconDropdownProps = IconProps & {
  /** @default proportional to size (11/20) */
  height?: number;
};

export function IconDropdown({
  size = 24,
  height,
  ...props
}: IconDropdownProps) {
  const resolvedHeight = height ?? Math.round(size * DROPDOWN_ASPECT_HEIGHT);

  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_DROPDOWN}
      idPrefix="icon-dropdown"
      size={size}
      height={resolvedHeight}
      {...props}
    />
  );
}
