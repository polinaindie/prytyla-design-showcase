import { getLogoAsset } from "./logoAssets";
import type { LogoProps } from "./Logo.types";
import styles from "./Logo.module.css";

const DEFAULT_HEIGHT = 46;

export function Logo({
  language,
  className,
  alt,
  height = DEFAULT_HEIGHT,
  "aria-hidden": ariaHidden,
}: LogoProps) {
  const asset = getLogoAsset(language);
  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const hidden = ariaHidden ?? (alt === "" ? true : undefined);
  const resolvedAlt = alt ?? asset.defaultAlt;

  return (
    <span
      className={rootClass}
      style={{ ["--logo-height" as string]: `${height}px` }}
    >
      <img
        className={styles.image}
        src={asset.src}
        alt={hidden ? "" : resolvedAlt}
        aria-hidden={hidden || undefined}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
