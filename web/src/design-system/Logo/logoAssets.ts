import type { LogoLanguage } from "./Logo.types";

export type LogoAssetMeta = {
  language: LogoLanguage;
  figmaLabel: string;
  src: string;
  defaultAlt: string;
};

/** Figma Logo — Language variants. Files: `web/public/brand/logo-{en,uk}.svg` */
export const LOGO_ASSETS: LogoAssetMeta[] = [
  {
    language: "en",
    figmaLabel: "Language=Eng",
    src: "/brand/logo-en.svg",
    defaultAlt: "Serhiy Prytula Charity Foundation",
  },
  {
    language: "uk",
    figmaLabel: "Language=Ukr",
    src: "/brand/logo-uk.svg",
    defaultAlt: "Благодійний фонд Сергія Притули",
  },
];

const BY_LANGUAGE = new Map(LOGO_ASSETS.map((a) => [a.language, a]));

export function getLogoAsset(language: LogoLanguage): LogoAssetMeta {
  const asset = BY_LANGUAGE.get(language);
  if (!asset) {
    throw new Error(`Unknown Logo language: ${language}`);
  }
  return asset;
}
