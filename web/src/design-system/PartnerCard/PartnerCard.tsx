import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import type { PartnerCardProps } from "./PartnerCard.types";
import styles from "./PartnerCard.module.css";

function FrameSide() {
  return (
    <div className={styles.frameSide} aria-hidden>
      <div className={styles.frameCorner} />
      <div className={styles.frameEdge} />
      <div className={styles.frameCorner} />
    </div>
  );
}

export function PartnerCard(props: PartnerCardProps) {
  const { type = "info", selected = false, logo, logoSrc, logoAlt, className } = props;

  const typeClass = {
    info: styles.typeInfo,
    main: styles.typeMain,
    project: styles.typeProject,
    projects: styles.typeProjects,
  }[type];

  const rootClass = [styles.root, typeClass, selected && styles.selected, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <FrameSide />
      <div className={styles.center}>
        {logo ??
          (logoSrc ? (
            <img
              className={styles.logo}
              src={logoSrc}
              alt={logoAlt ?? ""}
              decoding="async"
              draggable={false}
            />
          ) : null)}
      </div>
      <FrameSide />
    </>
  );

  if ("href" in props && props.href) {
    const { href, type: _type, logoSrc: _logoSrc, logoAlt: _logoAlt, className: _className, ...anchorRest } =
      props;
    return (
      <a href={href} className={rootClass} {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  const { href: _href, type: _type, logoSrc: _logoSrc, logoAlt: _logoAlt, className: _className, ...divRest } =
    props;
  return (
    <div className={rootClass} {...(divRest as HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
}
