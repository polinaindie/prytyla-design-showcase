import type { CurrencyOptionProps } from "./CurrencyOption.types";
import styles from "./CurrencyOption.module.css";

export function CurrencyOption({
  code,
  className,
  disabled,
  ...rest
}: CurrencyOptionProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <button type="button" className={rootClass} disabled={disabled} {...rest}>
      {code}
    </button>
  );
}
