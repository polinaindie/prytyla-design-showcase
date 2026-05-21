import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Figma Tabs item (1161:28678) — State=Active | Default. */
export type TabProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type"
> & {
  children: ReactNode;
  /** Selected tab (Figma State=Active). */
  selected?: boolean;
};

export type TabItem = {
  id: string;
  label: string;
};

export type TabsProps = {
  items: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  "aria-label"?: string;
};
