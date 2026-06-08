import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  semanticFontSizeMeta,
  typographyBreakpoints,
} from "../../../../design-tokens/dist/tokens";
import {
  ShowcaseDocBulletList,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDoDont,
  ShowcaseDocViewportSwitch,
  ShowcaseTablesRow,
  ShowcaseThemeProvider,
  ShowcaseTokenTable,
  showcaseViewportName,
  showcaseViewportWidth,
  useShowcaseSearch,
  useShowcaseTheme,
  type ShowcaseViewportId,
} from "../primitives";
import {
  showcaseTypographyVars,
  typographyModeForWidth,
  type ShowcaseTypographyMode,
} from "../showcaseTypography";
import shared from "./tokensShared.module.css";
import styles from "./TypographyPage.module.css";
import { useCssVarValues, useResolvedTokens } from "./useCssVarValues";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const FONT_SIZE_CANDIDATES = [
  "--pryt-brand-font-size-100",
  "--pryt-brand-font-size-200",
  "--pryt-brand-font-size-250",
  "--pryt-brand-font-size-300",
  "--pryt-brand-font-size-400",
  "--pryt-brand-font-size-450",
  "--pryt-brand-font-size-500",
  "--pryt-brand-font-size-600",
  "--pryt-brand-font-size-700",
  "--pryt-brand-font-size-800",
  "--pryt-brand-font-size-900",
  "--pryt-brand-font-size-1000",
  "--pryt-brand-font-size-1100",
  "--pryt-brand-font-size-1200",
] as const;

const TOKEN_USAGE_SAMPLE = [
  { element: "Display heading", property: "font-family", token: "--font-display" },
  { element: "Page H1", property: "font-size", token: "--font-size-heading-h1" },
  { element: "Section H2", property: "font-size", token: "--font-size-heading-h2" },
  { element: "Body copy", property: "font-size", token: "--font-size-body-medium" },
  { element: "Caption / meta", property: "font-size", token: "--font-size-caption" },
  { element: "Tab label", property: "font-size", token: "--font-size-tab-label" },
] as const;

const TYPOGRAPHY_PROPERTIES = [
  {
    property: "Semantic font-size",
    type: "responsive token",
    optionsDefault: "--font-size-heading-h1, --font-size-body-medium, …",
    description:
      "Figma Semantic font-size/* · mobile-first у tokens.css (@media 768px / 1024px).",
  },
  {
    property: "Brand font-size",
    type: "primitive",
    optionsDefault: "--pryt-brand-font-size-400 … 1200",
    description: "Legacy шкала з Brand collection — не для нових компонентів.",
  },
  {
    property: "font-display",
    type: "app stack",
    optionsDefault: "Mariupol Strong → Mariupol → Inter",
    description: "Задається в web/src/index.css, не з Figma export.",
  },
  {
    property: "Showcase viewport",
    type: "preview control",
    optionsDefault: "Wide desktop · Desktop · Laptop · Tablet · Mobile",
    description:
      "Перемикачі ширини біля semantic sizes — ті самі, що в live preview компонентів (1920 … 375).",
  },
];

const SIZE_SAMPLE = "Допомога фронту і тилу";

function fontSizeStep(token: string): number {
  return Number(token.replace("--pryt-brand-font-size-", ""));
}

function usesDisplayFont(token: string): boolean {
  if (token.startsWith("--font-size-heading-") || token === "--font-size-tab-label") {
    return true;
  }
  if (token.startsWith("--font-size-numbers-")) {
    return true;
  }
  return fontSizeStep(token) >= 600;
}

function semanticRemForMode(
  row: (typeof semanticFontSizeMeta)[number],
  mode: ShowcaseTypographyMode,
): string {
  if (!row.responsive) return row.mobileRem;
  if (mode === "desktop") return row.desktopRem;
  if (mode === "tablet") return row.tabletRem;
  return row.mobileRem;
}

function semanticPxForMode(
  row: (typeof semanticFontSizeMeta)[number],
  mode: ShowcaseTypographyMode,
): number {
  if (!row.responsive) return row.mobile;
  if (mode === "desktop") return row.desktop;
  if (mode === "tablet") return row.tablet;
  return row.mobile;
}

function formatRemWithPx(rem: string, px: number): string {
  return `${rem} (${px}px)`;
}

function semanticSizeForMode(
  row: (typeof semanticFontSizeMeta)[number],
  mode: ShowcaseTypographyMode,
): string {
  return semanticRemForMode(row, mode);
}

function semanticBreakpointsLabel(row: (typeof semanticFontSizeMeta)[number]): string {
  if (!row.responsive) {
    return formatRemWithPx(row.mobileRem, row.mobile);
  }
  return `${row.mobileRem} · ${row.tabletRem} · ${row.desktopRem} (${row.mobile}px · ${row.tablet}px · ${row.desktop}px)`;
}

function semanticUsesDisplay(figmaName: string): boolean {
  return (
    figmaName.startsWith("font-size/heading-") ||
    figmaName === "font-size/tab-label" ||
    figmaName.startsWith("font-size/numbers-")
  );
}

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function parsePx(value: string): number {
  const remMatch = value.trim().match(/^([\d.]+)rem$/);
  if (remMatch) return Number.parseFloat(remMatch[1]!) * 16;
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
}

function formatResolvedFontSize(value: string): string {
  const remMatch = value.trim().match(/^([\d.]+)rem$/);
  if (!remMatch) return value;
  const px = Number.parseFloat(remMatch[1]!) * 16;
  return formatRemWithPx(value.trim(), px);
}

function filterTokens(tokens: readonly string[], query: string): readonly string[] {
  const q = query.trim().toLowerCase();
  if (!q) return tokens;
  return tokens.filter((token) => token.toLowerCase().includes(q));
}

function TypeSample({
  fontSize,
  display,
}: {
  fontSize: string;
  display: boolean;
}) {
  return (
    <p
      className={`${styles.sizeSample} ${display ? styles.sizeSampleDisplay : styles.sizeSampleBody}`}
      style={{ fontSize }}
    >
      {SIZE_SAMPLE}
    </p>
  );
}

type FamilyCopyProps = {
  token: string;
  label: string;
  onCopy: (token: string) => void;
  children: ReactNode;
};

function FamilyCopyBlock({ token, label, onCopy, children }: FamilyCopyProps) {
  const handleCopyMeta = async () => {
    try {
      await navigator.clipboard.writeText(tokenVarRef(token));
      onCopy(token);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.familyItem}>
      {children}
      <button
        type="button"
        className={styles.familyMetaButton}
        onClick={handleCopyMeta}
        title={`Копіювати ${tokenVarRef(token)}`}
      >
        {label}
      </button>
    </div>
  );
}

function TypographyPageContent() {
  const { theme } = useShowcaseTheme();
  const { query } = useShowcaseSearch();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const typographyMode = typographyModeForWidth(previewWidth);

  const typographyFrameStyle = useMemo(
    () => showcaseTypographyVars(previewWidth) as CSSProperties,
    [previewWidth],
  );

  const candidates = useMemo(() => FONT_SIZE_CANDIDATES, []);
  const { values, resolved: fontSizes } = useResolvedTokens(candidates);

  const usageTokens = useMemo(
    () => TOKEN_USAGE_SAMPLE.map((row) => row.token),
    [],
  );
  const usageValues = useCssVarValues(usageTokens);

  const sortedSizes = useMemo(
    () => [...fontSizes].sort((a, b) => fontSizeStep(b) - fontSizeStep(a)),
    [fontSizes],
  );

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  const semanticRows = useMemo(() => {
    const rows = semanticFontSizeMeta.map((row) => {
      const computed = semanticSizeForMode(row, typographyMode);
      const valueLabel = semanticBreakpointsLabel(row);
      const displayValue = formatRemWithPx(
        computed,
        semanticPxForMode(row, typographyMode),
      );

      return {
        token: row.cssVar,
        value: displayValue,
        preview: (
          <TypeSample
            fontSize={computed}
            display={semanticUsesDisplay(row.figma)}
          />
        ),
        onCopy: () => {
          void navigator.clipboard.writeText(tokenVarRef(row.cssVar)).then(
            () => handleCopy(row.cssVar),
            () => undefined,
          );
        },
        copyTitle: `${row.figma} → ${row.cssVar} (${valueLabel})`,
      };
    });

    return rows.sort((a, b) => parsePx(b.value) - parsePx(a.value));
  }, [typographyMode]);

  const brandRows = useMemo(
    () =>
      sortedSizes.map((token) => ({
        token,
        value: formatResolvedFontSize(values[token]!),
        preview: (
          <TypeSample fontSize={values[token]!} display={usesDisplayFont(token)} />
        ),
        onCopy: () => {
          void navigator.clipboard.writeText(tokenVarRef(token)).then(
            () => handleCopy(token),
            () => undefined,
          );
        },
      })),
    [sortedSizes, values],
  );

  const searchActive = query.trim().length > 0;

  const filteredSemanticRows = useMemo(() => {
    if (!searchActive) return semanticRows;
    const q = query.trim().toLowerCase();
    return semanticRows.filter((row) => row.token.toLowerCase().includes(q));
  }, [query, searchActive, semanticRows]);

  const filteredBrandRows = useMemo(() => {
    if (!searchActive) return brandRows;
    const visible = filterTokens(sortedSizes, query);
    return brandRows.filter((row) => visible.includes(row.token));
  }, [brandRows, query, searchActive, sortedSizes]);

  const filteredCount = useMemo(() => {
    const all = [
      ...semanticFontSizeMeta.map((row) => row.cssVar),
      ...sortedSizes,
    ];
    if (!searchActive) return all.length;
    const q = query.trim().toLowerCase();
    return all.filter((token) => token.toLowerCase().includes(q)).length;
  }, [query, searchActive, sortedSizes]);

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    ...row,
    value: usageValues[row.token] ?? "—",
  }));

  const tablesVisible = filteredSemanticRows.length > 0 || filteredBrandRows.length > 0;

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied var({copiedToken})
        </p>
      ) : null}

      <ShowcaseDocPage
        title="Typography"
        description="Шрифти Prytula DS. Семантичні --font-size-* (Figma Semantic, responsive). Примітиви --pryt-brand-font-size-* — legacy шкала."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Typography gallery"
          description="Сімейства шрифтів і шкали розмірів. Клік по токену — копіює var(--token)."
        >
          {searchActive ? (
            <p className={styles.searchCount} aria-live="polite">
              Знайдено {filteredCount} токенів
            </p>
          ) : null}

          <div className={styles.collectionBlock}>
            <h3 className={styles.collectionTitle}>Font families</h3>
            <div
              className={styles.typographyFrame}
              style={typographyFrameStyle}
              data-showcase-typography={typographyMode}
            >
              <div className={styles.familyBlock}>
                <FamilyCopyBlock
                  token="--font-display"
                  label="Mariupol Strong — var(--font-display)"
                  onCopy={handleCopy}
                >
                  <p className={`${styles.familySample} ${styles.familyDisplay}`}>
                    Подаруй спокій тим, хто захищає
                  </p>
                </FamilyCopyBlock>

                <div className={styles.familyItem}>
                  <p
                    className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightRegular}`}
                  >
                    Підтримка військових — Regular
                  </p>
                  <p className={styles.familyMeta}>Mariupol — font-weight 400</p>
                </div>
                <div className={styles.familyItem}>
                  <p
                    className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightMedium}`}
                  >
                    Підтримка військових — Medium
                  </p>
                  <p className={styles.familyMeta}>Mariupol — font-weight 500</p>
                </div>
                <div className={styles.familyItem}>
                  <p
                    className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightBold}`}
                  >
                    Підтримка військових — Bold
                  </p>
                  <p className={styles.familyMeta}>Mariupol — font-weight 700</p>
                </div>

                <div className={styles.familyItem}>
                  <p className={`${styles.familySample} ${styles.familyInter}`}>
                    Body text uses Inter as fallback
                  </p>
                  <p className={styles.familyMeta}>Inter — Google Fonts CDN</p>
                </div>
              </div>
            </div>
          </div>

          {tablesVisible ? (
            <ShowcaseTablesRow
              tables={[
                ...(filteredSemanticRows.length > 0
                  ? [
                      {
                        key: "semantic",
                        children: (
                          <>
                            <div className={styles.slotToolbar}>
                              <p className={styles.slotCaption}>
                                Semantic font sizes (responsive)
                              </p>
                              <ShowcaseDocViewportSwitch
                                value={previewViewportId}
                                onChange={setPreviewViewportId}
                                aria-label="Ширина preview"
                              />
                            </div>
                            <p className={styles.slotHint}>
                              {showcaseViewportName(previewViewportId)} ({previewWidth}px) ·{" "}
                              {typographyMode} · @media {typographyBreakpoints.tabletMin} /{" "}
                              {typographyBreakpoints.desktopMin} — rem (px) у Value для обраної ширини.
                            </p>
                            <div
                              className={styles.typographyFrame}
                              style={typographyFrameStyle}
                              data-showcase-typography={typographyMode}
                            >
                              <ShowcaseTokenTable
                                rows={filteredSemanticRows}
                                showPreview
                              />
                            </div>
                          </>
                        ),
                      },
                    ]
                  : []),
                ...(filteredBrandRows.length > 0
                  ? [
                      {
                        key: "brand",
                        caption: "Brand font sizes (primitives)",
                        children: (
                          <>
                            <p className={shared.lowLevelNote}>
                              Legacy шкала --pryt-brand-font-size-*. Однакові rem (px) на всіх
                              breakpoints — без панелі «Ширина».
                            </p>
                            <ShowcaseTokenTable rows={filteredBrandRows} showPreview />
                          </>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          ) : null}

          {searchActive && !tablesVisible ? (
            <p className={styles.searchEmpty}>Нічого не знайдено за запитом «{query}».</p>
          ) : null}
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Структура шкал і типові typography-прив'язки."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "properties",
                caption: "Properties",
                children: <ShowcaseDocPropertiesTable rows={TYPOGRAPHY_PROPERTIES} />,
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
          description="Читабельність і ієрархія тексту."
        >
          <ShowcaseDocBulletList
            items={[
              "Ієрархія заголовків: h1 → --font-size-heading-h1, не пропускай рівні без причини.",
              "Body на surface-page: --font-size-body-medium + --text-default.",
              "Мінімальний зручний розмір для основного тексту — не менше body-small без дизайн-рішення.",
              "Line-height за замовчуванням з токенів / компонента — не стискай текст лише зменшенням font-size.",
              "Не покладайтесь лише на font-weight для стану — додавайте колір (--text-muted) або icon.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --font-size-heading-h* / --font-size-body-* для UI тексту",
              "Використовуй --font-display для display-заголовків",
              "Довіряй responsive — не дублюй @media з іншими px без потреби",
            ]}
            dont={[
              "НЕ задавай font-size у px/rem напряму",
              "НЕ підбирай --pryt-brand-font-size-* для нових компонентів, якщо є semantic",
              "НЕ змішуй Mariupol з Inter у одному заголовку",
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

export function TypographyPage() {
  return (
    <ShowcaseThemeProvider>
      <TypographyPageContent />
    </ShowcaseThemeProvider>
  );
}
