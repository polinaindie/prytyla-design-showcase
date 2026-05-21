export type CurrencyCode = {
  code: string;
};

export type CurrencySelectProps = {
  options: CurrencyCode[];
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default false */
  defaultOpen?: boolean;
};
