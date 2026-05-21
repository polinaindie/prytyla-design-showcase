import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_HEART_EMPTY } from "./iconFigmaSources";

/** Figma Icons/HeartEmpty — node `1411:38067` */
export function IconPaymentHeartEmpty(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_HEART_EMPTY}
      idPrefix="icon-payment-heart-empty"
      {...props}
    />
  );
}
