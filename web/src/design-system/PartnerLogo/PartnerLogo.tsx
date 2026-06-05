import { getPartnerLogoAsset } from "./partnerLogoAssets";
import type { PartnerLogoProps } from "./PartnerLogo.types";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./PartnerLogo.module.css";

export function PartnerLogo({
  variant,
  src,
  alt,
  className,
  ...rest
}: PartnerLogoProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  if (variant) {
    const asset = getPartnerLogoAsset(variant);
    const resolvedAlt = alt ?? asset.defaultAlt;

    return (
      <span className={rootClass} {...rest}>
        <img
          className={styles.media}
          src={publicAssetUrl(asset.src)}
          alt={asset.overlaySrc ? "" : resolvedAlt}
          aria-hidden={asset.overlaySrc ? true : undefined}
          decoding="async"
          draggable={false}
        />
        {asset.overlaySrc ? (
          <img
            className={styles.festOverlay}
            src={publicAssetUrl(asset.overlaySrc)}
            alt={resolvedAlt}
            decoding="async"
            draggable={false}
          />
        ) : null}
      </span>
    );
  }

  if (!src) {
    return null;
  }

  return (
    <span className={rootClass} {...rest}>
      <img
        className={styles.media}
        src={publicAssetUrl(src)}
        alt={alt ?? ""}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
