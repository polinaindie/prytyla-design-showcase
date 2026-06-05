import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  semanticSpacingMeta,
  typographyBreakpoints,
} from "../../../../design-tokens/dist/tokens";
import { Button } from "../../design-system/Button";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
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
  showcaseViewportName,
  showcaseViewportWidth,
  type ShowcaseViewportId,
} from "../primitives";
import {
  buttonShowcaseGridColumnsForViewportWidth,
  typographyModeForWidth,
} from "../showcaseTypography";
import {
  semanticSpacingLabelForMode,
  semanticSpacingPxForMode,
  spacingMetaForGroup,
  spacingShowcaseDemoVars,
  SPACING_SHOWCASE_GROUPS,
} from "../spacingShowcaseUsage";
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
  {
    element: "Section Y",
    property: "padding-block",
    token: "--spacing-section-y-default",
  },
  { element: "Section X", property: "padding-inline", token: "--spacing-section-x" },
  { element: "Card", property: "padding", token: "--spacing-card-medium" },
  { element: "Stack gap", property: "gap", token: "--spacing-gap-sm" },
  { element: "Button row", property: "gap", token: "--spacing-gap-lg" },
  {
    element: "Button",
    property: "height / padding-x",
    token: "--spacing-button-height · --spacing-button-px",
  },
  { element: "Banner", property: "padding", token: "--spacing-banner-default" },
  { element: "Footer", property: "padding-top", token: "--spacing-footer-padding-top" },
] as const;

const SPACING_PROPERTIES = [
  {
    property: "Semantic spacing",
    type: "responsive token",
    optionsDefault: "--spacing-section-* · --spacing-gap-* · --spacing-button-* …",
    description:
      "Figma Semantic spacing/* — px змінюються по Mobile / Tablet / Desktop (@media 768 / 1024).",
  },
  {
    property: "Alias spacing",
    type: "static API",
    optionsDefault: "--space-none … --space-8xlarge",
    description: "Legacy/primitive відступи; для нових layout — semantic --spacing-*.",
  },
  {
    property: "Brand scale",
    type: "primitive",
    optionsDefault: "--pryt-brand-scale-0 … 3200",
    description: "Числова шкала в px — джерело для semantic (size/2400 → 96px).",
  },
  {
    property: "Showcase viewport",
    type: "preview control",
    optionsDefault: "Wide desktop … Mobile",
    description: "Value у таблиці semantic — px для активної ширини frame.",
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

function SpacingBar({ width }: { width: string }) {
  return (
    <div className={styles.spacingBarTrack} aria-hidden>
      <div className={styles.spacingBarFill} style={{ width }} />
    </div>
  );
}

function buildSpacingRows(
  tokens: readonly string[],
  values: Record<string, string>,
  onCopy: (token: string) => void,
) {
  return sortByValueDesc(tokens, values).map((token) => ({
    token,
    value: values[token]!,
    preview: <SpacingBar width={values[token]!} />,
    onCopy: () => {
      void navigator.clipboard.writeText(tokenVarRef(token)).then(
        () => onCopy(token),
        () => undefined,
      );
    },
  }));
}

function SpacingLayoutDemo({ previewWidth }: { previewWidth: number }) {
  const demoStyle = spacingShowcaseDemoVars(previewWidth);
  const gridCols = buttonShowcaseGridColumnsForViewportWidth(previewWidth);
  const mode = typographyModeForWidth(previewWidth);
  const recipeGridStyle = {
    "--spacing-showcase-grid-cols": String(gridCols),
  } as CSSProperties;

  const recipeTokens = [
    { label: "section-x", cssVar: "--spacing-section-x" },
    { label: "section-y-default", cssVar: "--spacing-section-y-default" },
    { label: "card-medium", cssVar: "--spacing-card-medium" },
    { label: "gap-lg", cssVar: "--spacing-gap-lg" },
    { label: "button-height", cssVar: "--spacing-button-height" },
    { label: "button-px", cssVar: "--spacing-button-px" },
  ] as const;

  return (
    <div style={demoStyle}>
      <div className={styles.demoShell}>
        <div className={styles.demoSections}>
          <div className={styles.demoBlock}>
            <p className={styles.demoBlockTitle}>Блок + кнопки</p>
            <p className={styles.demoMeta}>
              padding: var(--spacing-card-medium) · section gap: var(
              --spacing-section-y-default)
            </p>
            <div className={styles.demoCtaRow}>
              <Button
                variant="primary"
                theme="light"
                linkTarget="internal"
                className={styles.demoButton}
              >
                Підтримати
              </Button>
              <Button variant="secondary" theme="dark" className={styles.demoButton}>
                Дізнатись більше
              </Button>
            </div>
            <p className={styles.demoMeta}>
              gap-lg: {semanticSpacingPxForMode("--spacing-gap-lg", mode)} ·
              button-height:{" "}
              {semanticSpacingPxForMode("--spacing-button-height", mode)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.recipeGrid} style={recipeGridStyle}>
        {recipeTokens.map((item) => {
          const row = semanticSpacingMeta.find((r) => r.cssVar === item.cssVar);
          return (
            <div key={item.cssVar} className={styles.recipeCard}>
              <p className={styles.recipeLabel}>{item.label}</p>
              <p className={styles.recipeToken}>{item.cssVar}</p>
              <p className={styles.recipeProperty}>
                {semanticSpacingPxForMode(item.cssVar, mode)}
                {row?.responsive
                  ? ` (M ${row.mobile} · T ${row.tablet} · D ${row.desktop})`
                  : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpacingPageContent() {
  const { theme } = useShowcaseTheme();
  const { query } = useShowcaseSearch();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewGridColumns =
    buttonShowcaseGridColumnsForViewportWidth(previewWidth);
  const typographyMode = typographyModeForWidth(previewWidth);

  const candidates = useMemo(() => [...ALIAS_SPACE, ...BRAND_SCALE], []);
  const { values } = useResolvedTokens(candidates);

  const usageTokens = useMemo(
    () =>
      TOKEN_USAGE_SAMPLE.filter((row) => !row.token.includes("·")).map(
        (row) => row.token,
      ),
    [],
  );
  const usageValues = useCssVarValues(usageTokens);

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    ...row,
    value: row.token.includes("·")
      ? "semantic tokens"
      : (usageValues[row.token] ?? "—"),
  }));

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  const searchActive = query.trim().length > 0;
  const q = query.trim().toLowerCase();

  const filteredSemantic = useMemo((): (typeof semanticSpacingMeta)[number][] => {
    if (!searchActive) return [...semanticSpacingMeta];
    return semanticSpacingMeta.filter(
      (row: (typeof semanticSpacingMeta)[number]) =>
        row.figma.toLowerCase().includes(q) ||
        row.cssVar.toLowerCase().includes(q),
    );
  }, [q, searchActive]);

  const semanticTables = useMemo(() => {
    return SPACING_SHOWCASE_GROUPS.map((group) => {
      const rows = spacingMetaForGroup(group.id).filter((row) =>
        filteredSemantic.includes(row),
      );
      if (rows.length === 0) return null;

      const tableRows = rows
        .map((row) => {
          const computed = semanticSpacingPxForMode(row.cssVar, typographyMode);
          return {
            token: row.cssVar,
            value: row.responsive
              ? `${computed} (${semanticSpacingLabelForMode(row)})`
              : computed,
            preview: <SpacingBar width={computed} />,
            onCopy: () => {
              void navigator.clipboard.writeText(tokenVarRef(row.cssVar)).then(
                () => handleCopy(row.cssVar),
                () => undefined,
              );
            },
            copyTitle: `${row.figma} → ${row.cssVar}`,
          };
        })
        .sort((a, b) => spacingPx(b.value) - spacingPx(a.value));

      return {
        key: group.id,
        caption: `${group.title} (${rows.length})`,
        children: <ShowcaseTokenTable rows={tableRows} showPreview />,
      };
    }).filter((table): table is NonNullable<typeof table> => table !== null);
  }, [filteredSemantic, typographyMode]);

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

  const filteredCount = useMemo(() => {
    const all = [
      ...semanticSpacingMeta.map((r) => r.cssVar),
      ...ALIAS_SPACE,
      ...BRAND_SCALE,
    ];
    if (!searchActive) return all.length;
    return all.filter((token) => token.toLowerCase().includes(q)).length;
  }, [q, searchActive]);

  const livePreviewCode = useMemo(() => {
    const lines = [
      "/* Semantic spacing @ " + previewWidth + "px */",
      "padding-inline: var(--spacing-section-x);",
      "gap: var(--spacing-section-y-default);",
      "padding: var(--spacing-card-medium);",
      "gap: var(--spacing-gap-lg); /* між кнопками */",
      "min-height: var(--spacing-button-height);",
      "padding-inline: var(--spacing-button-px);",
    ];
    return lines.join("\n");
  }, [previewWidth]);

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied var({copiedToken})!
        </p>
      ) : null}

      <ShowcaseDocPage
        title="Spacing"
        description="Semantic spacing Prytula DS (responsive) + static Alias --space-* і Brand Scale."
        status="stable"
        updatedAt="2026-06-04"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Перемикачі ширини — px semantic токенів змінюються як у Figma (Mobile / Tablet / Desktop)."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · ${typographyMode} · grid=${previewGridColumns} col · @media ${typographyBreakpoints.tabletMin} / ${typographyBreakpoints.desktopMin}.`}
            code={livePreviewCode}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            previewFrameWidth={previewWidth}
          >
            <SpacingLayoutDemo previewWidth={previewWidth} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          title="Spacing gallery"
          description="Semantic — responsive; Alias/Brand — статичні px. Клік — копіює var(--token)."
        >
          {searchActive ? (
            <p className={styles.searchCount} aria-live="polite">
              Знайдено {filteredCount} токенів
            </p>
          ) : null}

          {semanticTables.length > 0 ? (
            <div className={styles.galleryGroup}>
              <div className={styles.slotToolbar}>
                <p className={styles.slotCaption}>Semantic spacing (responsive)</p>
              </div>
              <p className={styles.slotHint}>
                Figma Semantic · Mobile &lt; {typographyBreakpoints.tabletMin} ·
                Tablet · Desktop {typographyBreakpoints.desktopMin}+ — Value =
                px для активної ширини preview (або M · T · D для static).
              </p>
              <ShowcaseTablesRow tables={semanticTables} />
            </div>
          ) : null}

          {aliasRows.length > 0 || brandRows.length > 0 ? (
            <ShowcaseTablesRow
              tables={[
                ...(aliasRows.length > 0
                  ? [
                      {
                        key: "alias",
                        caption: "Alias spacing — static (legacy layout)",
                        children: <ShowcaseTokenTable rows={aliasRows} showPreview />,
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
                              Low-level Scale/* — джерело для semantic size/* steps.
                              У компонентах — --spacing-* або --space-*.
                            </p>
                            <ShowcaseTokenTable rows={brandRows} showPreview />
                          </>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          ) : null}

          {searchActive &&
          semanticTables.length === 0 &&
          aliasRows.length === 0 &&
          brandRows.length === 0 ? (
            <p className={styles.searchEmpty}>Нічого не знайдено за запитом «{query}».</p>
          ) : null}
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Responsive semantic tokens і статична шкала."
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
              "Мінімальний hit target — 24×24px; button-height semantic = 56px на всіх breakpoints.",
              "Не стискай section-y нижче mobile-значення без дизайн-рішення.",
              "Консистентні section-y-default / gap-2xl полегшують сканування сторінки.",
              "padding-inline узгоджуй з --spacing-section-x (не raw px).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --spacing-* для layout (section, card, gap, button)",
              "Перемикай viewport у preview — перевір mobile/tablet/desktop px",
              "Alias --space-* — лише де ще немає semantic аналога",
            ]}
            dont={[
              "НЕ задавай margin/padding у px у нових компонентах",
              "НЕ плутай static --space-medium з --spacing-card-medium",
              "НЕ використовуй --pryt-brand-scale-* напряму",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            links={[
              { label: "Typography", path: "typography" },
              { label: "Grid", path: "grid" },
              { label: "Button", path: "button" },
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
