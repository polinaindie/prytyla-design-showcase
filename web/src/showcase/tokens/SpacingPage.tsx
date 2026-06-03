import { useEffect, useMemo, useState } from "react";
import {
  ShowcaseDocBulletList,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDoDont,
  ShowcaseTablesRow,
  ShowcaseThemeProvider,
  ShowcaseTokenTable,
  useShowcaseSearch,
  useShowcaseTheme,
} from "../primitives";
import styles from "./SpacingPage.module.css";
import shared from "./tokensShared.module.css";
import { useCssVarValues, useResolvedTokens } from "./useCssVarValues";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const ALIAS_SPACE = [
  "--space-none",
  "--space-3xsmall",
  "--space-2xsmall",
  "--space-xsmall",
  "--space-small",
  "--space-medium",
  "--space-large",
  "--space-xlarge",
  "--space-2xlarge",
  "--space-3xlarge",
  "--space-4xlarge",
  "--space-5xlarge",
  "--space-6xlarge",
  "--space-7xlarge",
  "--space-8xlarge",
] as const;

const BRAND_SCALE = [
  "--pryt-brand-scale-0",
  "--pryt-brand-scale-25",
  "--pryt-brand-scale-50",
  "--pryt-brand-scale-100",
  "--pryt-brand-scale-200",
  "--pryt-brand-scale-300",
  "--pryt-brand-scale-400",
  "--pryt-brand-scale-500",
  "--pryt-brand-scale-600",
  "--pryt-brand-scale-700",
  "--pryt-brand-scale-800",
  "--pryt-brand-scale-900",
  "--pryt-brand-scale-1000",
  "--pryt-brand-scale-1200",
  "--pryt-brand-scale-1400",
  "--pryt-brand-scale-1600",
  "--pryt-brand-scale-2000",
  "--pryt-brand-scale-2400",
  "--pryt-brand-scale-3200",
] as const;

const TOKEN_USAGE_SAMPLE = [
  { element: "Section padding Y", property: "padding-block", token: "--space-2xlarge" },
  { element: "Card padding", property: "padding", token: "--space-medium" },
  { element: "Stack gap (tight)", property: "gap", token: "--space-small" },
  { element: "Stack gap (default)", property: "gap", token: "--space-large" },
  { element: "Inline icon gap", property: "gap", token: "--space-xsmall" },
  { element: "Page gutter", property: "padding-inline", token: "--space-large" },
  { element: "Nav / CTA height", property: "min-height", token: "--size-4xlarge" },
  { element: "Section rhythm", property: "margin-block", token: "--space-3xlarge" },
] as const;

const SPACING_PROPERTIES = [
  {
    property: "Alias spacing",
    type: "public API",
    optionsDefault: "--space-none … --space-8xlarge",
    description: "Семантичні відступи для margin, padding, gap у компонентах і сторінках.",
  },
  {
    property: "Brand scale",
    type: "primitive",
    optionsDefault: "--pryt-brand-scale-0 … 3200",
    description: "Числова шкала в px з Figma Brand — збирає Alias, не для прямого використання.",
  },
  {
    property: "CSS variable",
    type: "string",
    optionsDefault: "var(--space-medium)",
    description: "Клік по рядку таблиці копіює var(--token).",
  },
  {
    property: "Resolved value",
    type: "length",
    optionsDefault: "px з :root",
    description: "Фактична довжина у поточній темі showcase.",
  },
];

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function spacingPx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
}

function filterTokens(tokens: readonly string[], query: string): readonly string[] {
  const q = query.trim().toLowerCase();
  if (!q) return tokens;
  return tokens.filter((token) => token.toLowerCase().includes(q));
}

function sortByValueDesc(
  tokens: readonly string[],
  values: Record<string, string>,
): string[] {
  return [...tokens]
    .filter((token) => (values[token] ?? "").length > 0)
    .sort((a, b) => spacingPx(values[b]!) - spacingPx(values[a]!));
}

function buildSpacingRows(
  tokens: readonly string[],
  values: Record<string, string>,
  onCopy: (token: string) => void,
) {
  return sortByValueDesc(tokens, values).map((token) => ({
    token,
    value: values[token]!,
    onCopy: () => {
      void navigator.clipboard.writeText(tokenVarRef(token)).then(
        () => onCopy(token),
        () => undefined,
      );
    },
  }));
}

function SpacingPageContent() {
  const { theme } = useShowcaseTheme();
  const { query } = useShowcaseSearch();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(() => [...ALIAS_SPACE, ...BRAND_SCALE], []);
  const { values } = useResolvedTokens(candidates);

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
    const all = [...ALIAS_SPACE, ...BRAND_SCALE];
    if (!searchActive) return all.length;
    const q = query.trim().toLowerCase();
    return all.filter((token) => token.toLowerCase().includes(q)).length;
  }, [query, searchActive]);

  const aliasVisible = filterTokens(ALIAS_SPACE, query);
  const brandVisible = filterTokens(BRAND_SCALE, query);

  const aliasRows = useMemo(
    () => buildSpacingRows(aliasVisible, values, handleCopy),
    [aliasVisible, values],
  );

  const brandRows = useMemo(
    () => buildSpacingRows(brandVisible, values, handleCopy),
    [brandVisible, values],
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    ...row,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied var({copiedToken})!
        </p>
      ) : null}

      <ShowcaseDocPage
        title="Spacing"
        description="Відступи Prytula DS. У компонентах — Alias --space-*; Brand scale лише для збірки токенів."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Spacing gallery"
          description="Шкала відступів від найбільшого до найменшого. Клік по токену — копіює var(--token)."
        >
          {searchActive ? (
            <p className={styles.searchCount} aria-live="polite">
              Знайдено {filteredCount} токенів
            </p>
          ) : null}

          {aliasRows.length > 0 || brandRows.length > 0 ? (
            <ShowcaseTablesRow
              tables={[
                ...(aliasRows.length > 0
                  ? [
                      {
                        key: "alias",
                        caption: "Alias spacing — public API",
                        children: <ShowcaseTokenTable rows={aliasRows} />,
                      },
                    ]
                  : []),
                ...(brandRows.length > 0
                  ? [
                      {
                        key: "brand",
                        caption: "Brand scale primitives",
                        children: (
                          <>
                            <p className={shared.lowLevelNote}>
                              Low-level. Не використовуй --pryt-brand-scale-* у
                              компонентах — лише --space-*.
                            </p>
                            <ShowcaseTokenTable rows={brandRows} />
                          </>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          ) : null}

          {searchActive && aliasRows.length === 0 && brandRows.length === 0 ? (
            <p className={styles.searchEmpty}>Нічого не знайдено за запитом «{query}».</p>
          ) : null}
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Структура шкали та типові layout-прив'язки."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "properties",
                caption: "Properties",
                children: <ShowcaseDocPropertiesTable rows={SPACING_PROPERTIES} />,
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
          description="Відступи впливають на touch targets і читабельність."
        >
          <ShowcaseDocBulletList
            items={[
              "Мінімальний hit target інтерактивних елементів — 24×24px; padding доповнює, не замінює розмір.",
              "Не стискай padding текстових блоків нижче --space-small без дизайн-рішення.",
              "Консистентні section gaps (--space-2xlarge / --space-3xlarge) полегшують сканування сторінки.",
              "Scroll-області: padding-inline узгоджуй з page gutter (--space-large).",
              "Не покладайтесь лише на whitespace для групування — додавай heading або divider.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --space-* tokens для margin і padding",
              "Для scroll-областей padding узгоджуй з page padding (--space-large)",
            ]}
            dont={[
              "НЕ задавай margin/padding у px",
              "НЕ використовуй --pryt-brand-scale-* напряму",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="related-components"
          description="Інші foundation-сторінки."
        >
          <ShowcaseDocRelated
            links={[
              { label: "Colors", path: "colors" },
              { label: "Typography", path: "typography" },
              { label: "Radius", path: "radius" },
              { label: "Grid", path: "grid" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function SpacingPage() {
  return (
    <ShowcaseThemeProvider>
      <SpacingPageContent />
    </ShowcaseThemeProvider>
  );
}
