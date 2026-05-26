import { Button } from "../Button";
import {
  IconBrandVprytyl,
  IconSocialFacebook,
  IconSocialInstagram,
  IconSocialLinkedIn,
  IconSocialTelegram,
  IconSocialX,
  IconSocialYouTube,
} from "../Icons";
import type {
  FooterProps,
  FooterSocialLink,
  FooterSocialNetwork,
} from "./Footer.types";
import styles from "./Footer.module.css";

const DEFAULT_NAV_COL1 = [
  { label: "Проєкти", href: "/projects" },
  { label: "Звітність", href: "/reporting" },
  { label: "Про фонд", href: "/about" },
] as const;

const DEFAULT_NAV_COL2 = [
  { label: "Новини", href: "/news" },
  { label: "Партнерства", href: "/partnership" },
  { label: "Часті питання", href: "/faq" },
] as const;

function SocialIcon({
  network,
  size = 24,
}: {
  network: FooterSocialNetwork;
  size?: number;
}) {
  const className = styles.socialIcon;
  switch (network) {
    case "facebook":
      return <IconSocialFacebook className={className} size={size} aria-hidden />;
    case "instagram":
      return <IconSocialInstagram className={className} size={size} aria-hidden />;
    case "telegram":
      return <IconSocialTelegram className={className} size={size} aria-hidden />;
    case "x":
      return <IconSocialX className={className} size={size} aria-hidden />;
    case "linkedin":
      return <IconSocialLinkedIn className={className} size={size} aria-hidden />;
    case "youtube":
      return <IconSocialYouTube className={className} size={size} aria-hidden />;
    default:
      return null;
  }
}

function renderSocialLinks(links: FooterSocialLink[], iconSize: number) {
  return links.map((link) => (
    <a
      key={link.network}
      href={link.href}
      className={styles.socialLink}
      aria-label={link.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SocialIcon network={link.network} size={iconSize} />
    </a>
  ));
}

export function Footer({
  size = "desktop",
  donateHref,
  ctaTitle = "Підсилюй Сили Оборони",
  ctaDescription = "Твій донат сьогодні - це знищений ворог завтра.\nДолучайся до забезпечення військових необхідною технікою прямо зараз.",
  donateLabel = "Допомогти війську",
  navColumn1 = [...DEFAULT_NAV_COL1],
  navColumn2 = [...DEFAULT_NAV_COL2],
  socialLinks,
  hotlineLabel = "Гаряча лінія:",
  hotlineValue = "0800 300 114",
  hotlineHref = "tel:0800300114",
  email = "info@prytulafoundation.org",
  emailHref = "mailto:info@prytulafoundation.org",
  copyright = "© 2025 Благодійний фонд Сергія Притули. Всі права захищені.",
  poweredBySrc = "/showcase/footer-powered-by.svg",
  poweredByAlt = "Powered by OPENTECH та SoftServe",
  className,
  ...rest
}: FooterProps) {
  const rootClass = [
    styles.root,
    size === "mobile"
      ? styles.mobile
      : size === "tablet"
        ? styles.tablet
        : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const descriptionLines = ctaDescription.split("\n");

  return (
    <footer className={rootClass} data-size={size} {...rest}>
      <div className={styles.inner}>
        <section className={styles.ctaSection} aria-labelledby="footer-cta-title">
          <h2 id="footer-cta-title" className={styles.ctaTitle}>
            {ctaTitle}
          </h2>
          <div className={styles.ctaRow}>
            <p className={styles.ctaText}>
              {descriptionLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
            <a href={donateHref} className={styles.ctaButton}>
              {donateLabel}
            </a>
          </div>
        </section>

        <section className={styles.bodySection} aria-label="Підвал сайту">
          <div className={styles.darkCard}>
            <div className={styles.topRow}>
              <a href="/" className={styles.logoLink} aria-label="Благодійний фонд Сергія Притули">
                <IconBrandVprytyl
                  className={styles.logo}
                  width={223}
                  height={32}
                  aria-hidden
                />
              </a>
              <div className={styles.socialRow}>
                {renderSocialLinks(socialLinks, 24)}
              </div>
            </div>

            <div className={styles.divider} aria-hidden />

            <div className={styles.midRow}>
              <nav className={styles.nav} aria-label="Навігація в підвалі">
                <ul className={styles.navCol}>
                  {navColumn1.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={styles.navLink}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className={styles.navCol}>
                  {navColumn2.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={styles.navLink}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={styles.contacts}>
                <Button
                  variant="contact"
                  theme="light"
                  contactType="phone"
                  contactLabel={hotlineLabel}
                  href={hotlineHref}
                  className={styles.contactChip}
                >
                  {hotlineValue}
                </Button>
                <Button
                  variant="contact"
                  theme="light"
                  contactType="email"
                  href={emailHref}
                  className={styles.contactChip}
                >
                  {email}
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <p className={styles.copyright}>{copyright}</p>
            <img
              className={styles.poweredBy}
              src={poweredBySrc}
              alt={poweredByAlt}
              decoding="async"
              draggable={false}
            />
          </div>
        </section>
      </div>
    </footer>
  );
}
