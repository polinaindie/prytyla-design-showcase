import type { IconProps } from "./Icon.types";
import { applyIconSvgAttrs, normalizeFigmaIconSvg } from "./normalizeFigmaIconSvg";

type IconFigmaSvgProps = IconProps & {
  /** Raw SVG from Figma `node.exportAsync({ format: 'SVG_STRING' })`. */
  figmaSvg: string;
  /** Unique prefix for clipPath ids (e.g. `icon-menu`). */
  idPrefix: string;
  /** When set, SVG height differs from `size` width (e.g. 10×5 caret). */
  height?: number;
};

/**
 * Renders Figma-exported SVG markup (not hand-drawn paths).
 * Uses currentColor per Token approximation rule.
 */
export function IconFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  size = 24,
  height,
  "aria-hidden": ariaHidden = true,
}: IconFigmaSvgProps) {
  const normalized = normalizeFigmaIconSvg(figmaSvg, idPrefix);
  const html = applyIconSvgAttrs(normalized, undefined, size, height);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", lineHeight: 0 }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
