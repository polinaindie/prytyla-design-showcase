import type { CSSProperties } from "react";
import { semanticSpacingMeta } from "../../../design-tokens/dist/tokens";
import {
  typographyModeForWidth,
  type ShowcaseTypographyMode,
} from "./showcaseTypography";

/** Effective px for active showcase viewport (overrides @media inside narrow frame). */
export function showcaseSemanticSpacingVars(
  width: number,
): Record<string, string> {
  const mode = typographyModeForWidth(width);
  const vars: Record<string, string> = {};
  for (const row of semanticSpacingMeta) {
    const px =
      mode === "desktop"
        ? row.desktop
        : mode === "tablet"
          ? row.tablet
          : row.mobile;
    vars[row.cssVar] = `${px}px`;
  }
  return vars;
}

export function semanticSpacingPxForMode(
  cssVar: string,
  mode: ShowcaseTypographyMode,
): string {
  const row = semanticSpacingMeta.find((r) => r.cssVar === cssVar);
  if (!row) return "—";
  const px =
    mode === "desktop"
      ? row.desktop
      : mode === "tablet"
        ? row.tablet
        : row.mobile;
  return `${px}px`;
}

export function semanticSpacingLabelForMode(
  row: (typeof semanticSpacingMeta)[number],
): string {
  if (!row.responsive) return `${row.mobile}px`;
  return `${row.mobile} · ${row.tablet} · ${row.desktop}px`;
}

/** Live preview layout — Figma semantic spacing tokens. */
export function spacingShowcaseDemoVars(width: number): CSSProperties {
  return {
    ...showcaseSemanticSpacingVars(width),
    "--spacing-demo-gutter": "var(--spacing-section-x)",
    "--spacing-demo-section": "var(--spacing-section-y-default)",
    "--spacing-demo-card": "var(--spacing-card-medium)",
    "--spacing-demo-cta": "var(--spacing-gap-lg)",
    "--spacing-demo-stack": "var(--spacing-gap-sm)",
    "--spacing-demo-button-height": "var(--spacing-button-height)",
    "--spacing-demo-button-px": "var(--spacing-button-px)",
  } as CSSProperties;
}

export const SPACING_SHOWCASE_GROUPS = [
  { id: "section", title: "Section", prefix: "spacing/section-" },
  { id: "banner", title: "Banner", prefix: "spacing/banner-" },
  { id: "card", title: "Card", prefix: "spacing/card-" },
  { id: "gap", title: "Gap", prefix: "spacing/gap" },
  { id: "button", title: "Button", prefix: "spacing/button-" },
  { id: "footer", title: "Footer", prefix: "spacing/footer-" },
] as const;

export function spacingMetaForGroup(groupId: (typeof SPACING_SHOWCASE_GROUPS)[number]["id"]) {
  const group = SPACING_SHOWCASE_GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return semanticSpacingMeta.filter((row) => row.figma.startsWith(group.prefix));
}
