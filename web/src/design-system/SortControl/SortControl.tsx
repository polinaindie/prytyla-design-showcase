import { useEffect, useId, useRef, useState } from "react";
import { DropdownItem } from "../DropdownItem";
import { IconChevronDown10 } from "../Icons";
import type { SortControlProps } from "./SortControl.types";
import styles from "./SortControl.module.css";

function formatDisplayLabel(label: string, count?: number): string {
  if (count == null) return label;
  return `${label} (${count})`;
}

export function SortControl({
  options,
  value,
  onChange,
  label = "Сортування",
  count,
  disabled = false,
  className,
  open: openControlled,
  onOpenChange,
  defaultOpen = false,
}: SortControlProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen);

  const isControlled = openControlled !== undefined;
  const open = isControlled ? openControlled : openUncontrolled;

  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenUncontrolled(next);
    onOpenChange?.(next);
  };

  const selected = options.find((o) => o.id === value) ?? options[0];
  const displayValue = selected
    ? formatDisplayLabel(selected.label, count)
    : "";

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const toggleOpen = () => {
    if (disabled) return;
    setOpen(!open);
  };

  return (
    <div className={rootClass} ref={rootRef}>
      <span className={styles.label}>{label}</span>
      <div className={styles.control}>
        <button
          type="button"
          className={styles.trigger}
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          onClick={toggleOpen}
        >
          <span className={styles.value}>{displayValue}</span>
          <IconChevronDown10
            size={10}
            className={[styles.chevron, open ? styles.chevronOpen : ""]
              .filter(Boolean)
              .join(" ")}
            aria-hidden
          />
        </button>
        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            className={styles.menu}
            aria-label={label}
          >
            {options.map((option) => (
              <li key={option.id} role="presentation">
                <DropdownItem
                  role="option"
                  aria-selected={value === option.id}
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </DropdownItem>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
