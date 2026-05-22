import { createContext, useContext } from "react";

export type PaymentInfoContextValue = {
  allowMultiple: boolean;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
};

export const PaymentInfoContext = createContext<PaymentInfoContextValue | null>(
  null,
);

export function usePaymentInfoContext(): PaymentInfoContextValue | null {
  return useContext(PaymentInfoContext);
}
