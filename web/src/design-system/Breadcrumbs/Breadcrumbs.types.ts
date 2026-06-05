import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BreadcrumbItem = {
  /** Visible label (Figma Breadcrumb text). */
  label: ReactNode;
  /**
   * Link target for ancestors. Omit on the current page (last item).
   * When set on the last item, it still renders as plain text with aria-current.
   */
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** Accessible name for the `<nav>` landmark. */
  ariaLabel?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"nav">, "children" | "className" | "aria-label">;
