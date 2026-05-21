import { useCallback, useMemo, useState } from "react";
import { AccordionContext } from "./AccordionContext";
import type { AccordionProps } from "./Accordion.types";
import styles from "./Accordion.module.css";

export function Accordion({
  children,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          return next;
        }
        if (!allowMultiple) {
          return new Set([id]);
        }
        next.add(id);
        return next;
      });
    },
    [allowMultiple],
  );

  const value = useMemo(
    () => ({
      allowMultiple,
      isOpen: (id: string) => openIds.has(id),
      toggle,
    }),
    [allowMultiple, openIds, toggle],
  );

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <AccordionContext.Provider value={value}>
      <div className={rootClass}>{children}</div>
    </AccordionContext.Provider>
  );
}
