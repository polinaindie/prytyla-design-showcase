import type { ComponentType } from "react";
import {
  IconPaymentBank,
  IconPaymentCard,
  IconPaymentCrypto,
  IconPaymentPaypal,
  IconPaymentSwift,
} from "../Icons";
import type { IconProps } from "../Icons/Icon.types";
import type { PaymentInfoType } from "./PaymentInfo.types";

export const PAYMENT_TYPE_ICONS: Record<
  PaymentInfoType,
  ComponentType<IconProps>
> = {
  card: IconPaymentCard,
  bank: IconPaymentBank,
  paypal: IconPaymentPaypal,
  crypto: IconPaymentCrypto,
  swift: IconPaymentSwift,
};
