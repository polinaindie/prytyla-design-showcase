import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ShowcaseViewportBar } from "./ShowcaseViewportBar";
import styles from "./ShowcasePageLayout.module.css";

/** Foundation token pages — viewport bar не потрібен (на відміну від component preview). */
const VIEWPORT_BAR_HIDDEN_PATHS = new Set([
  "colors",
  "spacing",
  "typography",
  "radius",
  "grid",
]);

type ShowcasePageLayoutProps = {
  title: string;
  description?: string;
  /** Optional row under description (status, updated date, …) */
  meta?: ReactNode;
  children: ReactNode;
  /** Viewport width bar; doc pages often control this via ShowcaseDocPage */
  showViewportBar?: boolean;
};

export function ShowcasePageLayout({
  title,
  description,
  meta,
  children,
  showViewportBar = true,
}: ShowcasePageLayoutProps) {
  const location = useLocation();
  const pathSegment =
    location.pathname.match(/\/showcase\/([^/]+)/)?.[1] ?? "";
  const hideByRoute = VIEWPORT_BAR_HIDDEN_PATHS.has(pathSegment);
  const showBar = showViewportBar && !hideByRoute;

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
        {meta}
      </header>
      {showBar ? <ShowcaseViewportBar /> : null}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
