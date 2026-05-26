import type { AnchorHTMLAttributes } from "react";

/** Figma News Card 3:7070 — compact card. */
export type NewsCardSize = "desktop" | "tablet";

/** Figma Main News 292:5047 — featured hero card. */
export type NewsCardFeaturedSize = "desktop" | "mobile";

export type NewsCardVariant = "card" | "featured";

type NewsCardBaseProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  href: string;
  imageSrc: string;
  imageAlt?: string;
  /** Figma Meta Row — e.g. 11/08/2025 */
  date: string;
  /** Figma SubTag label — e.g. Проєкт */
  category: string;
  title: string;
  /** Один тег (card). Якщо є `tags`, `tagLabel` ігнорується. */
  tagLabel?: string;
  /** Кілька тегів (featured / Figma Tags Row). */
  tags?: readonly string[];
};

export type NewsCardCardProps = NewsCardBaseProps & {
  variant?: "card";
  size?: NewsCardSize;
};

export type NewsCardFeaturedProps = NewsCardBaseProps & {
  variant: "featured";
  size?: NewsCardFeaturedSize;
};

export type NewsCardProps = NewsCardCardProps | NewsCardFeaturedProps;
