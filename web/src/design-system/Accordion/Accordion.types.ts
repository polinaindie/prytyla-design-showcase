import type { ReactNode } from "react";

export type AccordionProps = {
  children: ReactNode;
  /** Дозволити кілька відкритих пунктів одночасно */
  allowMultiple?: boolean;
  className?: string;
};
