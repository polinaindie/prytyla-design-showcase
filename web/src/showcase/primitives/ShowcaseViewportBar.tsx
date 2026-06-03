import {
  SHOWCASE_VIEWPORTS,
  useShowcaseViewport,
  type ShowcaseViewportId,
} from "../ShowcaseViewportContext";
import styles from "./ShowcaseViewportBar.module.css";

type ShowcaseViewportBarProps = {
  className?: string;
};

export function ShowcaseViewportBar({ className }: ShowcaseViewportBarProps = {}) {
  const { viewportId, viewportWidth, typographyMode, setViewportId } =
    useShowcaseViewport();

  const modeLabel =
    typographyMode === "mobile"
      ? "Mobile"
      : typographyMode === "tablet"
        ? "Tablet"
        : "Desktop";

  const barClass = [styles.bar, className].filter(Boolean).join(" ");

  return (
    <div className={barClass} role="group" aria-label="Ширина preview">
      <span className={styles.label}>Ширина</span>
      <div className={styles.group}>
        {SHOWCASE_VIEWPORTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.button} ${viewportId === item.id ? styles.buttonActive : ""}`}
            aria-pressed={viewportId === item.id}
            onClick={() => setViewportId(item.id as ShowcaseViewportId)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className={styles.hint}>
        {viewportWidth}px · {modeLabel}
      </p>
    </div>
  );
}
