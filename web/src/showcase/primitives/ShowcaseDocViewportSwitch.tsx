import {
  SHOWCASE_VIEWPORTS,
  type ShowcaseViewportId,
} from "../ShowcaseViewportContext";
import styles from "./ShowcaseDocSizeSwitch.module.css";

type ShowcaseDocViewportSwitchProps = {
  value: ShowcaseViewportId;
  onChange: (value: ShowcaseViewportId) => void;
  "aria-label"?: string;
};

/** Live preview frame widths — named breakpoints (1920 … 375). */
export function ShowcaseDocViewportSwitch({
  value,
  onChange,
  "aria-label": ariaLabel = "Preview width",
}: ShowcaseDocViewportSwitchProps) {
  return (
    <div className={styles.root} role="group" aria-label={ariaLabel}>
      {SHOWCASE_VIEWPORTS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.button} ${value === item.id ? styles.buttonActive : ""}`}
          aria-pressed={value === item.id}
          title={`${item.name} · ${item.width}px`}
          onClick={() => onChange(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
