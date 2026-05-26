/**
 * Semantic font-size tokens per Figma mode — mirrors tokens.css @media breakpoints.
 * Applied on showcase preview frames so typography follows viewport toggle, not browser width.
 * Source: design-tokens/data/figma-semantic-typography.tsv
 */

export type ShowcaseTypographyMode = "mobile" | "tablet" | "desktop";

const MOBILE: Record<string, string> = {
  "--font-size-body-large": "14px",
  "--font-size-body-medium": "14px",
  "--font-size-body-small": "14px",
  "--font-size-caption": "12px",
  "--font-size-caption-medium": "13px",
  "--font-size-heading-h0": "40px",
  "--font-size-heading-h1": "32px",
  "--font-size-heading-h2": "28px",
  "--font-size-heading-h3": "24px",
  "--font-size-heading-h4": "18px",
  "--font-size-image-caption": "14px",
  "--font-size-numbers-section": "32px",
  "--font-size-numbers-tiny": "10px",
  "--font-size-tab-label": "20px",
};

const TABLET: Record<string, string> = {
  ...MOBILE,
  "--font-size-body-large": "18px",
  "--font-size-heading-h0": "56px",
  "--font-size-heading-h1": "40px",
  "--font-size-heading-h2": "32px",
  "--font-size-heading-h3": "28px",
  "--font-size-heading-h4": "22px",
  "--font-size-image-caption": "16px",
  "--font-size-numbers-section": "40px",
  "--font-size-tab-label": "24px",
};

const DESKTOP: Record<string, string> = {
  ...TABLET,
  "--font-size-body-large": "20px",
  "--font-size-body-medium": "16px",
  "--font-size-heading-h0": "72px",
  "--font-size-heading-h1": "56px",
  "--font-size-heading-h2": "40px",
  "--font-size-heading-h3": "32px",
  "--font-size-heading-h4": "24px",
  "--font-size-image-caption": "18px",
  "--font-size-numbers-section": "52px",
  "--font-size-tab-label": "28px",
};

const BY_MODE: Record<ShowcaseTypographyMode, Record<string, string>> = {
  mobile: MOBILE,
  tablet: TABLET,
  desktop: DESKTOP,
};

/** Same breakpoints as design-tokens/scripts/build.mjs (768 / 1024). */
export function typographyModeForWidth(width: number): ShowcaseTypographyMode {
  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export function showcaseTypographyStyle(
  width: number,
): Record<string, string | number> {
  const mode = typographyModeForWidth(width);
  return {
    width,
    minWidth: width,
    maxWidth: width,
    ...BY_MODE[mode],
  };
}
