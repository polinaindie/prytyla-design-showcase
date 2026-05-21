import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_REPEAT } from "./iconFigmaSources";

/** Figma Icons/Repeat — node `1411:38080` */
export function IconPaymentRepeat(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_REPEAT}
      idPrefix="icon-payment-repeat"
      {...props}
    />
  );
}
