import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_BANK } from "./iconFigmaSources";

/** Figma Icons/Bank — node `1411:38062` */
export function IconPaymentBank(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_BANK}
      idPrefix="icon-payment-bank"
      {...props}
    />
  );
}
