import type { HTMLAttributes, ReactNode } from "react";
import type { PartnerLogoVariant } from "../PartnerLogo";

export type PartnersSize = "desktop" | "tablet" | "mobile";

export type PartnerItem = {
  id: string;
  name: string;
  description: string;
  logoVariant: PartnerLogoVariant;
  /** Логотип у світлому банері (за замовч. logoVariant). */
  featuredLogoVariant?: PartnerLogoVariant;
  href?: string;
};

export type PartnersProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  size?: PartnersSize;
  title?: string;
  intro?: ReactNode;
  allPartnersHref?: string;
  allPartnersLabel?: string;
  partners: PartnerItem[];
  /** Controlled active partner id. */
  activePartnerId?: string;
  defaultActivePartnerId?: string;
  onActivePartnerChange?: (partnerId: string) => void;
};
