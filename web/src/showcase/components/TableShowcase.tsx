import { useMemo, useState } from "react";
import { Table, TableCell, type TableSortDirection } from "../../design-system/Table";
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
import { TABLE_DEMO_ROWS, type TableDemoRow } from "./tableDemoData";
import styles from "./TableShowcase.module.css";

const FIGMA_CELL_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1261-29159";
const FIGMA_TABLE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1256-30342";
const FIGMA_TABLE_TABLET_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1296-30588";

const LIVE_PREVIEW_CODE = `import { Table } from "@/design-system/Table";

<Table
  columns={columns}
  rows={rows}
  getRowKey={(row) => row.id}
  sortColumnId={sortColumnId}
  sortDirection={sortDirection}
  onSortChange={(id, dir) => { /* … */ }}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "columns",
    type: "TableColumn<T>[]",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Конфігурація колонок: header, width/flex, align, emphasis, sortable, iconCell.",
  },
  {
    property: "rows",
    type: "T[]",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Дані рядків; значення через column.accessor.",
  },
  {
    property: "getRowKey",
    type: "(row, index) => string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Стабільний ключ для React list.",
  },
  {
    property: "sortColumnId / sortDirection",
    type: "string | null · asc | desc | null",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Керований стан сортування для sortable колонок.",
  },
  {
    property: "onSortChange",
    type: "(columnId, direction) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Цикл desc → asc → null; Table сортує `rows` за accessor активної колонки.",
  },
  {
    property: "onPhotosClick / onDocumentClick",
    type: "(row) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Обробники для iconCell колонок.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Header cell", property: "background", token: "--action-primary" },
  { element: "Header cell", property: "color", token: "--text-on-inverse" },
  { element: "Header border", property: "border-color", token: "--border-on-inverse" },
  { element: "Even row", property: "background", token: "--surface-default" },
  { element: "Odd row", property: "background", token: "--bg-subtle-neutral" },
  { element: "Body border", property: "border-color", token: "--border-default" },
  { element: "Cell padding", property: "padding-inline", token: "--space-small" },
  { element: "Cell padding", property: "padding-block", token: "--spacing-button-py" },
  { element: "Caption", property: "font-size", token: "--font-size-caption" },
  { element: "Sort icon", property: "color", token: "--text-on-inverse-muted" },
  { element: "Action icons", property: "color", token: "--icon-default" },
] as const;

const TABLE_COLUMNS = [
  {
    id: "date",
    header: "Дата",
    width: 120,
    sortable: true,
    accessor: (row: TableDemoRow) => row.date,
  },
  {
    id: "product",
    header: "Найменування товару",
    width: 232,
    emphasis: true,
    accessor: (row: TableDemoRow) => row.productName,
  },
  {
    id: "category",
    header: "Категорія майна",
    flex: true,
    accessor: (row: TableDemoRow) => row.category,
  },
  {
    id: "price",
    header: "Вартість, грн",
    width: 136,
    align: "right" as const,
    sortable: true,
    accessor: (row: TableDemoRow) => row.unitPrice,
  },
  {
    id: "qty",
    header: "К-сть",
    width: 88,
    align: "right" as const,
    sortable: true,
    accessor: (row: TableDemoRow) => row.quantity,
  },
  {
    id: "total",
    header: "Сума, грн",
    width: 116,
    align: "right" as const,
    emphasis: true,
    sortable: true,
    accessor: (row: TableDemoRow) => row.total,
  },
  {
    id: "project",
    header: "Проєкт/Збір",
    flex: true,
    accessor: (row: TableDemoRow) => row.project,
  },
  {
    id: "department",
    header: "Відомство",
    flex: true,
    accessor: (row: TableDemoRow) => row.department,
  },
  {
    id: "subdivision",
    header: "Підрозділ",
    flex: true,
    accessor: (row: TableDemoRow) => row.subdivision,
  },
  {
    id: "photo",
    header: "Фото видачі",
    width: 70,
    iconCell: "photos" as const,
  },
  {
    id: "document",
    header: "Акт видачі",
    width: 70,
    iconCell: "document" as const,
  },
];

function TableShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const previewWidth = showcaseViewportWidth(previewViewportId);
  const [sortColumnId, setSortColumnId] = useState<string | null>("date");
  const [sortDirection, setSortDirection] = useState<TableSortDirection | null>("desc");

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
        title="Table"
        description="Таблиця даних з header, zebra-рядками, сортуванням та icon-колонками (Figma Cell 1261:29159, Desktop 1256:30342, Tablet 1296:30588)."
        status="stable"
        version="1.0"
        updatedAt="2026-06-05"
        figmaUrl={FIGMA_TABLE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Desktop (≥1024px container): горизонтальна сітка. Tablet/mobile (<1024px): label + value на рядок (Figma 1296:30588)."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · ${previewWidth >= 1024 ? "desktop grid" : `tablet stack · ${FIGMA_TABLE_TABLET_URL.split("node-id=")[1]}`}`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
            previewClassName={styles.livePreviewPanel}
          >
            <div className={styles.livePreviewInset}>
              <Table
                columns={TABLE_COLUMNS}
                rows={TABLE_DEMO_ROWS}
                getRowKey={(row) => row.id}
                sortColumnId={sortColumnId}
                sortDirection={sortDirection}
                onSortChange={(columnId, direction) => {
                  setSortColumnId(direction ? columnId : null);
                  setSortDirection(direction);
                }}
              />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          title="Cell variants"
          description={`Figma Cell (1261:29159) — Header, Odd/Even, Main (bold). ${FIGMA_CELL_URL}`}
        >
          <div className={styles.cellMatrix}>
            <div>
              <p className={styles.cellRowLabel}>Header</p>
              <div className={styles.cellRow}>
                <TableCell variant="header" width={120} sortable>
                  Title
                </TableCell>
              </div>
            </div>
            <div>
              <p className={styles.cellRowLabel}>Even · Even Main</p>
              <div className={styles.cellRow}>
                <TableCell variant="even" width={120}>
                  Text
                </TableCell>
                <TableCell variant="even-main" width={120}>
                  Text
                </TableCell>
              </div>
            </div>
            <div>
              <p className={styles.cellRowLabel}>Odd · Odd Main</p>
              <div className={styles.cellRow}>
                <TableCell variant="odd" width={120}>
                  Text
                </TableCell>
                <TableCell variant="odd-main" width={120}>
                  Text
                </TableCell>
              </div>
            </div>
          </div>
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
              "Корінь — `role=\"table\"` + `aria-label`.",
              "Header cells — `role=\"columnheader\"`, body — `role=\"cell\"`.",
              "Sortable header — `<button>` з `aria-pressed`; цикл desc → asc → null.",
              "Icon actions — окремі кнопки з описовим `aria-label`.",
              "Desktop: горизонтальний scroll через `overflow-x: auto` на `.root`.",
              "Tablet/mobile (<1024px container): compact layout — labels 120px + values; без header row.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Використовуйте `emphasis: true` для ключових колонок (назва, сума)",
              "Sortable колонки — dual-arrow іконка: default → desc → asc → default",
              "Icon columns — `iconCell: \"photos\" | \"document\"` + click handlers",
              "Fluid колонки — `flex: true` без фіксованої width",
              "Поєднуйте з Pagination для великих наборів даних",
            ]}
            dont={[
              "Не хардкодьте #fafafa / black — `--bg-subtle-neutral` / `--action-primary`",
              "Не дублюйте padding 10px — `--spacing-button-py`",
              "Не вставляйте `<img>` для іконок — `IconPhotos` / `IconDocumentView`",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Pagination", path: "pagination" },
              { label: "Sort Control", path: "sort-control" },
            ]}
            usedWith={[
              { label: "General Widget", path: "general-widget" },
              { label: "Icons", path: "icons" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function TableShowcase() {
  return (
    <ShowcaseThemeProvider>
      <TableShowcasePage />
    </ShowcaseThemeProvider>
  );
}
