import type { ReactNode } from "react";
import type { CurrencySelectProps } from "../CurrencySelect/CurrencySelect.types";

/** Figma PaymentInfo (284:13904) — PaymentType */
export type PaymentInfoType = "card" | "bank" | "paypal" | "crypto" | "swift";

export type PaymentInfoField = {
  label: string;
  value: ReactNode;
  /** Текст для clipboard; якщо задано — кнопка Copy */
  copyValue?: string;
  /** SWIFT IBAN — валютний перемикач (Figma CurrencyPicker) */
  currency?: Pick<CurrencySelectProps, "value" | "onChange" | "options">;
};

export type PaymentInfoProps = {
  id?: string;
  paymentType: PaymentInfoType;
  title: ReactNode;
  fields: PaymentInfoField[];
  /** Figma ShowDescription=Yes — вступний текст у панелі */
  description?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
};

export type PaymentInfoGroupProps = {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
};
