import type { ButtonHTMLAttributes } from "react";

export type CurrencyOptionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  code: string;
};
