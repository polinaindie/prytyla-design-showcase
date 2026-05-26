import type { AnchorHTMLAttributes } from "react";
import type { Illustration3DVariant } from "../Illustration3D/Illustration3D.types";

/** Figma Link card (40:12193) — Size Desktop | Mobile; hover via CSS. */
export type LinkCardSize = "desktop" | "mobile";

/** Typography override — e.g. desktop layout + mobile title in Menu drawer. */
export type LinkCardTitleSize = "desktop" | "mobile";

export type LinkCardProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  title: string;
  illustration: Illustration3DVariant;
  /** @default true — set false to hide the left 3D illustration. */
  showIllustration?: boolean;
  size?: LinkCardSize;
  /** When set, overrides title font size from `size` (Figma mobile-open cards). */
  titleSize?: LinkCardTitleSize;
  href: string;
};
