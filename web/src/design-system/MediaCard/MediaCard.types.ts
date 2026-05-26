import type { AnchorHTMLAttributes } from "react";

/** Figma Media 292:6431 — Size Desktop | Mobile; hover (fine pointer) or :active (touch). */
export type MediaCardSize = "desktop" | "mobile";

export type MediaCardProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  href: string;
  /** Логотип видання (Figma Thumbnail Image). */
  logoSrc: string;
  logoAlt?: string;
  /** Цитата / заголовок згадки в ЗМІ. */
  title: string;
  size?: MediaCardSize;
};
