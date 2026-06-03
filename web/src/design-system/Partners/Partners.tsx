import { useState } from "react";
import { IconArrowLeft } from "../Icons";
import { PartnerCard } from "../PartnerCard";
import { PartnerLogo } from "../PartnerLogo";
import { getPartnerFeaturedLogoVariant } from "./partnersDemo";
import type { PartnersProps } from "./Partners.types";
import styles from "./Partners.module.css";

const DEFAULT_TITLE = "Наші партнери";

const DEFAULT_INTRO = (
  <>
    <p>
      Долучіться до посилення Сил Оборони України чи гуманітарної допомоги цивільному
      населенню, яке постраждало від російської агресії.
    </p>
    <p>Ми непереможні, коли об’єднані!</p>
  </>
);

export function Partners({
  size = "desktop",
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
  allPartnersHref = "/partners",
  allPartnersLabel = "Усі партнери",
  partners,
  activePartnerId: activePartnerIdControlled,
  defaultActivePartnerId,
  onActivePartnerChange,
  className,
  ...rest
}: PartnersProps) {
  const firstId = partners[0]?.id;
  const [activePartnerIdUncontrolled, setActivePartnerIdUncontrolled] = useState(
    defaultActivePartnerId ?? firstId ?? "",
  );

  const activePartnerId =
    activePartnerIdControlled ?? activePartnerIdUncontrolled;
  const activePartner =
    partners.find((partner) => partner.id === activePartnerId) ?? partners[0];

  const setActivePartnerId = (partnerId: string) => {
    if (activePartnerIdControlled === undefined) {
      setActivePartnerIdUncontrolled(partnerId);
    }
    onActivePartnerChange?.(partnerId);
  };

  if (!activePartner) {
    return null;
  }

  const sizeClass =
    size === "mobile" ? styles.mobile : size === "tablet" ? styles.tablet : styles.desktop;

  const rootClass = [styles.root, sizeClass, className].filter(Boolean).join(" ");
  const innerClass = [styles.inner, sizeClass].filter(Boolean).join(" ");

  const featuredLogoVariant = getPartnerFeaturedLogoVariant(activePartner);

  return (
    <section className={rootClass} data-size={size} {...rest}>
      <div className={innerClass}>
        <header className={styles.sidebar}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.intro}>{intro}</div>
          </div>
          <a href={allPartnersHref} className={styles.allPartnersCta}>
            <span className={styles.allPartnersLabel}>{allPartnersLabel}</span>
            <IconArrowLeft aria-hidden />
          </a>
        </header>

        <div className={styles.main}>
          <article className={styles.featured} aria-live="polite">
            {size !== "mobile" ? (
              <div className={styles.featuredCopy}>
                <h3 className={styles.featuredName}>{activePartner.name}</h3>
                <p className={styles.featuredDescription}>{activePartner.description}</p>
              </div>
            ) : null}
            <PartnerLogo
              variant={featuredLogoVariant}
              className={styles.featuredLogo}
              aria-hidden
            />
            {size === "mobile" ? (
              <div className={styles.featuredCopy}>
                <h3 className={styles.featuredName}>{activePartner.name}</h3>
                <p className={styles.featuredDescription}>{activePartner.description}</p>
              </div>
            ) : null}
          </article>

          <div className={styles.grid} role="list">
            {partners.map((partner) => {
              const isSelected = partner.id === activePartner.id;
              const logoNode = (
                <PartnerLogo variant={partner.logoVariant} aria-hidden />
              );

              const shared = {
                type: "info" as const,
                selected: isSelected,
                className: styles.gridCard,
                logo: logoNode,
                onClick: () => setActivePartnerId(partner.id),
                role: "listitem" as const,
                "aria-pressed": isSelected,
                "aria-label": partner.name,
              };

              return partner.href ? (
                <PartnerCard
                  key={partner.id}
                  {...shared}
                  href={partner.href}
                  onClick={(event) => {
                    event.preventDefault();
                    setActivePartnerId(partner.id);
                  }}
                />
              ) : (
                <PartnerCard key={partner.id} {...shared} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
