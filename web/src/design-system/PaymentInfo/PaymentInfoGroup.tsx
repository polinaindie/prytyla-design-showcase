import { useCallback, useMemo, useState } from "react";
import type { PaymentInfoGroupProps } from "./PaymentInfo.types";
import { PaymentInfoContext } from "./PaymentInfoContext";
import styles from "./PaymentInfoGroup.module.css";

export function PaymentInfoGroup({
  children,
  allowMultiple = false,
  className,
}: PaymentInfoGroupProps) {
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
    <PaymentInfoContext.Provider value={value}>
      <div className={rootClass}>{children}</div>
    </PaymentInfoContext.Provider>
  );
}
