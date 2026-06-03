import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/** Figma PartnerCard type variants (3:7139). */
export type PartnerCardType = "info" | "main" | "project" | "projects";

type PartnerCardBase = {
  type?: PartnerCardType;
  /** Активний стан у сітці Partners (Figma elevated card). */
  selected?: boolean;
  /** Замість logoSrc — напр. PartnerLogo з композитом. */
  logo?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
};

export type PartnerCardProps = PartnerCardBase &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof PartnerCardBase | "href">)
    | ({ href?: undefined } & HTMLAttributes<HTMLDivElement>)
  );
