import type { IconProps } from "../Icon.types";
import { IconPaymentFigmaSvg } from "./IconPaymentFigmaSvg";
import { FIGMA_SVG_PAYMENT_CRYPTO } from "./iconFigmaSources";

/** Figma Icons/Crypto — node `1411:38054` */
export function IconPaymentCrypto(props: IconProps) {
  return (
    <IconPaymentFigmaSvg
      figmaSvg={FIGMA_SVG_PAYMENT_CRYPTO}
      idPrefix="icon-payment-crypto"
      {...props}
    />
  );
}
