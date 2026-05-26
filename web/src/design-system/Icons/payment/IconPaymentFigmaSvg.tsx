import type { IconProps } from "../Icon.types";
import { applyIconSvgAttrs } from "../normalizeFigmaIconSvg";
import { normalizePaymentIconSvg } from "./normalizePaymentIconSvg";

type IconPaymentFigmaSvgProps = IconProps & {
  figmaSvg: string;
  idPrefix: string;
  /** Без сірої плитки 36×36 — лише glyph (PaymentInfo tile). */
  glyphOnly?: boolean;
};

/** Figma Icon/Payment 36px — monochrome via currentColor on parent. */
export function IconPaymentFigmaSvg({
  figmaSvg,
  idPrefix,
  className,
  size = 36,
  glyphOnly = false,
  "aria-hidden": ariaHidden = true,
}: IconPaymentFigmaSvgProps) {
  const normalized = normalizePaymentIconSvg(figmaSvg, idPrefix, { glyphOnly });
  const html = applyIconSvgAttrs(normalized, undefined, size);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", lineHeight: 0 }}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
