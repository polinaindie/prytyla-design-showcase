import type { ReactNode } from "react";

/** Figma Accordeon (292:5029) — Default · Hover · Opened */
export type AccordionItemProps = {
  /** Унікальний id (для Accordion-групи); без Accordion — локальний стан */
  id?: string;
  question: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
};
