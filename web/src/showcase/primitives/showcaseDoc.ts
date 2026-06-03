/**
 * Universal showcase page structure (14 blocks, top → bottom).
 *
 *  1. Page header — H1, 1-line description, metadata (status, date, version)
 *  2. Live preview
 *  3. Variants gallery
 *  4. Anatomy
 *  5. Properties
 *  6. Token usage
 *  7. States & interactions
 *  8. Sizes
 *  9. Accessibility
 * 10. Usage guidelines
 * 11. Examples / recipes
 * 12. Related components
 * 13. Changelog (optional)
 * 14. Page footer — Figma CS + feedback
 *
 * Implementation: blocks 1 & 14 → ShowcaseDocPage; blocks 2–13 → ShowcaseDocSection.
 */

/** Page kind — which section checklist applies. */
export type ShowcaseDocPageKind = "foundation" | "component-minimal" | "component-full";

/** Canonical section ids for in-page anchors (blocks 2–13). */
export type ShowcaseDocSectionId =
  | "live-preview"
  | "variants-gallery"
  | "anatomy"
  | "properties"
  | "token-usage"
  | "states-interactions"
  | "sizes"
  | "accessibility"
  | "usage-guidelines"
  | "examples"
  | "related-components"
  | "changelog";

export const SHOWCASE_DOC_SECTION_TITLE: Record<ShowcaseDocSectionId, string> = {
  "live-preview": "Live preview",
  "variants-gallery": "Variants gallery",
  anatomy: "Anatomy",
  properties: "Properties",
  "token-usage": "Token usage",
  "states-interactions": "States & interactions",
  sizes: "Sizes",
  accessibility: "Accessibility",
  "usage-guidelines": "Usage guidelines",
  examples: "Examples / recipes",
  "related-components": "Related components",
  changelog: "Changelog",
};

export type ShowcaseDocStatus = "stable" | "beta" | "deprecated";

/** Foundations — blocks 3, 5–6 (combined), 9–10, 12; no live preview. */
export const SHOWCASE_DOC_FOUNDATION_SECTIONS: ShowcaseDocSectionId[] = [
  "variants-gallery",
  "properties",
  "token-usage",
  "accessibility",
  "usage-guidelines",
  "related-components",
];

/** Minimal components — blocks 2, 3, 5, 6, 9, 10, 12 (+ 1, 14). */
export const SHOWCASE_DOC_MINIMAL_SECTIONS: ShowcaseDocSectionId[] = [
  "live-preview",
  "variants-gallery",
  "properties",
  "token-usage",
  "accessibility",
  "usage-guidelines",
  "related-components",
];

/** Full components — blocks 2–12, optional 13 (+ 1, 14). */
export const SHOWCASE_DOC_FULL_SECTIONS: ShowcaseDocSectionId[] = [
  "live-preview",
  "variants-gallery",
  "anatomy",
  "properties",
  "token-usage",
  "states-interactions",
  "sizes",
  "accessibility",
  "usage-guidelines",
  "examples",
  "related-components",
  "changelog",
];

/** @deprecated Use SHOWCASE_DOC_MINIMAL_SECTIONS or SHOWCASE_DOC_FULL_SECTIONS */
export const SHOWCASE_DOC_COMPONENT_SECTIONS = SHOWCASE_DOC_MINIMAL_SECTIONS;

export function getShowcaseDocSections(
  kind: ShowcaseDocPageKind,
): readonly ShowcaseDocSectionId[] {
  switch (kind) {
    case "foundation":
      return SHOWCASE_DOC_FOUNDATION_SECTIONS;
    case "component-minimal":
      return SHOWCASE_DOC_MINIMAL_SECTIONS;
    case "component-full":
      return SHOWCASE_DOC_FULL_SECTIONS;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export const SHOWCASE_DOC_SECTION_HINT: Partial<
  Record<ShowcaseDocSectionId, string>
> = {
  "live-preview":
    "Hero variant centered on neutral background; caption names the variant; Copy code.",
  "variants-gallery":
    "Grid/matrix grouped by property; each cell = instance + full variant name caption.",
  anatomy: "Layout with labels and callouts (label, icon, container, …).",
  properties:
    "Property | Type | Options/default | Description; CS types VARIANT / TEXT / BOOLEAN / INSTANCE_SWAP.",
  "token-usage": "Element | Property | Token | resolved Value.",
  "states-interactions":
    "Default, hover, focus, pressed, disabled, loading, error — skip if already in gallery.",
  sizes: "Desktop / tablet / mobile or S / M / L side by side.",
  accessibility: "Keyboard, ARIA, hit targets, focus indicators, screen reader.",
  "usage-guidelines": "When to use, when not to use, alternatives.",
  examples: "Real product use cases (form, card, navigation).",
  "related-components": "Related siblings and components often used together.",
  changelog: "Version, date, summary, author (optional).",
};
