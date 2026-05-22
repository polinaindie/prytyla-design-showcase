import type { ButtonHTMLAttributes } from "react";

/** Figma Quick Amount 1407:37060 — Default · Hover (CSS only, без selected). */
export type QuickAmountProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Сума після «+». */
  amount: number | string;
  /** Код валюти після суми; за замовчуванням UAH. */
  currency?: string;
};
