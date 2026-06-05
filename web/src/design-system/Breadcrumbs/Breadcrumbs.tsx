import { IconBreadcrumbArrow7 } from "../Icons";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import styles from "./Breadcrumbs.module.css";

export function Breadcrumbs({
  items,
  ariaLabel = "Навігаційний шлях",
  className,
  ...rest
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const navClassName = [styles.root, className].filter(Boolean).join(" ");

  return (
    <nav className={navClassName} aria-label={ariaLabel} {...rest}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = `${index}-${typeof item.label === "string" ? item.label : "item"}`;

          return (
            <li key={key} className={styles.item}>
              {index > 0 ? (
                <IconBreadcrumbArrow7
                  className={styles.separator}
                  aria-hidden
                />
              ) : null}
              {isLast ? (
                <span
                  className={styles.current}
                  aria-current="page"
                  title={
                    typeof item.label === "string" ? item.label : undefined
                  }
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span className={styles.link}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
