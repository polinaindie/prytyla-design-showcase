import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import type { MemorandumPartnerCardProps } from "./MemorandumPartnerCard.types";
import styles from "./MemorandumPartnerCard.module.css";

export function MemorandumPartnerCard(props: MemorandumPartnerCardProps) {
  const { logoSrc, logoAlt, className } = props;
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const content = (
    <img
      className={styles.logo}
      src={publicAssetUrl(logoSrc)}
      alt={logoAlt}
      decoding="async"
      draggable={false}
    />
  );

  if ("href" in props && props.href) {
    const {
      href,
      logoSrc: _logoSrc,
      logoAlt: _logoAlt,
      className: _className,
      ...anchorRest
    } = props;
    return (
      <a
        href={href}
        className={rootClass}
        {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const {
    href: _href,
    logoSrc: _logoSrc,
    logoAlt: _logoAlt,
    className: _className,
    ...divRest
  } = props;
  return (
    <div className={rootClass} {...(divRest as HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
}
