import type { Illustration3DVariant } from "../Illustration3D/Illustration3D.types";
import type { LogoLanguage } from "../Logo/Logo.types";

/**
 * Figma Menu frame 3:7160 (section Menu, canvas Design system 3:6954).
 * Variants: Default / About Open / Other directions Open (desktop);
 * Default / Menu Open (tablet 127:9886, 1150:24953; mobile 125:7776, 1149:24142).
 */
export type MenuSize = "desktop" | "tablet" | "mobile";

export type MenuNavLink = {
  type?: "link";
  label: string;
  href: string;
  active?: boolean;
};

export type MenuNavDropdown = {
  type: "dropdown";
  label: string;
  open?: boolean;
  onClick?: () => void;
};

export type MenuNavConfig = MenuNavLink | MenuNavDropdown;

export type MenuPanelLink = {
  title: string;
  href: string;
  illustration: Illustration3DVariant;
};

export type MenuSocialNetwork =
  | "facebook"
  | "instagram"
  | "telegram"
  | "x"
  | "linkedin"
  | "youtube";

export type MenuSocialLink = {
  network: MenuSocialNetwork;
  href: string;
  label: string;
};

export type MenuDrawerNavLink = {
  label: string;
  href: string;
};

export type MenuProps = {
  size?: MenuSize;
  logoLanguage?: LogoLanguage;
  homeHref?: string;
  navItems?: readonly MenuNavConfig[];
  languageLabel?: string;
  onLanguageClick?: () => void;
  /** Drawer lang switcher (Figma 1149:24151) — called with the newly selected language. */
  onLanguageChange?: (language: LogoLanguage) => void;
  /** Desktop/tablet — toggles «Інші напрями» panel (Figma 3:7270). */
  otherDirectionsOpen?: boolean;
  onOtherDirectionsClick?: () => void;
  donateHref?: string;
  onDonateClick?: () => void;
  donateLabel?: string;
  /** Mobile/tablet — full drawer (Figma 1149:24142 / 1150:24953). */
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  aboutPanelLinks?: readonly MenuPanelLink[];
  directionPanelLinks?: readonly MenuPanelLink[];
  drawerNavLinks?: readonly MenuDrawerNavLink[];
  socialLinks?: readonly MenuSocialLink[];
  hotlineLabel?: string;
  hotlineValue?: string;
  hotlineHref?: string;
  email?: string;
  emailHref?: string;
  className?: string;
};
