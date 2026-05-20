import { useMemo } from "react";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
import { ColorSwatchGrid } from "./ColorSwatch";
import shared from "./tokensShared.module.css";
import { useCssVarValues } from "./useCssVarValues";

const BRAND_NEUTRAL = [
  "--pryt-brand-neutral-0",
  "--pryt-brand-neutral-50",
  "--pryt-brand-neutral-100",
  "--pryt-brand-neutral-200",
  "--pryt-brand-neutral-300",
  "--pryt-brand-neutral-500",
  "--pryt-brand-neutral-600",
  "--pryt-brand-neutral-900",
  "--pryt-brand-neutral-950",
] as const;

const BRAND_ORANGE = [
  "--pryt-brand-orange-20",
  "--pryt-brand-orange-50",
  "--pryt-brand-orange-100",
  "--pryt-brand-orange-500",
  "--pryt-brand-orange-700",
  "--pryt-brand-orange-950",
] as const;

const BRAND_BLUE = [
  "--pryt-brand-blue-50",
  "--pryt-brand-blue-100",
  "--pryt-brand-blue-700",
  "--pryt-brand-blue-950",
] as const;

const BRAND_GREEN = ["--pryt-brand-green-50", "--pryt-brand-green-600"] as const;

const BRAND_RED = ["--pryt-brand-red-50", "--pryt-brand-red-500"] as const;

const ALIAS_BG = [
  "--bg-page",
  "--bg-surface",
  "--bg-subtle-info",
  "--bg-subtle-accent",
  "--bg-subtle-neutral",
  "--bg-inverse",
  "--bg-inverse-strong",
  "--bg-badge",
  "--bg-accent",
  "--bg-info",
] as const;

const ALIAS_TEXT = [
  "--text-primary",
  "--text-secondary",
  "--text-tertiary",
  "--text-inverse",
  "--text-inverse-muted",
  "--text-on-accent",
] as const;

const ALIAS_ACTION = [
  "--action-donate",
  "--action-donate-hover",
  "--action-primary",
  "--action-primary-hover",
  "--action-secondary-border",
  "--action-inverse",
  "--action-disabled",
  "--action-disabled-text",
] as const;

const ALIAS_ACCENT = [
  "--accent-primary",
  "--accent-secondary",
  "--accent-highlight",
] as const;

const ALIAS_BORDER = ["--border-inverse"] as const;

const ALIAS_FEEDBACK = [
  "--feedback-success",
  "--feedback-success-bg",
  "--feedback-error",
  "--feedback-error-bg",
  "--feedback-warning",
  "--feedback-warning-bg",
  "--feedback-info",
  "--feedback-info-bg",
] as const;

const MAPPED_SURFACE = [
  "--surface-page",
  "--surface-default",
  "--surface-subtle-info",
  "--surface-subtle-accent",
  "--surface-subtle-neutral",
  "--surface-inverse",
  "--surface-badge",
  "--surface-action",
  "--surface-action-hover",
  "--surface-primary",
  "--surface-primary-hover",
  "--surface-inverse-action",
  "--surface-disabled",
  "--surface-info",
] as const;

const MAPPED_TEXT = [
  "--text-default",
  "--text-muted",
  "--text-subtle",
  "--text-on-action",
  "--text-on-primary",
  "--text-on-inverse",
  "--text-on-inverse-muted",
] as const;

const MAPPED_ICON = [
  "--icon-default",
  "--icon-muted",
  "--icon-on-action",
  "--icon-on-primary",
  "--icon-brand",
] as const;

const MAPPED_BORDER = ["--border-on-inverse"] as const;

const DEDUPED = [
  "--border-default",
  "--border-strong",
  "--border-focus",
  "--text-disabled",
  "--text-link",
] as const;

const ALL_TOKENS = [
  ...BRAND_NEUTRAL,
  ...BRAND_ORANGE,
  ...BRAND_BLUE,
  ...BRAND_GREEN,
  ...BRAND_RED,
  ...ALIAS_BG,
  ...ALIAS_TEXT,
  ...ALIAS_ACTION,
  ...ALIAS_ACCENT,
  ...ALIAS_BORDER,
  ...ALIAS_FEEDBACK,
  ...MAPPED_SURFACE,
  ...MAPPED_TEXT,
  ...MAPPED_ICON,
  ...MAPPED_BORDER,
  ...DEDUPED,
];

export function ColorsPage() {
  const tokens = useMemo(() => ALL_TOKENS, []);
  const values = useCssVarValues(tokens);

  return (
    <ShowcasePageLayout
      title="Colors"
      description="Усі кольорові токени системи Prytula. Перший вибір у компонентах — Mapped, потім Alias, в останню чергу Brand."
    >
      <ShowcaseSection title="Brand primitives">
        <p className={shared.lowLevelNote}>
          ⚠ Low-level. Не використовуй напряму у компонентах — лише через Alias
          або Mapped.
        </p>
        <h3 className={shared.subgroupTitle}>Neutrals</h3>
        <ColorSwatchGrid tokens={BRAND_NEUTRAL} values={values} />
        <h3 className={shared.subgroupTitle}>Orange</h3>
        <ColorSwatchGrid tokens={BRAND_ORANGE} values={values} />
        <h3 className={shared.subgroupTitle}>Blue</h3>
        <ColorSwatchGrid tokens={BRAND_BLUE} values={values} />
        <h3 className={shared.subgroupTitle}>Green</h3>
        <ColorSwatchGrid tokens={BRAND_GREEN} values={values} />
        <h3 className={shared.subgroupTitle}>Red</h3>
        <ColorSwatchGrid tokens={BRAND_RED} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — bg">
        <ColorSwatchGrid tokens={ALIAS_BG} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — text">
        <ColorSwatchGrid tokens={ALIAS_TEXT} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — action">
        <ColorSwatchGrid tokens={ALIAS_ACTION} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — accent">
        <ColorSwatchGrid tokens={ALIAS_ACCENT} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — border">
        <ColorSwatchGrid tokens={ALIAS_BORDER} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Alias — feedback">
        <ColorSwatchGrid tokens={ALIAS_FEEDBACK} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Mapped — surface">
        <ColorSwatchGrid tokens={MAPPED_SURFACE} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Mapped — text">
        <ColorSwatchGrid tokens={MAPPED_TEXT} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Mapped — icon">
        <ColorSwatchGrid tokens={MAPPED_ICON} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Mapped — border">
        <ColorSwatchGrid tokens={MAPPED_BORDER} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Deduped (shared Alias/Mapped names)">
        <p className={shared.dedupeNote}>
          Ці CSS-змінні обслуговують і Alias, і Mapped — у Figma це два шляхи, у
          CSS одна змінна. Використовуй вільно — це не баг.
        </p>
        <ColorSwatchGrid tokens={DEDUPED} values={values} />
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
