import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

/** Figma ChipPaymentType 284:14412 — Default / Hover (selected). */
export type ChipPaymentTypeState = "default" | "selected";

export type ChipPaymentTypeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Підпис під іконкою (Figma labelText). */
  children?: ReactNode;
  /** Figma State=Default | Hover (обраний). */
  state?: ChipPaymentTypeState;
  /** Іконка 20×20 у чіпі; за замовчуванням IconPaymentRepeat. */
  icon?: ReactElement;
  /** Figma label — бейдж «Найдієвіше» зверху. */
  recommendBadge?: boolean;
  /** Текст бейджа; за замовчуванням «Найдієвіше». */
  recommendBadgeText?: string;
  /** Клас на обгортці `<span>` (напр. flex-ряд у GeneralWidget tabs). */
  wrapperClassName?: string;
};
