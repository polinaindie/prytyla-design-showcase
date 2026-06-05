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

/** Figma component Size variant for showcase preview frame width. */
export function figmaComponentSizeForViewportWidth(
  width: number,
): ShowcaseTypographyMode {
  return typographyModeForWidth(width);
}

/** Menu bar size — laptop (1024–1439) is tighter than desktop (Figma 1162:35251). */
export function menuSizeForViewportWidth(
  width: number,
): "desktop" | "laptop" | "tablet" | "mobile" {
  if (width >= 1440) return "desktop";
  if (width >= 1024) return "laptop";
  if (width >= 768) return "tablet";
  return "mobile";
}

/** Two-tier Figma Size (desktop | mobile only). */
export function figmaComponentSizeBinaryForViewportWidth(
  width: number,
): "desktop" | "mobile" {
  return width < 768 ? "mobile" : "desktop";
}

/** Sort Control — inline row (desktop) vs full-width bar (tablet/mobile, Figma 940:9610). */
export function sortControlLayoutForViewportWidth(
  width: number,
): "inline" | "bar" {
  return width < 1024 ? "bar" : "inline";
}

/** Button showcase live-preview grid columns by frame width. */
export function buttonShowcaseGridColumnsForViewportWidth(
  width: number,
): 1 | 2 | 3 | 4 {
  if (width < 768) return 1;
  if (width < 1200) return 2;
  if (width < 1440) return 3;
  return 4;
}

export function showcaseTypographyVars(
  width: number,
): Record<string, string> {
  return BY_MODE[typographyModeForWidth(width)];
}

/** Fixed viewport width for full-bleed section previews only. */
export function showcaseViewportWidthStyle(
  width: number,
): Record<string, string | number> {
  return {
    width,
    minWidth: width,
    maxWidth: width,
  };
}

export function showcaseTypographyStyle(
  width: number,
  options?: { constrainWidth?: boolean },
): Record<string, string | number> {
  return {
    ...showcaseTypographyVars(width),
    ...(options?.constrainWidth ? showcaseViewportWidthStyle(width) : {}),
  };
}
