import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_CARD } from "./iconFigmaSources";

/** Figma Icons/Card — node `1411:38047` */
export function IconPaymentCard(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_CARD}
      idPrefix="icon-payment-card"
      {...props}
    />
  );
}
