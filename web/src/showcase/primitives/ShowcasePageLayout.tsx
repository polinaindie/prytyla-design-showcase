import type { ReactNode } from "react";
import styles from "./ShowcasePageLayout.module.css";

type ShowcasePageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ShowcasePageLayout({
  title,
  description,
  children,
}: ShowcasePageLayoutProps) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
