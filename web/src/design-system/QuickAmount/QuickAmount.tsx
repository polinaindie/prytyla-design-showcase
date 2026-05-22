import type { QuickAmountProps } from "./QuickAmount.types";
import styles from "./QuickAmount.module.css";

export function QuickAmount({
  amount,
  currency = "UAH",
  className,
  type = "button",
  ...rest
}: QuickAmountProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={rootClass} {...rest}>
      <span className={styles.content}>
        <span className={styles.prefix}>+</span>
        <span className={styles.amount}>{amount}</span>
        <span className={styles.currency}>{currency}</span>
      </span>
    </button>
  );
}
