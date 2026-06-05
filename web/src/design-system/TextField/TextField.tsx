import { useId } from "react";
import { IconError } from "../Icons";
import type { TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";

export function TextField({
  label,
  hideLabel = false,
  helperText = "Supporting text",
  hideHelperText = false,
  error = false,
  leadingIcon,
  trailingIcon,
  onTrailingIconClick,
  trailingIconLabel = "Очистити",
  disabled = false,
  className,
  placeholder = "Placeholder",
  id: idProp,
  "aria-describedby": ariaDescribedBy,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const helperId = `${inputId}-helper`;

  const rootClass = [
    styles.root,
    error && styles.error,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasTrailing = Boolean(trailingIcon || error);

  const innerClass = [
    styles.inner,
    !leadingIcon && styles.innerPadStart,
    !hasTrailing && styles.innerPadEnd,
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy =
    [ariaDescribedBy, !hideHelperText && helperText ? helperId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const trailingNode = error ? (
    <span className={styles.iconSlot} aria-hidden>
      <IconError size={24} />
    </span>
  ) : trailingIcon ? (
    onTrailingIconClick ? (
      <button
        type="button"
        className={`${styles.iconSlot} ${styles.iconSlotButton}`}
        onClick={onTrailingIconClick}
        disabled={disabled}
        aria-label={trailingIconLabel}
      >
        {trailingIcon}
      </button>
    ) : (
      <span className={styles.iconSlot} aria-hidden>
        {trailingIcon}
      </span>
    )
  ) : null;

  return (
    <div className={rootClass}>
      {!hideLabel && label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={styles.control}>
        <div className={innerClass}>
          {leadingIcon ? <span className={styles.iconSlot}>{leadingIcon}</span> : null}

          <input
            {...inputProps}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={error || undefined}
            aria-describedby={describedBy}
          />

          {trailingNode}
        </div>
      </div>

      {!hideHelperText && helperText ? (
        <p id={helperId} className={styles.helper} role={error ? "alert" : undefined}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
