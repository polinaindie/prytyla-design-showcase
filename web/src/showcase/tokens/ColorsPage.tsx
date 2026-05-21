import { useEffect, useMemo, useState } from "react";
import { IconSearch } from "../../design-system/Icons";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseToolbar,
  useShowcaseTheme,
} from "../primitives";
import { ColorSwatchGrid } from "./ColorSwatch";
import styles from "./ColorsPage.module.css";
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

const QUICK_EXAMPLE = `.button {
  background: var(--surface-action);
  color: var(--text-on-action);
}

.card {
  background: var(--surface-default);
  border: var(--border-width-small) solid var(--border-default);
  color: var(--text-default);
}`;

type ColorSection = {
  id: string;
  title: string;
  tokens: readonly string[];
};

function filterTokens(tokens: readonly string[], query: string): readonly string[] {
  const q = query.trim().toLowerCase();
  if (!q) return tokens;
  return tokens.filter((token) => token.toLowerCase().includes(q));
}

function ColorsPageContent() {
  const { theme } = useShowcaseTheme();
  const [query, setQuery] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const tokens = useMemo(() => ALL_TOKENS, []);
  const values = useCssVarValues(tokens);

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  const searchActive = query.trim().length > 0;

  const filteredCount = useMemo(() => {
    if (!searchActive) return ALL_TOKENS.length;
    return ALL_TOKENS.filter((token) =>
      token.toLowerCase().includes(query.trim().toLowerCase()),
    ).length;
  }, [query, searchActive]);

  const renderGrid = (sectionTokens: readonly string[]) => {
    const visible = filterTokens(sectionTokens, query);
    return (
      <ColorSwatchGrid tokens={visible} values={values} onCopy={handleCopy} />
    );
  };

  const brandSectionVisible =
    filterTokens(BRAND_NEUTRAL, query).length > 0 ||
    filterTokens(BRAND_ORANGE, query).length > 0 ||
    filterTokens(BRAND_BLUE, query).length > 0 ||
    filterTokens(BRAND_GREEN, query).length > 0 ||
    filterTokens(BRAND_RED, query).length > 0;

  const sections: ColorSection[] = [
    { id: "alias-bg", title: "Alias — bg", tokens: ALIAS_BG },
    { id: "alias-text", title: "Alias — text", tokens: ALIAS_TEXT },
    { id: "alias-action", title: "Alias — action", tokens: ALIAS_ACTION },
    { id: "alias-accent", title: "Alias — accent", tokens: ALIAS_ACCENT },
    { id: "alias-border", title: "Alias — border", tokens: ALIAS_BORDER },
    { id: "alias-feedback", title: "Alias — feedback", tokens: ALIAS_FEEDBACK },
    { id: "mapped-surface", title: "Mapped — surface", tokens: MAPPED_SURFACE },
    { id: "mapped-text", title: "Mapped — text", tokens: MAPPED_TEXT },
    { id: "mapped-icon", title: "Mapped — icon", tokens: MAPPED_ICON },
    { id: "mapped-border", title: "Mapped — border", tokens: MAPPED_BORDER },
    {
      id: "deduped",
      title: "Deduped (shared Alias/Mapped names)",
      tokens: DEDUPED,
    },
  ];

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Colors"
        description="Усі кольорові токени Prytula DS. У компонентах першим вибором — Mapped, потім Alias; Brand — лише для збірки токенів."
      >
        <ShowcaseToolbar
          showSearch
          searchPlaceholder="Пошук токена…"
          searchValue={query}
          onSearch={setQuery}
          searchIcon={<IconSearch size={24} aria-hidden />}
        />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Приклад primary-кнопки на Mapped-токенах; тема сторінки керує контрастом підписів."
        >
          <div className={styles.livePreview}>
            <span className={styles.previewButton}>Підтримати</span>
          </div>
        </ShowcaseSection>

        {searchActive ? (
          <p className={styles.searchCount} aria-live="polite">
            Знайдено {filteredCount} токенів
          </p>
        ) : null}

        {brandSectionVisible ? (
          <ShowcaseSection
            id="brand"
            title="Brand primitives"
            description="Клік по свотчу — копіює var(--token). Low-level: не в компонентах напряму."
          >
            <p className={styles.lowLevelNote}>
              Low-level. Не використовуй напряму у компонентах — лише через Alias
              або Mapped.
            </p>
            {filterTokens(BRAND_NEUTRAL, query).length > 0 ? (
              <>
                <h3 className={styles.subgroupTitle}>Neutrals</h3>
                {renderGrid(BRAND_NEUTRAL)}
              </>
            ) : null}
            {filterTokens(BRAND_ORANGE, query).length > 0 ? (
              <>
                <h3 className={styles.subgroupTitle}>Orange</h3>
                {renderGrid(BRAND_ORANGE)}
              </>
            ) : null}
            {filterTokens(BRAND_BLUE, query).length > 0 ? (
              <>
                <h3 className={styles.subgroupTitle}>Blue</h3>
                {renderGrid(BRAND_BLUE)}
              </>
            ) : null}
            {filterTokens(BRAND_GREEN, query).length > 0 ? (
              <>
                <h3 className={styles.subgroupTitle}>Green</h3>
                {renderGrid(BRAND_GREEN)}
              </>
            ) : null}
            {filterTokens(BRAND_RED, query).length > 0 ? (
              <>
                <h3 className={styles.subgroupTitle}>Red</h3>
                {renderGrid(BRAND_RED)}
              </>
            ) : null}
          </ShowcaseSection>
        ) : null}

        {sections.map((section) => {
          const visible = filterTokens(section.tokens, query);
          if (visible.length === 0) return null;

          return (
            <ShowcaseSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={
                section.id === "deduped"
                  ? "Одна CSS-змінна для Alias і Mapped. Клік — копіює var(--token)."
                  : "Клік по свотчу — копіює var(--token)."
              }
            >
              {section.id === "deduped" ? (
                <p className={styles.dedupeNote}>
                  Ці CSS-змінні обслуговують і Alias, і Mapped — у Figma це два
                  шляхи, у CSS одна змінна.
                </p>
              ) : null}
              <ColorSwatchGrid
                tokens={visible}
                values={values}
                onCopy={handleCopy}
              />
            </ShowcaseSection>
          );
        })}

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй Mapped як перший вибір (--text-default, --surface-page)",
              "Alias — коли Mapped не покриває семантику (--bg-inverse, --action-primary)",
            ]}
            dont={[
              "НЕ використовуй Brand primitives (--pryt-brand-*) у компонентах",
              "НЕ хардкодуй hex/rgb у стилях — лише var(--token)",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function ColorsPage() {
  return (
    <ShowcaseThemeProvider>
      <ColorsPageContent />
    </ShowcaseThemeProvider>
  );
}
