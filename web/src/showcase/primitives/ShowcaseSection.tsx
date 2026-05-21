import type { ReactNode } from "react";
import styles from "./ShowcaseSection.module.css";

type ShowcaseSectionProps = {
  title: string;
  description?: string;
  /** Anchor id for in-page jump links (e.g. showcase section nav). */
  id?: string;
  children: ReactNode;
};

export function ShowcaseSection({
  title,
  description,
  id,
  children,
}: ShowcaseSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
