import type { PartnerLogoVariant } from "./PartnerLogo.types";

export type PartnerLogoAsset = {
  defaultAlt: string;
  /** Single image, or base layer for composite variants */
  src: string;
  /** Optional overlay (Figma Fest white). */
  overlaySrc?: string;
};

export const PARTNER_LOGO_ASSETS: Record<PartnerLogoVariant, PartnerLogoAsset> = {
  "fest-white": {
    src: "/brand/partner-logos/fest-base.png",
    overlaySrc: "/brand/partner-logos/fest-white-text.png",
    defaultAlt: "!FEST — холдинг емоцій",
  },
  "fest-black": {
    src: "/brand/partner-logos/fest-base.png",
    defaultAlt: "!FEST — холдинг емоцій",
  },
  "easypay-black": {
    src: "/brand/partner-logos/easypay-black.png",
    defaultAlt: "easy pay",
  },
  "easypay-white": {
    src: "/brand/partner-logos/easypay-white.png",
    defaultAlt: "easy pay",
  },
  "work-ua": {
    src: "/brand/partner-logos/workua.png",
    defaultAlt: "WORK.ua",
  },
  eds: {
    src: "/brand/partner-logos/eds.png",
    defaultAlt: "EDS Charity Foundation",
  },
  honey: {
    src: "/brand/partner-logos/honey.png",
    defaultAlt: "Honey",
  },
  sich: {
    src: "/brand/partner-logos/sich.png",
    defaultAlt: "SICH Tourniquet",
  },
  dila: {
    src: "/brand/partner-logos/dila.png",
    defaultAlt: "Діла",
  },
  "kran-resurs": {
    src: "/brand/partner-logos/kran-resurs.png",
    defaultAlt: "Кран Ресурс",
  },
  zavertailo: {
    src: "/brand/partner-logos/zavertailo.png",
    defaultAlt: "Завертайло",
  },
  smile: {
    src: "/brand/partner-logos/smile.png",
    defaultAlt: "Smile",
  },
  helsi: {
    src: "/brand/partner-logos/helsi.png",
    defaultAlt: "Helsi",
  },
  "privatbank": {
    src: "/brand/partner-logos/privatbank.png",
    defaultAlt: "ПриватБанк",
  },
  wog: {
    src: "/brand/partner-logos/wog.svg",
    defaultAlt: "WOG",
  },
  uniqa: {
    src: "/brand/partner-logos/uniqa.png",
    defaultAlt: "UNIQA",
  },
};

export function getPartnerLogoAsset(variant: PartnerLogoVariant): PartnerLogoAsset {
  return PARTNER_LOGO_ASSETS[variant];
}
