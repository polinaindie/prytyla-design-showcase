import type { IconProps } from "../Icon.types";
import { applyIconSvgAttrs } from "../normalizeFigmaIconSvg";
import { normalizePaymentIconSvg } from "./normalizePaymentIconSvg";

type IconPaymentFigmaSvgProps = IconProps & {
  figmaSvg: string;
  idPrefix: string;
};

/** Figma Icon/Payment 36px — monochrome via currentColor on parent. */
export function IconPaymentFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  size = 36,
  "aria-hidden": ariaHidden = true,
}: IconPaymentFigmaSvgProps) {
  const normalized = normalizePaymentIconSvg(figmaSvg, idPrefix);
  const html = applyIconSvgAttrs(normalized, className, size);

  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0, color: "currentColor" }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
