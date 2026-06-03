import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  useShowcaseTheme,
} from "../primitives";
import styles from "./RadiusPage.module.css";
import { useCssVarValues, useResolvedTokens } from "./useCssVarValues";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const ALIAS_RADIUS = [
  "--radius-small",
  "--radius-medium",
  "--radius-large",
  "--radius-xlarge",
  "--radius-2xlarge",
  "--radius-round",
] as const;

const ALIAS_BORDER_WIDTH = [
  "--border-width-small",
  "--border-width-medium",
] as const;

const TOKEN_USAGE_SAMPLE = [
  { element: "Card", property: "border-radius", token: "--radius-large" },
  { element: "Pill / chip", property: "border-radius", token: "--radius-round" },
  { element: "Input", property: "border-radius", token: "--radius-medium" },
  { element: "Subtle surface", property: "border-radius", token: "--radius-small" },
  { element: "Card border", property: "border-width", token: "--border-width-small" },
  { element: "Focus ring", property: "outline-width", token: "--border-width-medium" },
] as const;

const RADIUS_PROPERTIES = [
  {
    property: "Border radius",
    type: "alias",
    optionsDefault: "--radius-small … --radius-round",
    description: "Публічні токени заокруглення; --radius-round — literal 9999px у Figma.",
  },
  {
    property: "Border width",
    type: "alias",
    optionsDefault: "--border-width-small | medium",
    description: "Товщина рамок і outline; не плутати з spacing scale.",
  },
  {
    property: "CSS variable",
    type: "string",
    optionsDefault: "var(--radius-medium)",
    description: "Клік по рядку таблиці копіює var(--token).",
  },
  {
    property: "Sort order",
    type: "display",
    optionsDefault: "desc by px",
    description: "У галереї — від найбільшого resolved значення до найменшого.",
  },
];

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function sizePx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
}

function sortByValueDesc(
  tokens: readonly string[],
  values: Record<string, string>,
): string[] {
  return [...tokens]
    .filter((token) => (values[token] ?? "").length > 0)
    .sort((a, b) => sizePx(values[b]!) - sizePx(values[a]!));
}

function RadiusPreview({ value }: { value: string }) {
  return <div className={styles.radiusTile} style={{ borderRadius: value }} />;
}

function BorderWidthPreview({ value }: { value: string }) {
  return (
    <div className={styles.borderWidthTrack}>
      <div className={styles.borderWidthLine} style={{ height: value }} />
    </div>
  );
}

function buildTokenRows(
  tokens: readonly string[],
  values: Record<string, string>,
  onCopy: (token: string) => void,
  renderPreview: (value: string) => ReactNode,
) {
  return sortByValueDesc(tokens, values).map((token) => ({
    token,
    value: values[token]!,
    preview: renderPreview(values[token]!),
    onCopy: () => {
      void navigator.clipboard.writeText(tokenVarRef(token)).then(
        () => onCopy(token),
        () => undefined,
      );
    },
  }));
}

function RadiusPageContent() {
  const { theme } = useShowcaseTheme();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(
    () => [...ALIAS_RADIUS, ...ALIAS_BORDER_WIDTH],
    [],
  );
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

  const radiusRows = useMemo(
    () =>
      buildTokenRows(ALIAS_RADIUS, values, handleCopy, (value) => (
        <RadiusPreview value={value} />
      )),
    [values],
  );

  const borderWidthRows = useMemo(
    () =>
      buildTokenRows(ALIAS_BORDER_WIDTH, values, handleCopy, (value) => (
        <BorderWidthPreview value={value} />
      )),
    [values],
  );

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
        title="Radius"
        description="Заокруглення та товщина рамок Prytula DS. У компонентах — лише --radius-* і --border-width-*."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Radius & border width"
          description="Від найбільшого до найменшого. Клік по токену — копіює var(--token)."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "radius",
                caption: "Border radius",
                children: <ShowcaseTokenTable rows={radiusRows} showPreview />,
              },
              {
                key: "border-width",
                caption: "Border width",
                children: <ShowcaseTokenTable rows={borderWidthRows} showPreview />,
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Alias-токени та типові прив'язки в UI."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "properties",
                caption: "Properties",
                children: <ShowcaseDocPropertiesTable rows={RADIUS_PROPERTIES} />,
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
          description="Радіуси впливають на сприйняття клікабельних зон і контраст країв."
        >
          <ShowcaseDocBulletList
            items={[
              "Достатній border-radius на кнопках полегшує розпізнавання інтерактивних елементів.",
              "Focus outline: --border-width-medium + --border-focus — не зменшуй товщину нижче токена.",
              "Дуже малі радіуси на великих картках можуть виглядати різко — узгоджуй з дизайном.",
              "Контраст border на light surfaces: --border-width-small з --border-default.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDoDont
            do={[
              "--radius-medium для карток",
              "--radius-round для pill-кнопок",
              "--border-width-small для звичайних рамок",
            ]}
            dont={[
              "НЕ задавай border-radius у px напряму",
              "НЕ змішуй довільні px для border-width — лише --border-width-*",
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
              { label: "Typography", path: "typography" },
              { label: "Grid", path: "grid" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function RadiusPage() {
  return (
    <ShowcaseThemeProvider>
      <RadiusPageContent />
    </ShowcaseThemeProvider>
  );
}
