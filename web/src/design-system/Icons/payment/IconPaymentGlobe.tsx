import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_GLOBE } from "./iconFigmaSources";

/** Figma Icons/Globe — node `1411:38091` */
export function IconPaymentGlobe(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_GLOBE}
      idPrefix="icon-payment-globe"
      {...props}
    />
  );
}
