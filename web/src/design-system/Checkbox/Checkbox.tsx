import { useEffect, useRef } from "react";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 7.2L5.8 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({
  className,
  children,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const labelRowClass = [styles.labelRow, disabled && styles.labelRowDisabled]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, checked]);

  const control = (
    <span className={rootClass}>
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.box}>
        <CheckIcon />
        <span className={styles.indeterminateMark} aria-hidden />
      </span>
    </span>
  );

  if (children == null) {
    return control;
  }

  return (
    <label className={labelRowClass}>
      {control}
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}
