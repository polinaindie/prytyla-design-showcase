import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_HEART_FILLED } from "./iconFigmaSources";

/** Figma Icons/HeartFilled — node `1411:38070` */
export function IconPaymentHeartFilled(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_HEART_FILLED}
      idPrefix="icon-payment-heart-filled"
      {...props}
    />
  );
}
