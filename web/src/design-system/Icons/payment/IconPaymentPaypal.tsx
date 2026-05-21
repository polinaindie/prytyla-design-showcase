import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_PAYPAL } from "./iconFigmaSources";

/** Figma Icons/Paypal — node `1411:38051` */
export function IconPaymentPaypal(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_PAYPAL}
      idPrefix="icon-payment-paypal"
      {...props}
    />
  );
}
