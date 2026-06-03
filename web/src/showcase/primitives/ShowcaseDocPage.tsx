import type { ReactNode } from "react";
import { ShowcasePageLayout } from "./ShowcasePageLayout";
import type { ShowcaseDocStatus } from "./showcaseDoc";
import styles from "./ShowcaseDocPage.module.css";

const STATUS_LABEL: Record<ShowcaseDocStatus, string> = {
  stable: "Stable",
  beta: "Beta",
  deprecated: "Deprecated",
};

type ShowcaseDocPageProps = {
  title: string;
  description: string;
  children: ReactNode;
  status?: ShowcaseDocStatus;
  updatedAt?: string;
  /** Doc / component version in page header metadata */
  version?: string;
  /** Shown in page footer — Figma component or file link */
  figmaUrl?: string;
  feedbackHref?: string;
  feedbackLabel?: string;
  showViewportBar?: boolean;
};

export function ShowcaseDocPage({
  title,
  description,
  children,
  status = "stable",
  updatedAt,
  version,
  figmaUrl,
  feedbackHref,
  feedbackLabel = "Feedback / discussion",
  showViewportBar = true,
}: ShowcaseDocPageProps) {
  const statusClass =
    status === "beta"
      ? styles.statusBeta
      : status === "deprecated"
        ? styles.statusDeprecated
        : styles.statusStable;

  const meta = (
    <ul className={styles.meta} aria-label="Page metadata">
      <li className={styles.metaItem}>
        <span className={`${styles.status} ${statusClass}`}>{STATUS_LABEL[status]}</span>
      </li>
      {updatedAt ? (
        <li className={styles.metaItem}>
          <span>Updated</span>
          <time dateTime={updatedAt}>{updatedAt}</time>
        </li>
      ) : null}
      {version ? (
        <li className={styles.metaItem}>
          <span>Version</span>
          <span>{version}</span>
        </li>
      ) : null}
    </ul>
  );

  return (
    <ShowcasePageLayout
      title={title}
      description={description}
      meta={meta}
      showViewportBar={showViewportBar}
    >
      {children}
      <footer className={styles.footer}>
        <ul className={styles.footerLinks}>
          {figmaUrl ? (
            <li>
              <a
                className={styles.footerLink}
                href={figmaUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Open in Figma
              </a>
            </li>
          ) : null}
          {feedbackHref ? (
            <li>
              <a
                className={styles.footerLink}
                href={feedbackHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                {feedbackLabel}
              </a>
            </li>
          ) : null}
        </ul>
        <p className={styles.footerNote}>
          Prytula design system showcase — структура сторінки узгоджена з Component Docs у Figma.
        </p>
      </footer>
    </ShowcasePageLayout>
  );
}
