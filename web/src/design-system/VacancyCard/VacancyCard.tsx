import { IconArrowUpRight32 } from "../Icons";
import type { VacancyCardProps } from "./VacancyCard.types";
import styles from "./VacancyCard.module.css";

export function VacancyCard({
  title,
  description,
  href,
  className,
  ...rest
}: VacancyCardProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <a href={href} className={rootClass} {...rest}>
      <span className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </span>
      <IconArrowUpRight32 className={styles.icon} size={32} aria-hidden />
    </a>
  );
}
