import { Tab } from "./Tab";
import type { TabsProps } from "./Tab.types";
import styles from "./Tabs.module.css";

export function Tabs({
  items,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "Вкладки",
}: TabsProps) {
  const listClass = [styles.list, className].filter(Boolean).join(" ");

  return (
    <div role="tablist" aria-label={ariaLabel} className={listClass}>
      {items.map((item) => (
        <Tab
          key={item.id}
          selected={value === item.id}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Tab>
      ))}
    </div>
  );
}
