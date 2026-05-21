import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Figma `State` on Filter Chip (459:10025). */
export type FilterChipState = "default" | "active";

export type FilterChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children: ReactNode;
  /** @default "default" */
  state?: FilterChipState;
};
