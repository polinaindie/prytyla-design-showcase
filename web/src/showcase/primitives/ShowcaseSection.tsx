import type { ReactNode } from "react";
import styles from "./ShowcaseSection.module.css";

type ShowcaseSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
