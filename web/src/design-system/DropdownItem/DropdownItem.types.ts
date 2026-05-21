import type { ButtonHTMLAttributes, ReactNode } from "react";

export type DropdownItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children: ReactNode;
};
