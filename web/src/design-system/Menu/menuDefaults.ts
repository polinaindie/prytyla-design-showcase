import type { MenuPanelLink, MenuSocialLink } from "./Menu.types";

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

export const DEFAULT_DRAWER_NAV_LINKS: { label: string; href: string }[] = [
  { label: "Проєкти", href: "/projects" },
  { label: "Звітність", href: "/reports" },
  { label: "Інформація про фонд", href: "/about" },
  { label: "Річні звіти", href: "/reports/annual" },
  { label: "Вакансії", href: "/careers" },
  { label: "Новини", href: "/news" },
  { label: "Партнерства", href: "/partnerships" },
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

export const DEFAULT_EMAIL = {
  value: "info@prytulafoundation.org",
  href: "mailto:info@prytulafoundation.org",
};
