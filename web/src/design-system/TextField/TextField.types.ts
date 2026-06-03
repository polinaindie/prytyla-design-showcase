import type { InputHTMLAttributes, ReactNode } from "react";

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "id"
> & {
  /** Figma label text — над полем. Не показується при hideLabel (передайте aria-label на input). */
  label?: string;
  /** Без видимого label (напр. пошук у DepartmentSelect). */
  hideLabel?: boolean;
  /** Figma supporting text. */
  helperText?: string;
  /** Приховати supporting text (Figma showSupportingText=false). */
  hideHelperText?: boolean;
  /** Помилка валідації — червона обводка, IconError, helper у кольорі помилки. */
  error?: boolean;
  /** Іконка зліва (напр. IconSearch), слот 36×24. */
  leadingIcon?: ReactNode;
  /**
   * Іконка / кнопка справа (напр. IconClose для clear).
   * У стані error показується IconError замість trailing.
   */
  trailingIcon?: ReactNode;
  /** Клік по trailing (кнопка clear). */
  onTrailingIconClick?: () => void;
  /** aria-label для trailing-кнопки. */
  trailingIconLabel?: string;
  id?: string;
};
