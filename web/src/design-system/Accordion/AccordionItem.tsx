import { useId, useState } from "react";
import { IconChevronDown } from "../Icons";
import { useAccordionContext } from "./AccordionContext";
import type { AccordionItemProps } from "./AccordionItem.types";
import styles from "./AccordionItem.module.css";

export function AccordionItem({
  id: idProp,
  question,
  children,
  open: openControlled,
  defaultOpen = false,
  onToggle,
  className,
}: AccordionItemProps) {
  const autoId = useId();
  const itemId = idProp ?? autoId.replace(/:/g, "");
  const panelId = `${itemId}-panel`;
  const headerId = `${itemId}-header`;

  const group = useAccordionContext();
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen);

  const isControlled = openControlled !== undefined;
  const openFromGroup = group?.isOpen(itemId) ?? false;
  const openLocal = isControlled ? openControlled : openUncontrolled;
  const open = group ? openFromGroup : openLocal;

  const handleToggle = () => {
    const next = !open;
    if (group) {
      group.toggle(itemId);
      onToggle?.(next);
      return;
    }
    if (!isControlled) {
      setOpenUncontrolled(next);
    }
    onToggle?.(next);
  };

  const itemClass = [styles.item, open && styles.open, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={itemClass}>
      <button
        type="button"
        id={headerId}
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span className={styles.question}>{question}</span>
        <IconChevronDown className={styles.icon} size={20} aria-hidden />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={styles.panel}
        hidden={!open}
      >
        <div className={styles.panelInner}>{children}</div>
      </div>
    </section>
  );
}
