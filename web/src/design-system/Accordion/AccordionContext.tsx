import { createContext, useContext } from "react";

export type AccordionContextValue = {
  allowMultiple: boolean;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
};

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
);

export function useAccordionContext(): AccordionContextValue | null {
  return useContext(AccordionContext);
}
