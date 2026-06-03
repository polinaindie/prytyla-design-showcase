import { useState } from "react";
import { Button } from "../Button";
import { LinkCard } from "../LinkCard";
import linkCardStyles from "../LinkCard/LinkCard.module.css";
import { IconClose, IconGlobe20, IconMenu, IconMoreHorizontal } from "../Icons";
import { Logo } from "../Logo";
import { MenuFooter } from "./MenuFooter";
import {
  DEFAULT_ABOUT_PANEL_LINKS,
  DEFAULT_DIRECTION_PANEL_LINKS,
  DEFAULT_DRAWER_NAV_LINKS,
  DEFAULT_EMAIL,
  DEFAULT_HOTLINE,
  DEFAULT_NAV,
  DEFAULT_SOCIAL_LINKS,
  getDefaultHotlineLabel,
  menuCopy,
  resolveAboutPanelLinks,
  resolveDirectionPanelLinks,
  resolveDrawerNavLinks,
  resolveMenuNavItems,
  resolveTabletDrawerNavLinks,
} from "./menuDefaults";
import { NavItem } from "./NavItem";
import type { LogoLanguage } from "../Logo/Logo.types";
import type { MenuNavConfig, MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

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
  languageLabel,
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
  const isLaptop = size === "laptop";
  const isWideBar = isDesktop || isLaptop;
  const isCompact = isMobile || isTablet;
  const showNav = isWideBar;
  const showLangInBar = isWideBar || isTablet;
  const showDonateInBar = isWideBar || isTablet;
  const logoHeight = isCompact ? 28 : 32;

  const [internalLogoLanguage, setInternalLogoLanguage] =
    useState<LogoLanguage>(logoLanguage);
  const isLanguageControlled = onLanguageChange != null;
  const activeLogoLanguage = isLanguageControlled
    ? logoLanguage
    : internalLogoLanguage;

  const copy = menuCopy(activeLogoLanguage);

  const resolvedNavItems = resolveMenuNavItems(navItems, activeLogoLanguage);
  const resolvedAboutPanelLinks = resolveAboutPanelLinks(
    aboutPanelLinks,
    activeLogoLanguage,
  );
  const resolvedDirectionPanelLinks = resolveDirectionPanelLinks(
    directionPanelLinks,
    activeLogoLanguage,
  );
  const drawerNavLinksResolved = isTablet
    ? resolveTabletDrawerNavLinks(drawerNavLinks, activeLogoLanguage)
    : resolveDrawerNavLinks(drawerNavLinks, activeLogoLanguage);
  const aboutOpen = resolvedNavItems.some(
    (item) => item.type === "dropdown" && Boolean(item.open),
  );
  const showAboutPanel = isWideBar && aboutOpen && !otherDirectionsOpen;
  const showDirectionsPanel = isWideBar && otherDirectionsOpen;
  const showDrawer = isCompact && mobileMenuOpen;

  const setActiveLanguage = (language: LogoLanguage) => {
    if (language === activeLogoLanguage) return;
    if (isLanguageControlled) {
      onLanguageChange(language);
    } else {
      setInternalLogoLanguage(language);
    }
    onLanguageClick?.();
  };

  const handleBarLanguageClick = () => {
    setActiveLanguage(activeLogoLanguage === "uk" ? "en" : "uk");
  };

  const handleDrawerLanguageSelect = (language: LogoLanguage) => {
    setActiveLanguage(language);
  };

  const barLanguageLabel = languageLabel ?? copy.barLanguageLabel;
  const isOpenDesktop = showAboutPanel || showDirectionsPanel;

  const resolvedDonateLabel =
    donateLabel ??
    (isMobile || isTablet ? copy.donateCompact : copy.donateWide);

  const resolvedHotlineLabel =
    hotlineLabel === DEFAULT_HOTLINE.label
      ? getDefaultHotlineLabel(activeLogoLanguage)
      : hotlineLabel;

  const rootClass = [
    styles.root,
    isMobile ? styles.mobile : "",
    isTablet ? styles.tablet : "",
    isLaptop ? styles.laptop : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const shellClass = [
    styles.shell,
    showDrawer ? styles.shellCompactOpen : "",
    showDrawer && isTablet ? styles.shellCompactOpenTablet : "",
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
      hotlineLabel={resolvedHotlineLabel}
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
              <Logo language={activeLogoLanguage} height={logoHeight} />
            </a>

            {showNav ? (
              <nav className={styles.nav} aria-label={copy.navAria}>
                {resolvedNavItems.map(renderNavItem)}
              </nav>
            ) : null}

            <div className={styles.actions}>
              {showLangInBar ? (
                <button
                  type="button"
                  className={styles.lang}
                  onClick={handleBarLanguageClick}
                  aria-label={
                    activeLogoLanguage === "uk"
                      ? copy.langSwitchToEn
                      : copy.langSwitchToUk
                  }
                >
                  <IconGlobe20 size={20} aria-hidden />
                  <span>{barLanguageLabel}</span>
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
                    {copy.menuToggle}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      theme="dark"
                      showLeftIcon
                      showRightIcon={false}
                      className={styles.otherDirectionsButton}
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
                      {copy.otherDirections}
                    </Button>
                    <Button
                      variant="primary"
                      theme="dark"
                      showLeftIcon={false}
                      showRightIcon={false}
                      className={styles.donateWideButton}
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
                    className={styles.barDonate}
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
              aria-label={copy.aboutPanelAria}
            >
              <div className={styles.aboutPanelLayout}>
                <div className={styles.cardsRow}>
                  {resolvedAboutPanelLinks.map((link) => (
                    <LinkCard
                      key={link.href}
                      href={link.href}
                      title={link.title}
                      illustration={link.illustration}
                      size="desktop"
                      titleSize={isLaptop ? "mobile" : undefined}
                      className={isLaptop ? linkCardStyles.menuPanelCompact : undefined}
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
              aria-label={copy.directionsPanelAria}
            >
              <div className={styles.directionsPanel}>
                {resolvedDirectionPanelLinks.map((link) => (
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
            aria-label={copy.drawerAria}
          >
            <div className={styles.drawerMain}>
              {isMobile ? (
                <div className={styles.compactTopRow}>
                  <div
                    className={styles.langSelector}
                    role="group"
                    aria-label={copy.langGroupAria}
                  >
                    <IconGlobe20 size={20} aria-hidden />
                    <div className={styles.langOptions}>
                      <button
                        type="button"
                        className={`${styles.langOption} ${activeLogoLanguage === "en" ? styles.langOptionActive : ""}`}
                        onClick={() => handleDrawerLanguageSelect("en")}
                        aria-current={activeLogoLanguage === "en" ? "true" : undefined}
                      >
                        Eng
                      </button>
                      <span className={styles.langSep} aria-hidden>
                        |
                      </span>
                      <button
                        type="button"
                        className={`${styles.langOption} ${activeLogoLanguage === "uk" ? styles.langOptionActive : ""}`}
                        onClick={() => handleDrawerLanguageSelect("uk")}
                        aria-current={activeLogoLanguage === "uk" ? "true" : undefined}
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
              ) : null}

              <nav
                className={
                  isTablet ? styles.drawerNavTablet : styles.drawerNav
                }
                aria-label={copy.drawerNavAria}
              >
                {drawerNavLinksResolved.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={
                      isTablet ? styles.drawerNavLinkTablet : styles.drawerNavLink
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className={styles.panelDivider} aria-hidden />
            <div className={styles.drawerSection}>
              <p className={styles.drawerSectionTitle}>{copy.drawerSectionTitle}</p>
              <div className={styles.drawerCards}>
                {resolvedDirectionPanelLinks.map((link) => (
                  <LinkCard
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    illustration={link.illustration}
                    size="desktop"
                    titleSize={isMobile ? "mobile" : "desktop"}
                    className={styles.drawerLinkCard}
                  />
                ))}
              </div>
            </div>

            <div
              className={
                isTablet ? styles.drawerFooterTablet : styles.drawerFooter
              }
            >
              <MenuFooter
                socialLinks={[...socialLinks]}
                hotlineLabel={resolvedHotlineLabel}
                hotlineValue={hotlineValue}
                hotlineHref={hotlineHref}
                email={email}
                emailHref={emailHref}
                socialIconSize={isMobile ? 20 : 24}
                layout={isTablet ? "tablet" : "stacked"}
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
