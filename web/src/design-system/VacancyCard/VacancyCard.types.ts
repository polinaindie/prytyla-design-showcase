import type { AnchorHTMLAttributes } from "react";

/** Figma Vacancy Card 1162:31929 — Default · Hover (CSS). */
export type VacancyCardProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  title: string;
  description: string;
  href: string;
};
