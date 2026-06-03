import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  className?: string;
  /** Figma status=SomeSelected — частковий вибір (indeterminate). */
  indeterminate?: boolean;
  /** Optional visible label (Figma MultiDrop row). */
  children?: ReactNode;
};
