import { useMemo, useState } from "react";
import { CategoryDistributionChart } from "../../design-system/CategoryDistributionChart";
import { DepartmentDistributionChart } from "../../design-system/DepartmentDistributionChart";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import {
  CATEGORY_DEMO_ROWS,
  DEPARTMENT_DEMO_ROWS,
} from "./impactStatisticsDemoData";
import { ImpactStatisticsColorRules } from "./ImpactStatisticsColorRules";
import styles from "./ImpactStatisticsShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1272-28692";

const LIVE_PREVIEW_CODE = `import { CategoryDistributionChart } from "@/design-system/CategoryDistributionChart";
import { DepartmentDistributionChart } from "@/design-system/DepartmentDistributionChart";

<div className={styles.pair}>
  <CategoryDistributionChart rows={categoryRows} />
  <DepartmentDistributionChart rows={departmentRows} />
</div>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "rows",
    type: "DistributionChartRow[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "label, value, sharePercent?, segments? (category only).",
  },
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "category / department default UA title",
    description: "Заголовок картки.",
  },
  {
    property: "axisMax",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "500_000_000",
    description: "Максимум шкали (Figma 500M UAH).",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Card", property: "background", token: "--surface-default" },
  { element: "Card", property: "border", token: "--border-default" },
  { element: "Card", property: "radius", token: "--radius-large" },
  { element: "Card", property: "padding-x", token: "--space-chart-card-x" },
  { element: "Card", property: "padding-y", token: "--space-3xlarge" },
  { element: "Card", property: "title gap", token: "--spacing-gap-hero-heading" },
  { element: "Title", property: "font-size", token: "--font-size-body-large" },
  { element: "Row label", property: "font-size", token: "--font-size-caption" },
  { element: "Value / share", property: "font-size", token: "--font-size-numbers-tiny" },
  { element: "Axis tick", property: "font-size", token: "--font-size-numbers-tiny" },
  { element: "Tooltip header", property: "font-size", token: "--font-size-caption" },
  { element: "Bar", property: "height", token: "--size-chart-bar" },
  {
    element: "Category bars",
    property: "fill",
    token: "--pryt-brand-chart-brown-*",
  },
  {
    element: "Department bars",
    property: "fill",
    token: "--pryt-brand-chart-blue-*",
  },
  { element: "Tooltip", property: "shadow", token: "--shadow-popover" },
] as const;

function ImpactStatisticsShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const pairLayout = previewWidth < 1024 ? "column" : "row";

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Impact statistics"
        description="Горизонтальні bar charts: категорії (stacked + tooltip) і відомства (solid blue). Figma Frame 46."
        status="stable"
        version="1.0"
        updatedAt="2026-06-04"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="CategoryDistributionChart + DepartmentDistributionChart · Figma 1272:28692."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · два Impact charts.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            scrollablePreview
            previewClassName={styles.livePreviewPanel}
          >
            <div
              className={styles.pair}
              data-layout={pairLayout}
            >
              <CategoryDistributionChart rows={CATEGORY_DEMO_ROWS} />
              <DepartmentDistributionChart rows={DEPARTMENT_DEMO_ROWS} />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          title="Правила формування кольорів"
          description={`Sage & Olive Matrix + blue palette · Figma 1285:29521.`}
        >
          <ImpactStatisticsColorRules />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Картка: `<article aria-label={title}>`; заголовок — `<h3>`.",
              "Category chart: сегменти stacked — `role=button`, tooltip на hover/focus.",
              "Department chart: суцільні бари без інтерактиву.",
              "Сітка та вісь — `aria-hidden` (декоративні).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "CategoryDistributionChart — breakdown по підкатегоріях + tooltip.",
              "DepartmentDistributionChart — один bar на відомство, blue gradient.",
              "Desktop: два charts в ряд (gap `--space-small`); tablet/mobile — колонка.",
            ]}
            dont={[
              "Не хардкодьте brown/blue hex — лише `--pryt-brand-chart-*` palette.",
              "Не змішуйте variants: department chart без stacked segments.",
              "Не змінюйте порядок brown/blue tokens — він задає ранг рядків.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Progress bar", path: "progress-bar" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function ImpactStatisticsShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ImpactStatisticsShowcasePage />
    </ShowcaseThemeProvider>
  );
}
