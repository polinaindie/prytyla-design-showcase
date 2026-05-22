import { IconPaymentRepeat } from "../Icons";
import type { ChipPaymentTypeProps } from "./ChipPaymentType.types";
import styles from "./ChipPaymentType.module.css";

const DEFAULT_BADGE_TEXT = "Найдієвіше";

export function ChipPaymentType({
  children = "Щомісяця",
  state = "default",
  icon = <IconPaymentRepeat size={20} glyphOnly aria-hidden />,
  recommendBadge = false,
  recommendBadgeText = DEFAULT_BADGE_TEXT,
  wrapperClassName,
  className,
  disabled,
  type = "button",
  ...rest
}: ChipPaymentTypeProps) {
  const selected = state === "selected";
  const rootClass = [
    styles.root,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClass = [styles.wrapper, wrapperClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={wrapperClass}>
      {recommendBadge ? (
        <span className={styles.recommendBadge} aria-hidden>
          {recommendBadgeText}
        </span>
      ) : null}
      <button
        type={type}
        className={rootClass}
        disabled={disabled}
        aria-pressed={selected}
        {...rest}
      >
        <span className={styles.iconWrap}>{icon}</span>
        <span className={styles.label}>{children}</span>
      </button>
    </span>
  );
}
