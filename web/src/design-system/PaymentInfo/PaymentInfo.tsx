import { useId, useState } from "react";
import { CurrencySelect } from "../CurrencySelect";
import { IconChevronDown } from "../Icons";
import { PaymentInfoCopyButton } from "./PaymentInfoCopyButton";
import type { PaymentInfoField, PaymentInfoProps } from "./PaymentInfo.types";
import { usePaymentInfoContext } from "./PaymentInfoContext";
import { PAYMENT_TYPE_ICONS } from "./paymentTypeIcons";
import styles from "./PaymentInfo.module.css";

function PaymentInfoFieldRow({ field }: { field: PaymentInfoField }) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldInner}>
        <p className={styles.fieldLabel}>{field.label}</p>
        <div className={styles.valueRow}>
          <div className={styles.value}>{field.value}</div>
          {field.currency ? (
            <CurrencySelect
              options={field.currency.options}
              value={field.currency.value}
              onChange={field.currency.onChange}
            />
          ) : null}
          {field.copyValue ? (
            <PaymentInfoCopyButton
              text={field.copyValue}
              ariaLabel={`Копіювати ${field.label}`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function PaymentInfo({
  id: idProp,
  paymentType,
  title,
  fields,
  description,
  open: openControlled,
  defaultOpen = false,
  onToggle,
  className,
}: PaymentInfoProps) {
  const autoId = useId();
  const itemId = idProp ?? autoId.replace(/:/g, "");
  const panelId = `${itemId}-panel`;
  const headerId = `${itemId}-header`;

  const group = usePaymentInfoContext();
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

  const PaymentIcon = PAYMENT_TYPE_ICONS[paymentType];
  const itemClass = [styles.item, open && styles.open, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={itemClass}>
      <button
        type="button"
        id={headerId}
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span className={styles.headerMain}>
          <span className={styles.iconTile}>
            <PaymentIcon size={20} glyphOnly aria-hidden />
          </span>
          <span className={styles.title}>{title}</span>
        </span>
        <IconChevronDown className={styles.chevron} size={20} aria-hidden />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={styles.panel}
        hidden={!open}
      >
        {description ? (
          <div className={styles.description}>{description}</div>
        ) : null}
        {fields.map((field) => (
          <PaymentInfoFieldRow key={field.label} field={field} />
        ))}
      </div>
    </div>
  );
}
