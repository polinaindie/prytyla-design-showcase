import { useEffect, useMemo, useState } from "react";
import {
  ShowcaseDocBulletList,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseTablesRow,
  ShowcaseDoDont,
  ShowcaseThemeProvider,
  useShowcaseSearch,
  useShowcaseTheme,
} from "../primitives";
import { ColorSwatchGrid, type ColorSwatchPair } from "./ColorSwatch";
import styles from "./ColorsPage.module.css";
import { useCssVarValues } from "./useCssVarValues";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const FEATURED_TOKENS = [
  "--surface-page",
  "--surface-action",
  "--accent-primary",
  "--accent-secondary",
  "--text-default",
  "--surface-inverse",
] as const;

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
  "--border-focus",
  "--text-disabled",
] as const;

const ALIAS_BG_ALIGNED_PAIRS: readonly ColorSwatchPair[] = [
  ["--bg-surface", "--border-strong"],
  ["--bg-inverse", "--text-link"],
];

const ALIAS_BG = [
  "--bg-page",
  "--bg-subtle-info",
  "--bg-subtle-accent",
  "--bg-subtle-neutral",
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

const ALL_TOKENS = [
  ...MAPPED_SURFACE,
  ...MAPPED_TEXT,
  ...MAPPED_ICON,
  ...MAPPED_BORDER,
  ...DEDUPED,
  ...ALIAS_BG_ALIGNED_PAIRS.flat(),
  ...ALIAS_BG,
  ...ALIAS_TEXT,
  ...ALIAS_ACTION,
  ...ALIAS_ACCENT,
  ...ALIAS_BORDER,
  ...ALIAS_FEEDBACK,
  ...BRAND_NEUTRAL,
  ...BRAND_ORANGE,
  ...BRAND_BLUE,
  ...BRAND_GREEN,
  ...BRAND_RED,
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Page shell", property: "background", token: "--surface-page" },
  { element: "Primary CTA", property: "background", token: "--surface-action" },
  { element: "Primary CTA label", property: "color", token: "--text-on-action" },
  { element: "Body text", property: "color", token: "--text-default" },
  { element: "Card border", property: "border-color", token: "--border-default" },
  { element: "Focus ring", property: "outline-color", token: "--border-focus" },
  { element: "Donate alias", property: "background", token: "--action-donate" },
  { element: "Error feedback", property: "color", token: "--feedback-error" },
] as const;

const COLOR_PROPERTIES = [
  {
    property: "Collection",
    type: "layer",
    optionsDefault: "Brand · Alias · Mapped",
    description: "Рівень у Figma variables; у CSS — ланцюг Mapped → Alias → Brand.",
  },
  {
    property: "CSS variable",
    type: "string",
    optionsDefault: "var(--text-default)",
    description: "Публічне ім'я з tokens.css; клік по свотчу копіює це значення.",
  },
  {
    property: "Resolved value",
    type: "color",
    optionsDefault: "hex / rgb з :root",
    description: "Поточне значення у режимі Mode 1 (desktop semantic).",
  },
  {
    property: "Usage in components",
    type: "rule",
    optionsDefault: "Mapped first",
    description: "У продуктових компонентах — Mapped, потім Alias; Brand не напряму.",
  },
];

type ColorSection = {
  id: string;
  title: string;
  tokens: readonly string[];
  columns?: 2 | 3 | 4;
  alignedPairs?: readonly ColorSwatchPair[];
};

function filterTokens(tokens: readonly string[], query: string): readonly string[] {
  const q = query.trim().toLowerCase();
  if (!q) return tokens;
  return tokens.filter((token) => token.toLowerCase().includes(q));
}

function sectionVisible(section: ColorSection, query: string): boolean {
  if (section.alignedPairs?.length) {
    const pairTokens = section.alignedPairs.flat();
    if (filterTokens(pairTokens, query).length > 0) return true;
  }
  return filterTokens(section.tokens, query).length > 0;
}

const MAPPED_SECTIONS: ColorSection[] = [
  { id: "key-ui", title: "Key UI colors", tokens: FEATURED_TOKENS, columns: 3 },
  { id: "mapped-surface", title: "Surface", tokens: MAPPED_SURFACE, columns: 4 },
  { id: "mapped-text", title: "Text", tokens: MAPPED_TEXT, columns: 3 },
  { id: "mapped-icon", title: "Icon", tokens: MAPPED_ICON, columns: 3 },
  { id: "mapped-border", title: "Border", tokens: MAPPED_BORDER, columns: 3 },
  {
    id: "deduped",
    title: "Shared with Alias (deduped)",
    tokens: DEDUPED,
    columns: 3,
  },
];

const ALIAS_SECTIONS: ColorSection[] = [
  {
    id: "alias-bg",
    title: "Background",
    tokens: ALIAS_BG,
    columns: 4,
    alignedPairs: ALIAS_BG_ALIGNED_PAIRS,
  },
  { id: "alias-text", title: "Text", tokens: ALIAS_TEXT, columns: 3 },
  { id: "alias-action", title: "Action", tokens: ALIAS_ACTION, columns: 3 },
  { id: "alias-accent", title: "Accent", tokens: ALIAS_ACCENT, columns: 3 },
  { id: "alias-border", title: "Border", tokens: ALIAS_BORDER, columns: 3 },
  { id: "alias-feedback", title: "Feedback", tokens: ALIAS_FEEDBACK, columns: 4 },
];

function ColorsPageContent() {
  const { theme } = useShowcaseTheme();
  const { query } = useShowcaseSearch();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const tokens = useMemo(() => ALL_TOKENS, []);
  const values = useCssVarValues(tokens);

  const usageTokens = useMemo(
    () => TOKEN_USAGE_SAMPLE.map((row) => row.token),
    [],
  );
  const usageValues = useCssVarValues(usageTokens);

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

  const mappedBlockVisible = MAPPED_SECTIONS.some((section) =>
    sectionVisible(section, query),
  );

  const aliasBlockVisible = ALIAS_SECTIONS.some((section) =>
    sectionVisible(section, query),
  );

  const brandBlockVisible =
    filterTokens(BRAND_NEUTRAL, query).length > 0 ||
    filterTokens(BRAND_ORANGE, query).length > 0 ||
    filterTokens(BRAND_BLUE, query).length > 0 ||
    filterTokens(BRAND_GREEN, query).length > 0 ||
    filterTokens(BRAND_RED, query).length > 0;

  const renderSectionPanels = (sections: ColorSection[]) =>
    sections.map((section) => {
      if (!sectionVisible(section, query)) return null;

      const visible = filterTokens(section.tokens, query);

      return (
        <article key={section.id} className={styles.gallerySection}>
          <h4 className={styles.subgroupTitle}>{section.title}</h4>
          {section.id === "deduped" ? (
            <p className={styles.dedupeNote}>
              Ці CSS-змінні обслуговують і Alias, і Mapped — у Figma це два шляхи, у
              CSS одна змінна. <code>--border-strong</code> і <code>--text-link</code>{" "}
              вирівняні по осі з <code>--bg-surface</code> та{" "}
              <code>--bg-inverse</code> у Alias — Background.
            </p>
          ) : null}
          <ColorSwatchGrid
            tokens={visible}
            values={values}
            columns={section.columns}
            pairs={section.alignedPairs}
            query={query}
            copiedToken={copiedToken}
            onCopy={handleCopy}
          />
        </article>
      );
    });

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    ...row,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied var({copiedToken})
        </p>
      ) : null}

      <ShowcaseDocPage
        title="Colors"
        description="Усі кольорові токени Prytula DS. У компонентах першим вибором — Mapped, потім Alias; Brand — лише для збірки токенів."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Token gallery"
          description="Клік по свотчу копіює var(--token). Mapped — перший вибір у UI; Brand — палітра для збірки токенів."
        >
          {searchActive ? (
            <p className={styles.searchCount} aria-live="polite">
              Знайдено {filteredCount} токенів
            </p>
          ) : null}

          {mappedBlockVisible ? (
            <div className={styles.collectionBlock}>
              <h3 className={styles.collectionTitle}>Mapped</h3>
              <p className={styles.collectionIntro}>
                Semantic UI roles — перший вибір у компонентах (
                <code>--text-default</code>, <code>--surface-page</code>).
              </p>
              {renderSectionPanels(MAPPED_SECTIONS)}
            </div>
          ) : null}

          {aliasBlockVisible ? (
            <div className={styles.collectionBlock}>
              <h3 className={styles.collectionTitle}>Alias</h3>
              <p className={styles.collectionIntro}>
                Публічний API, коли Mapped не покриває семантику (
                <code>--bg-inverse</code>, <code>--action-primary</code>).
              </p>
              {renderSectionPanels(ALIAS_SECTIONS)}
            </div>
          ) : null}

          {brandBlockVisible ? (
            <div className={styles.collectionBlock}>
              <h3 className={styles.collectionTitle}>Brand</h3>
              <p className={styles.lowLevelNote}>
                Low-level primitives. Не використовуй напряму у компонентах — лише
                через Alias або Mapped.
              </p>

              {filterTokens(BRAND_NEUTRAL, query).length > 0 ? (
                <article className={styles.gallerySection}>
                  <h4 className={styles.paletteTitle}>Neutrals</h4>
                  <ColorSwatchGrid
                    tokens={filterTokens(BRAND_NEUTRAL, query)}
                    values={values}
                    columns={3}
                    copiedToken={copiedToken}
                    onCopy={handleCopy}
                  />
                </article>
              ) : null}

              {filterTokens(BRAND_ORANGE, query).length > 0 ? (
                <article className={styles.gallerySection}>
                  <h4 className={styles.paletteTitle}>Orange</h4>
                  <ColorSwatchGrid
                    tokens={filterTokens(BRAND_ORANGE, query)}
                    values={values}
                    columns={3}
                    copiedToken={copiedToken}
                    onCopy={handleCopy}
                  />
                </article>
              ) : null}

              {filterTokens(BRAND_BLUE, query).length > 0 ? (
                <article className={styles.gallerySection}>
                  <h4 className={styles.paletteTitle}>Blue</h4>
                  <ColorSwatchGrid
                    tokens={filterTokens(BRAND_BLUE, query)}
                    values={values}
                    columns={3}
                    copiedToken={copiedToken}
                    onCopy={handleCopy}
                  />
                </article>
              ) : null}

              {(filterTokens(BRAND_GREEN, query).length > 0 ||
                filterTokens(BRAND_RED, query).length > 0) ? (
                <article className={styles.gallerySection}>
                  <h4 className={styles.paletteTitle}>Feedback hues</h4>
                  <ColorSwatchGrid
                    tokens={[
                      ...filterTokens(BRAND_GREEN, query),
                      ...filterTokens(BRAND_RED, query),
                    ]}
                    values={values}
                    columns={3}
                    copiedToken={copiedToken}
                    onCopy={handleCopy}
                  />
                </article>
              ) : null}
            </div>
          ) : null}
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Структура колекцій і типові прив'язки semantic tokens у UI."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "properties",
                caption: "Properties",
                children: <ShowcaseDocPropertiesTable rows={COLOR_PROPERTIES} />,
              },
              {
                key: "token-usage",
                caption: "Token usage",
                children: <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />,
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="accessibility"
          description="Контраст і читабельність при виборі кольорів."
        >
          <ShowcaseDocBulletList
            items={[
              "Текст на surface-page: --text-default або --text-muted, не Brand hex.",
              "Текст на inverse / primary surfaces: --text-on-inverse, --text-on-primary.",
              "Інтерактивні елементи: focus --border-focus; disabled — --text-disabled.",
              "Не покладайтесь лише на колір для стану — додавайте label, icon або pattern.",
              "Перевіряйте контраст WCAG для нових пар surface + text перед релізом.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
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
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="related-components"
          description="Інші foundation-сторінки та токени."
        >
          <ShowcaseDocRelated
            links={[
              { label: "Typography", path: "typography" },
              { label: "Spacing", path: "spacing" },
              { label: "Radius", path: "radius" },
              { label: "Grid", path: "grid" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
