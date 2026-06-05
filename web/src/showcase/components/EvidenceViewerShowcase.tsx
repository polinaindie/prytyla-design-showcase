import { useMemo, useState } from "react";
import {
  EvidenceViewer,
  type EvidenceViewerMode,
  type EvidenceViewerViewportTier,
} from "../../design-system/EvidenceViewer";
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
import styles from "./EvidenceViewerShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1324-36986";

const DEMO_TITLE =
  "Корпус бронежилета класу IV (приклад назви позиції)";

const DOCUMENT_ITEMS = [
  {
    src: "/showcase/news-card-demo.jpg",
    alt: "Авторський договір — сторінка 1",
  },
  {
    src: "/showcase/project-card-demo.jpg",
    alt: "Авторський договір — сторінка 2",
  },
] as const;

const PHOTO_ITEMS = [
  {
    src: "/showcase/main-project-demo.jpg",
    alt: "Фото доказу — дрони",
  },
  {
    src: "/showcase/news-card-demo.jpg",
    alt: "Фото доказу — 2",
  },
] as const;

function evidenceViewerTierForViewport(
  id: ShowcaseViewportId,
): EvidenceViewerViewportTier {
  if (id === "375") return "mobile";
  if (id === "768") return "tablet";
  return "wide";
}

const LIVE_PREVIEW_CODE = `import { EvidenceViewer } from "@/design-system/EvidenceViewer";

<EvidenceViewer
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Корпус бронежилета класу IV"
  mode="document"
  items={items}
  page={page}
  onPageChange={setPage}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "mode",
    type: '"document" | "photo"',
    typeKind: "VARIANT",
    optionsDefault: "required",
    description: "document / photo — double-click або double-tap для zoom.",
  },
  {
    property: "items",
    type: "EvidenceViewerItem[]",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Масив `{ src, alt? }` для пагінації між доказами.",
  },
  {
    property: "open / onClose",
    type: "boolean · () => void",
    typeKind: "TEXT",
    optionsDefault: "open=true",
    description: "Керування модалкою; Escape і клік по backdrop закривають.",
  },
  {
    property: "layout",
    type: '"modal" | "embedded"',
    typeKind: "VARIANT",
    optionsDefault: '"modal"',
    description: "embedded — для showcase / вбудованого превʼю без fixed overlay.",
  },
  {
    property: "page / onPageChange",
    type: "number · (page) => void",
    typeKind: "TEXT",
    optionsDefault: "1",
    description: "1-based індекс поточного доказу.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Backdrop", property: "background", token: "--bg-overlay" },
  { element: "Shell", property: "background", token: "--surface-default" },
  { element: "Viewport", property: "background", token: "--surface-subtle-neutral" },
  { element: "Title", property: "color", token: "--text-default" },
  { element: "Zoom hint", property: "color", token: "--text-muted" },
  { element: "Document stage", property: "border", token: "--border-default" },
  { element: "Nav active", property: "border", token: "--border-strong" },
  { element: "Shell radius", property: "border-radius", token: "--radius-large" },
  { element: "Document stage", property: "border-radius", token: "--radius-medium" },
] as const;

function EvidenceViewerShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [mode, setMode] = useState<EvidenceViewerMode>("document");
  const [page, setPage] = useState(1);

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const items = mode === "document" ? DOCUMENT_ITEMS : PHOTO_ITEMS;

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
        title="Evidence Viewer"
        description="Модальне вікно перегляду доказів (документ / фото) з пагінацією між файлами."
        status="stable"
        version="1.0"
        updatedAt="2026-06-05"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Перемкніть viewport і режим document / photo. Double-click / double-tap для zoom."
        >
          <div className={styles.modeSwitch} role="tablist" aria-label="Режим перегляду">
            {(["document", "photo"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                className={styles.modeBtn}
                data-active={mode === value || undefined}
                aria-selected={mode === value}
                onClick={() => {
                  setMode(value);
                  setPage(1);
                }}
              >
                {value === "document" ? "Document" : "Photo"}
              </button>
            ))}
          </div>

          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · ${mode}.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            scrollablePreview
            flush
            previewClassName={styles.livePreviewPanel}
          >
            <EvidenceViewer
              layout="embedded"
              viewportTier={evidenceViewerTierForViewport(previewViewportId)}
              title={DEMO_TITLE}
              mode={mode}
              items={[...items]}
              page={page}
              onPageChange={setPage}
              onClose={() => setPage(1)}
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
              "Modal layout — `role=\"dialog\"`, `aria-modal`, `aria-labelledby` на заголовок.",
              "Escape закриває; focus на кнопку закриття при відкритті.",
              "Навігація — `<nav aria-label=\"Навігація між доказами\">`.",
              "Поточна сторінка — `aria-current=\"true\"` на індикаторі `1 / N`.",
              "Icon-only кнопки — `aria-label` (перший / попередній / наступний / останній).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Відкривайте з таблиці закупівель по кліку на іконку документа / фото",
              "Передавайте `items` з реальними URL і `alt` для кожного доказу",
              "Double-click / double-tap на фото або документ для zoom",
              "На mobile ховайте текст «попередня» / «наступна» — лише іконки",
            ]}
            dont={[
              "Не використовуйте Table Pagination для галереї доказів",
              "Не хардкодьте scrim — `--bg-overlay`",
              "Не дублюйте NavBatton — `Button variant=\"nav\"`",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Button", path: "button" },
              { label: "Table", path: "table" },
            ]}
            usedWith={[
              { label: "Pagination", path: "pagination" },
              { label: "Icons", path: "icons" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function EvidenceViewerShowcase() {
  return (
    <ShowcaseThemeProvider>
      <EvidenceViewerShowcasePage />
    </ShowcaseThemeProvider>
  );
}
