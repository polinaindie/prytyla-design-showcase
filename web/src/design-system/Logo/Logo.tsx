import { getLogoAsset } from "./logoAssets";
import type { LogoProps } from "./Logo.types";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./Logo.module.css";

const DEFAULT_HEIGHT = 46;

export function Logo({
  language,
  variant = "default",
  className,
  alt,
  height = DEFAULT_HEIGHT,
  "aria-hidden": ariaHidden,
}: LogoProps) {
  const asset = getLogoAsset(language);
  const rootClass = [
    styles.root,
    variant === "inverse" && styles.inverse,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const hidden = ariaHidden ?? (alt === "" ? true : undefined);
  const resolvedAlt = alt ?? asset.defaultAlt;

  return (
    <span
      className={rootClass}
      style={{ ["--logo-height" as string]: `${height}px` }}
    >
      <img
        className={styles.image}
        src={publicAssetUrl(asset.src)}
        alt={hidden ? "" : resolvedAlt}
        aria-hidden={hidden || undefined}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
