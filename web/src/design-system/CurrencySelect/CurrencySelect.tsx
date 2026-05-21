import { useEffect, useId, useRef, useState } from "react";
import { IconChevronDown10 } from "../Icons";
import { CurrencyOption } from "./CurrencyOption";
import type { CurrencySelectProps } from "./CurrencySelect.types";
import styles from "./CurrencySelect.module.css";

export function CurrencySelect({
  options,
  value,
  onChange,
  disabled = false,
  className,
  open: openControlled,
  onOpenChange,
  defaultOpen = false,
}: CurrencySelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen);

  const isControlled = openControlled !== undefined;
  const open = isControlled ? openControlled : openUncontrolled;

  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenUncontrolled(next);
    onOpenChange?.(next);
  };

  const selected =
    options.find((o) => o.code === value) ?? options[0];

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
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        onClick={toggleOpen}
      >
        <span className={styles.code}>{selected?.code ?? value}</span>
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
          aria-label="Валюта"
        >
          {options.map((option) => (
            <li key={option.code} role="presentation">
              <CurrencyOption
                code={option.code}
                role="option"
                aria-selected={value === option.code}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
