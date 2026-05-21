import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_RECEIPT } from "./iconFigmaSources";

/** Figma Icons/Receipt — node `1411:38073` */
export function IconPaymentReceipt(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_RECEIPT}
      idPrefix="icon-payment-receipt"
      {...props}
    />
  );
}
