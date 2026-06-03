import type { LogoLanguage } from "../Logo/Logo.types";
import type {
  MenuDrawerNavLink,
  MenuNavConfig,
  MenuPanelLink,
  MenuSocialLink,
} from "./Menu.types";

export const DEFAULT_NAV: MenuNavConfig[] = [
  { label: "Проєкти", href: "/projects" },
  { label: "Звітність", href: "/reports" },
  { type: "dropdown", label: "Про фонд" },
  { label: "Новини", href: "/news" },
  { label: "Партнерства", href: "/partnerships" },
];

export const DEFAULT_NAV_EN: MenuNavConfig[] = [
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
  { type: "dropdown", label: "About the foundation" },
  { label: "News", href: "/news" },
  { label: "Partnerships", href: "/partnerships" },
];

export const DEFAULT_ABOUT_PANEL_LINKS: MenuPanelLink[] = [
  {
    title: "Інформація про фонд",
    illustration: "aboutFund",
    href: "/about",
  },
  {
    title: "Річні звіти",
    illustration: "annualReports",
    href: "/reports/annual",
  },
  {
    title: "Вакансії",
    illustration: "jobOpenings",
    href: "/careers",
  },
];

export const DEFAULT_ABOUT_PANEL_LINKS_EN: MenuPanelLink[] = [
  {
    title: "About the foundation",
    illustration: "aboutFund",
    href: "/about",
  },
  {
    title: "Annual reports",
    illustration: "annualReports",
    href: "/reports/annual",
  },
  {
    title: "Vacancies",
    illustration: "jobOpenings",
    href: "/careers",
  },
];

export const DEFAULT_DIRECTION_PANEL_LINKS: MenuPanelLink[] = [
  {
    title: "Проєкти Гуманітарного напрямку",
    illustration: "humanitarianProjects",
    href: "/humanitarian",
  },
  {
    title: "Навчання цивільних",
    illustration: "civilianTraining",
    href: "/civilian-training",
  },
  {
    title: "Навчання військових",
    illustration: "militaryTraining",
    href: "/military-training",
  },
];

export const DEFAULT_DIRECTION_PANEL_LINKS_EN: MenuPanelLink[] = [
  {
    title: "Humanitarian direction projects",
    illustration: "humanitarianProjects",
    href: "/humanitarian",
  },
  {
    title: "Civilian training",
    illustration: "civilianTraining",
    href: "/civilian-training",
  },
  {
    title: "Military training",
    illustration: "militaryTraining",
    href: "/military-training",
  },
];

export const DEFAULT_DRAWER_NAV_LINKS: MenuDrawerNavLink[] = [
  { label: "Проєкти", href: "/projects" },
  { label: "Звітність", href: "/reports" },
  { label: "Інформація про фонд", href: "/about" },
  { label: "Річні звіти", href: "/reports/annual" },
  { label: "Вакансії", href: "/careers" },
  { label: "Новини", href: "/news" },
  { label: "Партнерства", href: "/partnerships" },
];

export const DEFAULT_DRAWER_NAV_LINKS_EN: MenuDrawerNavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
  { label: "About the foundation", href: "/about" },
  { label: "Annual reports", href: "/reports/annual" },
  { label: "Vacancies", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Partnerships", href: "/partnerships" },
];

/** Figma 1150:25186 — row-major 2-col grid (Проєкти|Вакансії, …). */
export const TABLET_DRAWER_NAV_LINKS: MenuDrawerNavLink[] = [
  { label: "Проєкти", href: "/projects" },
  { label: "Вакансії", href: "/careers" },
  { label: "Звітність", href: "/reports" },
  { label: "Новини", href: "/news" },
  { label: "Інформація про фонд", href: "/about" },
  { label: "Партнерства", href: "/partnerships" },
  { label: "Річні звіти", href: "/reports/annual" },
];

export const TABLET_DRAWER_NAV_LINKS_EN: MenuDrawerNavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Vacancies", href: "/careers" },
  { label: "Reports", href: "/reports" },
  { label: "News", href: "/news" },
  { label: "About the foundation", href: "/about" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Annual reports", href: "/reports/annual" },
];

export const DEFAULT_SOCIAL_LINKS: MenuSocialLink[] = [
  { network: "facebook", href: "https://www.facebook.com/", label: "Facebook" },
  { network: "instagram", href: "https://www.instagram.com/", label: "Instagram" },
  { network: "telegram", href: "https://t.me/", label: "Telegram" },
  { network: "x", href: "https://x.com/", label: "X" },
  { network: "linkedin", href: "https://www.linkedin.com/", label: "LinkedIn" },
  { network: "youtube", href: "https://www.youtube.com/", label: "YouTube" },
];

export const DEFAULT_HOTLINE = {
  label: "Гаряча лінія:",
  value: "0800 300 114",
  href: "tel:0800300114",
};

export const DEFAULT_HOTLINE_EN = {
  label: "Hotline:",
  value: "0800 300 114",
  href: "tel:0800300114",
};

export const DEFAULT_EMAIL = {
  value: "info@prytulafoundation.org",
  href: "mailto:info@prytulafoundation.org",
};

const MENU_COPY = {
  uk: {
    barLanguageLabel: "Eng",
    menuToggle: "Меню",
    otherDirections: "Інші напрями",
    drawerSectionTitle: "Інші напрями",
    donateCompact: "Підтримати",
    donateWide: "Допомогти війську",
    navAria: "Головна навігація",
    aboutPanelAria: "Про фонд",
    directionsPanelAria: "Інші напрями",
    drawerAria: "Меню сайту",
    langGroupAria: "Мова сайту",
    drawerNavAria: "Навігація",
    langSwitchToEn: "Перемкнути мову на англійську",
    langSwitchToUk: "Перемкнути мову на українську",
  },
  en: {
    barLanguageLabel: "Ukr",
    menuToggle: "Menu",
    otherDirections: "Other directions",
    drawerSectionTitle: "Other directions",
    donateCompact: "Donate",
    donateWide: "Support the military",
    navAria: "Main navigation",
    aboutPanelAria: "About the foundation",
    directionsPanelAria: "Other directions",
    drawerAria: "Site menu",
    langGroupAria: "Site language",
    drawerNavAria: "Navigation",
    langSwitchToEn: "Switch language to English",
    langSwitchToUk: "Switch language to Ukrainian",
  },
} as const;

export function menuCopy(language: LogoLanguage) {
  return MENU_COPY[language];
}

export function getDefaultNav(language: LogoLanguage): MenuNavConfig[] {
  return language === "en" ? DEFAULT_NAV_EN : DEFAULT_NAV;
}

export function getDefaultAboutPanelLinks(
  language: LogoLanguage,
): MenuPanelLink[] {
  return language === "en"
    ? DEFAULT_ABOUT_PANEL_LINKS_EN
    : DEFAULT_ABOUT_PANEL_LINKS;
}

export function getDefaultDirectionPanelLinks(
  language: LogoLanguage,
): MenuPanelLink[] {
  return language === "en"
    ? DEFAULT_DIRECTION_PANEL_LINKS_EN
    : DEFAULT_DIRECTION_PANEL_LINKS;
}

export function getDefaultDrawerNavLinks(
  language: LogoLanguage,
): MenuDrawerNavLink[] {
  return language === "en"
    ? DEFAULT_DRAWER_NAV_LINKS_EN
    : DEFAULT_DRAWER_NAV_LINKS;
}

export function getTabletDrawerNavLinks(
  language: LogoLanguage,
): MenuDrawerNavLink[] {
  return language === "en"
    ? TABLET_DRAWER_NAV_LINKS_EN
    : TABLET_DRAWER_NAV_LINKS;
}

export function getDefaultHotlineLabel(language: LogoLanguage): string {
  return language === "en" ? DEFAULT_HOTLINE_EN.label : DEFAULT_HOTLINE.label;
}

function isDefaultNavStructure(items: readonly MenuNavConfig[]): boolean {
  if (items.length !== DEFAULT_NAV.length) return false;

  return items.every((item, index) => {
    const ukItem = DEFAULT_NAV[index];
    const enItem = DEFAULT_NAV_EN[index];

    if (ukItem.type === "dropdown" || item.type === "dropdown") {
      return ukItem.type === "dropdown" && item.type === "dropdown";
    }

    if (enItem.type === "dropdown") {
      return false;
    }

    return item.href === ukItem.href || item.href === enItem.href;
  });
}

/** Localize default nav labels; preserve open/onClick/active from passed items. */
export function resolveMenuNavItems(
  navItems: readonly MenuNavConfig[],
  language: LogoLanguage,
): MenuNavConfig[] {
  if (!isDefaultNavStructure(navItems)) {
    return [...navItems];
  }

  return getDefaultNav(language).map((localizedItem, index) => {
    const passedItem = navItems[index];

    if (
      passedItem?.type === "dropdown" &&
      localizedItem.type === "dropdown"
    ) {
      return {
        ...localizedItem,
        open: passedItem.open,
        onClick: passedItem.onClick,
      };
    }

    if (
      passedItem &&
      passedItem.type !== "dropdown" &&
      localizedItem.type !== "dropdown"
    ) {
      return {
        ...localizedItem,
        active: passedItem.active,
      };
    }

    return localizedItem;
  });
}

function panelHrefsMatch(
  items: readonly MenuPanelLink[],
  template: readonly MenuPanelLink[],
): boolean {
  if (items.length !== template.length) return false;
  return items.every((item, index) => item.href === template[index].href);
}

export function resolveAboutPanelLinks(
  links: readonly MenuPanelLink[],
  language: LogoLanguage,
): MenuPanelLink[] {
  if (!panelHrefsMatch(links, DEFAULT_ABOUT_PANEL_LINKS)) {
    return [...links];
  }
  return getDefaultAboutPanelLinks(language);
}

export function resolveDirectionPanelLinks(
  links: readonly MenuPanelLink[],
  language: LogoLanguage,
): MenuPanelLink[] {
  if (!panelHrefsMatch(links, DEFAULT_DIRECTION_PANEL_LINKS)) {
    return [...links];
  }
  return getDefaultDirectionPanelLinks(language);
}

function drawerHrefsMatch(
  items: readonly MenuDrawerNavLink[],
  template: readonly MenuDrawerNavLink[],
): boolean {
  if (items.length !== template.length) return false;
  return items.every((item, index) => item.href === template[index].href);
}

export function resolveDrawerNavLinks(
  links: readonly MenuDrawerNavLink[],
  language: LogoLanguage,
): MenuDrawerNavLink[] {
  if (drawerHrefsMatch(links, DEFAULT_DRAWER_NAV_LINKS)) {
    return getDefaultDrawerNavLinks(language);
  }
  if (drawerHrefsMatch(links, TABLET_DRAWER_NAV_LINKS)) {
    return getTabletDrawerNavLinks(language);
  }
  return [...links];
}

export function resolveTabletDrawerNavLinks(
  links: readonly MenuDrawerNavLink[],
  language: LogoLanguage,
): MenuDrawerNavLink[] {
  if (drawerHrefsMatch(links, TABLET_DRAWER_NAV_LINKS)) {
    return getTabletDrawerNavLinks(language);
  }
  if (drawerHrefsMatch(links, DEFAULT_DRAWER_NAV_LINKS)) {
    return getDefaultDrawerNavLinks(language);
  }
  return [...links];
}
