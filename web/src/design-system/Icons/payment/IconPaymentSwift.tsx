import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_SWIFT } from "./iconFigmaSources";

/** Figma Icons/Swift — node `1411:38057` */
export function IconPaymentSwift(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_SWIFT}
      idPrefix="icon-payment-swift"
      {...props}
    />
  );
}
