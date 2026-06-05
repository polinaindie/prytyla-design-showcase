import { useMemo, useState } from "react";
import { Pagination } from "../../design-system/Pagination";
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
import styles from "./PaginationShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1256-30605";

const DEMO_TOTAL_ITEMS = 1935;
const DEMO_PAGE_SIZE = 15;

const LIVE_PREVIEW_CODE = `import { Pagination } from "@/design-system/Pagination";

<Pagination
  page={1}
  totalItems={1935}
  pageSize={15}
  onPageChange={(page) => setPage(page)}
  onPageSizeChange={(size) => setPageSize(size)}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "page",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "1",
    description: "Поточна сторінка (1-based).",
  },
  {
    property: "totalItems",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Усього записів у списку.",
  },
  {
    property: "pageSize",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "15",
    description: "Записів на сторінці; синхронізується з dropdown.",
  },
  {
    property: "pageSizeOptions",
    type: "number[]",
    typeKind: "TEXT",
    optionsDefault: "[10, 15, 25, 50]",
    description: "Опції в селекті «записів на сторінці».",
  },
  {
    property: "onPageChange",
    type: "(page: number) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Prev / next / номер сторінки / jump.",
  },
  {
    property: "onPageSizeChange",
    type: "(pageSize: number) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Зміна page size.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Status muted", property: "color", token: "--text-muted" },
  { element: "Status strong", property: "color", token: "--text-default" },
  { element: "Nav button", property: "height", token: "--size-2xlarge" },
  { element: "Nav active", property: "border", token: "--border-strong" },
  { element: "Nav disabled", property: "color", token: "--text-disabled" },
  { element: "Jump / page size field", property: "height", token: "--size-xlarge" },
  { element: "Jump / page size field", property: "border", token: "--border-default" },
  { element: "Jump / page size field", property: "background", token: "--surface-default" },
  { element: "Jump / page size field", property: "radius", token: "--radius-medium" },
  { element: "Layout gaps", property: "gap", token: "--space-xlarge" },
  { element: "Page list gap", property: "gap", token: "--space-3xsmall" },
  { element: "Copy", property: "font-size", token: "--font-size-body-small" },
] as const;

function PaginationShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEMO_PAGE_SIZE);

  const previewWidth = showcaseViewportWidth(previewViewportId);

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
        title="Pagination"
        description="Пагінація таблиць і списків: responsive desktop / tablet (Figma 1256:30605, 1291:32537)."
        status="stable"
        version="1.0"
        updatedAt="2026-06-04"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Mobile: компактний статус. Tablet/desktop: див. guidelines. Перемкніть viewport."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · інтерактивна пагінація.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            scrollablePreview
            flush
            previewClassName={styles.livePreviewPanel}
          >
            <Pagination
              page={page}
              totalItems={DEMO_TOTAL_ITEMS}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Корінь — `<nav aria-label=\"Пагінація\">`.",
              "Група сторінок — `role=\"group\"` + `aria-label=\"Сторінки\"`.",
              "Поточна сторінка — `aria-current=\"page\"` на NavBatton.",
              "Prev/next — `aria-label` (без видимого тексту).",
              "Jump input — `<label>` + `aria-label`; submit по Enter.",
              "Page size — `<select aria-label=\"…\">`.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Керований `page` + `onPageChange` разом із даними таблиці",
              "Після зміни pageSize скидайте на сторінку 1",
              "NavBatton — через `Button variant=\"nav\"`",
              "Tablet (768–1023px): «Відображено» + page size зверху (Figma 1291:32537)",
              "Mobile (≤767px): лише «1-15 записів з N», без «Відображено» (Figma 1296:30331)",
            ]}
            dont={[
              "Не дублюйте логіку ellipsis — використовуйте `buildPaginationItems`",
              "Не хардкодьте 36px / 32px — `--size-2xlarge` / `--size-xlarge`",
              "Не вставляйте пагінацію без статусу «Відображено …»",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Button", path: "button" }]}
            usedWith={[
              { label: "Sort Control", path: "sort-control" },
              { label: "General Widget", path: "general-widget" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function PaginationShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PaginationShowcasePage />
    </ShowcaseThemeProvider>
  );
}
