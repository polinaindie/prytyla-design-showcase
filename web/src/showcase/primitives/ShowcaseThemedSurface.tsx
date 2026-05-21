import type { ReactNode } from "react";
import { useShowcaseThemeOptional } from "./ShowcaseThemeContext";
import styles from "./ShowcaseThemedSurface.module.css";

type ShowcaseThemedSurfaceProps = {
  children: ReactNode;
  /**
   * split — світлий + темний превью поруч (замість дубльованих секцій)
   * single — один блок за темою з ShowcaseToolbar (потребує ShowcaseThemeProvider)
   */
  mode?: "split" | "single";
  lightLabel?: string;
  darkLabel?: string;
};

export function ShowcaseThemedSurface({
  children,
  mode = "split",
  lightLabel = "Світлий фон",
  darkLabel = "Темний фон",
}: ShowcaseThemedSurfaceProps) {
  const themeCtx = useShowcaseThemeOptional();

  if (mode === "single") {
    const theme = themeCtx?.theme ?? "light";
    const isDark = theme === "dark";
    return (
      <div className={styles.wrap}>
        <p className={styles.caption}>{isDark ? darkLabel : lightLabel}</p>
        <div
          className={`${styles.preview} ${styles.single} ${isDark ? styles.dark : styles.light}`}
          data-showcase-surface={theme}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.split}>
        <div className={styles.panel}>
          <p className={styles.caption}>{lightLabel}</p>
          <div className={`${styles.preview} ${styles.light}`} data-showcase-surface="light">
            {children}
          </div>
        </div>
        <div className={styles.panel}>
          <p className={styles.caption}>{darkLabel}</p>
          <div className={`${styles.preview} ${styles.dark}`} data-showcase-surface="dark">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
