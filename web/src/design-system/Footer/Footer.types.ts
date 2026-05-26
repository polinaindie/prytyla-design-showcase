import type { HTMLAttributes } from "react";

export type FooterSize = "desktop" | "tablet" | "mobile";

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterSocialNetwork =
  | "facebook"
  | "instagram"
  | "telegram"
  | "x"
  | "linkedin"
  | "youtube";

export type FooterSocialLink = {
  network: FooterSocialNetwork;
  href: string;
  /** aria-label */
  label: string;
};

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  size?: FooterSize;
  /** CTA «Допомогти війську» — сторінка / зовнішній донат. */
  donateHref: string;
  ctaTitle?: string;
  ctaDescription?: string;
  donateLabel?: string;
  navColumn1?: FooterNavLink[];
  navColumn2?: FooterNavLink[];
  socialLinks: FooterSocialLink[];
  hotlineLabel?: string;
  hotlineValue?: string;
  hotlineHref?: string;
  email?: string;
  emailHref?: string;
  copyright?: string;
  /** Powered by (OpenTech + SoftServe), default showcase asset. */
  poweredBySrc?: string;
  poweredByAlt?: string;
};
