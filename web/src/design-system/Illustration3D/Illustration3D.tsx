import { getIllustration3DAsset } from "./illustration3DAssets";
import type { Illustration3DProps } from "./Illustration3D.types";
import styles from "./Illustration3D.module.css";

const IMAGE_LAYOUT_CLASS: Partial<
  Record<Illustration3DProps["variant"], string>
> = {
  jobOpenings: styles.imageCover,
  humanitarianProjects: styles.imageBottom,
  annualReports: styles.imageBottom,
  civilianTraining: styles.imageBottom,
  aboutFund: styles.imageBottom,
  militaryTraining: styles.imageBottom,
};

export function Illustration3D({
  variant,
  className,
  alt,
  "aria-hidden": ariaHidden,
}: Illustration3DProps) {
  const asset = getIllustration3DAsset(variant);
  const sizeClass =
    asset.size === "large" ? styles.sizeLarge : styles.sizeSmall;
  const layoutClass = IMAGE_LAYOUT_CLASS[variant] ?? "";
  const rootClass = [styles.root, sizeClass, className].filter(Boolean).join(" ");
  const imageClass = [styles.image, layoutClass].filter(Boolean).join(" ");

  const resolvedAlt = alt ?? asset.figmaLabel;
  const hidden = ariaHidden ?? (alt === "" ? true : undefined);

  return (
    <span className={rootClass}>
      <img
        className={imageClass}
        src={asset.src}
        alt={hidden ? "" : resolvedAlt}
        aria-hidden={hidden || undefined}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
