export type CurrencyCode = {
  code: string;
};

export type CurrencySelectAppearance = "chip" | "amount";

export type CurrencySelectProps = {
  options: CurrencyCode[];
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  className?: string;
  /** chip — PaymentInfo; amount — GeneralWidget amount row (Figma tab-label). */
  appearance?: CurrencySelectAppearance;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default false */
  defaultOpen?: boolean;
};
