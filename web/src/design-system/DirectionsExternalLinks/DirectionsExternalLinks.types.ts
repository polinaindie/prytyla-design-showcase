import type { AnchorHTMLAttributes } from "react";

/** Figma DirectionsExternalLinks (3:7303) — Size Desktop | Mobile; hover via CSS. */
export type DirectionsExternalLinksSize = "desktop" | "mobile";

export type DirectionsExternalLinksProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  /** Номер у списку, напр. «01» */
  index: string;
  title: string;
  href: string;
  size?: DirectionsExternalLinksSize;
};
