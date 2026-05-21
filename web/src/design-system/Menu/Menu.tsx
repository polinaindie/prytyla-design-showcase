import { Button } from "../Button";
import { LinkCard } from "../LinkCard";
import { IconClose, IconGlobe20, IconMenu, IconMoreHorizontal } from "../Icons";
import { Logo } from "../Logo";
import { MenuFooter } from "./MenuFooter";
import {
  DEFAULT_ABOUT_PANEL_LINKS,
  DEFAULT_DIRECTION_PANEL_LINKS,
  DEFAULT_DRAWER_NAV_LINKS,
  DEFAULT_EMAIL,
  DEFAULT_HOTLINE,
  DEFAULT_SOCIAL_LINKS,
} from "./menuDefaults";
import { NavItem } from "./NavItem";
import type { LogoLanguage } from "../Logo/Logo.types";
import type { MenuNavConfig, MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

const DEFAULT_NAV: MenuNavConfig[] = [
  { label: "Проєкти", href: "/projects" },
  { label: "Звітність", href: "/reports" },
  { type: "dropdown", label: "Про фонд" },
  { label: "Новини", href: "/news" },
  { label: "Партнерства", href: "/partnerships" },
];

function renderNavItem(item: MenuNavConfig, index: number) {
  if (item.type === "dropdown") {
    return (
      <NavItem
        key={`${item.label}-${index}`}
        type="dropdown"
        open={item.open}
        onClick={item.onClick}
      >
        {item.label}
      </NavItem>
    );
  }

  return (
    <NavItem key={`${item.label}-${index}`} href={item.href} active={item.active}>
      {item.label}
    </NavItem>
  );
}

export function Menu({
  size = "desktop",
  logoLanguage = "uk",
  homeHref = "/",
  navItems = DEFAULT_NAV,
  languageLabel = "Eng",
  onLanguageClick,
  onLanguageChange,
  otherDirectionsOpen = false,
  onOtherDirectionsClick,
  donateHref = "/donate",
  onDonateClick,
  donateLabel,
  mobileMenuOpen = false,
  onMobileMenuToggle,
  aboutPanelLinks = DEFAULT_ABOUT_PANEL_LINKS,
  directionPanelLinks = DEFAULT_DIRECTION_PANEL_LINKS,
  drawerNavLinks = DEFAULT_DRAWER_NAV_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  hotlineLabel = DEFAULT_HOTLINE.label,
  hotlineValue = DEFAULT_HOTLINE.value,
  hotlineHref = DEFAULT_HOTLINE.href,
  email = DEFAULT_EMAIL.value,
  emailHref = DEFAULT_EMAIL.href,
  className,
}: MenuProps) {
  const isMobile = size === "mobile";
  const isTablet = size === "tablet";
  const isDesktop = size === "desktop";
  const isCompact = isMobile || isTablet;
  const showNav = isDesktop;
  const showLangInBar = isDesktop || (isTablet && !mobileMenuOpen);
  const showDonateInBar = isDesktop || (isTablet && !mobileMenuOpen);
  const logoHeight = isMobile ? 28 : 32;
  const aboutOpen = navItems.some(
    (item) => item.type === "dropdown" && Boolean(item.open),
  );
  const showAboutPanel = isDesktop && aboutOpen && !otherDirectionsOpen;
  const showDirectionsPanel = isDesktop && otherDirectionsOpen;
  const showDrawer = isCompact && mobileMenuOpen;

  const handleDrawerLanguageSelect = (language: LogoLanguage) => {
    if (language === logoLanguage) return;
    onLanguageChange?.(language);
    onLanguageClick?.();
  };
  const isOpenDesktop = showAboutPanel || showDirectionsPanel;

  const resolvedDonateLabel =
    donateLabel ??
    (isMobile || isTablet ? "Підтримати" : "Допомогти війську");

  const rootClass = [
    styles.root,
    isMobile ? styles.mobile : "",
    isTablet ? styles.tablet : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const shellClass = [
    styles.shell,
    showDrawer ? styles.shellCompactOpen : "",
    isOpenDesktop ? styles.shellOpenDesktop : "",
  ]
    .filter(Boolean)
    .join(" ");

  const barClass = [
    styles.bar,
    showDrawer ? styles.barCompact : "",
    isOpenDesktop || showDrawer ? styles.barEmbedded : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleDonate = () => {
    if (onDonateClick) {
      onDonateClick();
      return;
    }
    if (donateHref) {
      window.location.assign(donateHref);
    }
  };

  const footer = (
    <MenuFooter
      socialLinks={[...socialLinks]}
      hotlineLabel={hotlineLabel}
      hotlineValue={hotlineValue}
      hotlineHref={hotlineHref}
      email={email}
      emailHref={emailHref}
    />
  );

  return (
    <header className={rootClass}>
      <div className={shellClass}>
        <div className={barClass}>
          <div className={styles.row}>
            <a href={homeHref} className={styles.logoLink}>
              <Logo language={logoLanguage} height={logoHeight} />
            </a>

            {showNav ? (
              <nav className={styles.nav} aria-label="Головна навігація">
                {navItems.map(renderNavItem)}
              </nav>
            ) : null}

            <div className={styles.actions}>
              {showLangInBar ? (
                <button
                  type="button"
                  className={styles.lang}
                  onClick={onLanguageClick}
                >
                  <IconGlobe20 size={20} aria-hidden />
                  <span>{languageLabel}</span>
                </button>
              ) : null}

              <div className={styles.ctas}>
                {isCompact ? (
                  <Button
                    variant="secondary"
                    theme="dark"
                    className={styles.menuToggle}
                    showLeftIcon
                    showRightIcon={false}
                    leftIcon={
                      mobileMenuOpen ? (
                        <IconClose size={24} aria-hidden />
                      ) : (
                        <IconMenu size={24} aria-hidden />
                      )
                    }
                    onClick={onMobileMenuToggle}
                    aria-expanded={mobileMenuOpen}
                  >
                    Меню
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      theme="dark"
                      showLeftIcon
                      showRightIcon={false}
                      leftIcon={
                        otherDirectionsOpen ? (
                          <IconClose size={24} aria-hidden />
                        ) : (
                          <IconMoreHorizontal size={24} aria-hidden />
                        )
                      }
                      onClick={onOtherDirectionsClick}
                      aria-expanded={otherDirectionsOpen}
                    >
                      Інші напрями
                    </Button>
                    <Button
                      variant="primary"
                      theme="dark"
                      showLeftIcon={false}
                      showRightIcon={false}
                      onClick={handleDonate}
                    >
                      {resolvedDonateLabel}
                    </Button>
                  </>
                )}
                {showDonateInBar && isCompact ? (
                  <Button
                    variant="primary"
                    theme="dark"
                    showLeftIcon={false}
                    showRightIcon={false}
                    onClick={handleDonate}
                  >
                    {resolvedDonateLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {showAboutPanel ? (
          <>
            <div className={styles.panelDivider} aria-hidden />
            <div
              className={styles.openPanelBody}
              role="region"
              aria-label="Про фонд"
            >
              <div className={styles.aboutPanelLayout}>
                <div className={styles.cardsRow}>
                  {aboutPanelLinks.map((link) => (
                    <LinkCard
                      key={link.href}
                      href={link.href}
                      title={link.title}
                      illustration={link.illustration}
                      size="desktop"
                    />
                  ))}
                </div>
                <div className={styles.panelAside}>{footer}</div>
              </div>
            </div>
          </>
        ) : null}

        {showDirectionsPanel ? (
          <>
            <div className={styles.panelDivider} aria-hidden />
            <div
              className={styles.openPanelBody}
              role="region"
              aria-label="Інші напрями"
            >
              <div className={styles.directionsPanel}>
                {directionPanelLinks.map((link) => (
                  <LinkCard
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    illustration={link.illustration}
                    size="desktop"
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}

        {showDrawer ? (
          <div
            className={styles.drawer}
            role="dialog"
            aria-label="Меню сайту"
          >
            <div className={styles.drawerMain}>
              <div className={styles.compactTopRow}>
                <div
                  className={styles.langSelector}
                  role="group"
                  aria-label="Мова сайту"
                >
                  <IconGlobe20 size={20} aria-hidden />
                  <div className={styles.langOptions}>
                    <button
                      type="button"
                      className={`${styles.langOption} ${logoLanguage === "en" ? styles.langOptionActive : ""}`}
                      onClick={() => handleDrawerLanguageSelect("en")}
                      aria-current={logoLanguage === "en" ? "true" : undefined}
                    >
                      Eng
                    </button>
                    <span className={styles.langSep} aria-hidden>
                      |
                    </span>
                    <button
                      type="button"
                      className={`${styles.langOption} ${logoLanguage === "uk" ? styles.langOptionActive : ""}`}
                      onClick={() => handleDrawerLanguageSelect("uk")}
                      aria-current={logoLanguage === "uk" ? "true" : undefined}
                    >
                      Ukr
                    </button>
                  </div>
                </div>
                <Button
                  variant="primary"
                  theme="dark"
                  className={styles.compactDonate}
                  showLeftIcon={false}
                  showRightIcon={false}
                  onClick={handleDonate}
                >
                  {resolvedDonateLabel}
                </Button>
              </div>

              <nav className={styles.drawerNav} aria-label="Навігація">
                {drawerNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={styles.drawerNavLink}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className={styles.panelDivider} aria-hidden />
            <div className={styles.drawerSection}>
              <p className={styles.drawerSectionTitle}>Інші напрями</p>
              <div className={styles.drawerCards}>
                {directionPanelLinks.map((link) => (
                  <LinkCard
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    illustration={link.illustration}
                    size="desktop"
                    titleSize="mobile"
                    className={styles.drawerLinkCard}
                  />
                ))}
              </div>
            </div>

            <div className={styles.drawerFooter}>
              <MenuFooter
                socialLinks={[...socialLinks]}
                hotlineLabel={hotlineLabel}
                hotlineValue={hotlineValue}
                hotlineHref={hotlineHref}
                email={email}
                emailHref={emailHref}
                socialIconSize={isMobile ? 20 : 24}
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
