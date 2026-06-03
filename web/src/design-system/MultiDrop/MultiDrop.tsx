import { IconChevronDown10 } from "../Icons";
import { Checkbox } from "../Checkbox";
import type { MultiDropProps } from "./MultiDrop.types";
import styles from "./MultiDrop.module.css";

function levelClass(
  level: MultiDropProps["level"],
  expandable: boolean,
): string {
  if (level === 3) return styles.level3Leaf;
  if (level === 2) return expandable ? styles.level2Expandable : styles.level2Leaf;
  return styles.level1;
}

export function MultiDrop({
  label,
  level = 1,
  checkboxState = "empty",
  expandable = false,
  expanded = false,
  onExpandToggle,
  onToggle,
  disabled = false,
  className,
}: MultiDropProps) {
  const wrapperClass = [
    styles.wrapper,
    levelClass(level, expandable),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const checked = checkboxState === "checked";
  const indeterminate = checkboxState === "indeterminate";

  const expandLabel = expanded ? "Згорнути" : "Розгорнути";

  return (
    <div className={wrapperClass}>
      {expandable ? (
        <button
          type="button"
          className={styles.chevronBtn}
          disabled={disabled}
          onClick={onExpandToggle}
          aria-expanded={expanded}
          aria-label={`${expandLabel}: ${label}`}
        >
          <IconChevronDown10
            size={10}
            className={expanded ? styles.chevronOpen : undefined}
            aria-hidden
          />
        </button>
      ) : null}

      <button
        type="button"
        className={styles.rowBtn}
        disabled={disabled}
        onClick={onToggle}
        aria-pressed={checked || indeterminate ? true : undefined}
      >
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          readOnly
          tabIndex={-1}
          aria-hidden
        />
        <span
          className={[styles.label, disabled && styles.labelDisabled]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </span>
      </button>
    </div>
  );
}
