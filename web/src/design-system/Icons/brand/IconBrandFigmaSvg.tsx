import type { IconProps } from "../Icon.types";
import { normalizeBrandIconSvg } from "./normalizeBrandIconSvg";

type IconBrandFigmaSvgProps = Omit<IconProps, "size"> & {
  figmaSvg: string;
  idPrefix: string;
  width: number;
  height: number;
};

function applyBrandSvgAttrs(
  svg: string,
  className: string | undefined,
  width: number,
  height: number,
): string {
  return svg.replace(/<svg([^>]*)>/, (_match, attrs: string) => {
    const withoutSize = attrs
      .replace(/\s*width="[^"]*"/, "")
      .replace(/\s*height="[^"]*"/, "");
    const cls = className ? ` class="${className}"` : "";
    return `<svg${withoutSize} width="${width}" height="${height}"${cls}>`;
  });
}

/** Figma brand marks — preserve gradients and fills from export. */
export function IconBrandFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  width,
  height,
  "aria-hidden": ariaHidden = true,
}: IconBrandFigmaSvgProps) {
  const normalized = normalizeBrandIconSvg(figmaSvg, idPrefix);
  const html = applyBrandSvgAttrs(normalized, className, width, height);

  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0 }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
