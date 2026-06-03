import { useMemo, useState } from "react";
import { DirectionsExternalLinks } from "../../design-system/DirectionsExternalLinks";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  type ShowcaseDocSizeOption,
  SHOWCASE_DOC_SIZE_OPTIONS_TWO,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./DirectionsExternalLinksShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7303";

const LIVE_PREVIEW_CODE = `import { DirectionsExternalLinks } from "@/design-system/DirectionsExternalLinks";

<DirectionsExternalLinks
  index="01"
  title="Допомога військовим"
  href="/directions/military"
  size="desktop"
/>`;

const DEMO_ITEMS = [
  { index: "01", title: "Допомога військовим", href: "#military" },
  { index: "02", title: "Гуманітарний напрям", href: "#humanitarian" },
  { index: "03", title: "Медичний напрям", href: "#medical" },
];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "index",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Номер рядка (01, 02, …).",
  },
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Заголовок напряму.",
  },
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "URL посилання (<a href>).",
  },
  {
    property: "size",
    type: '"desktop" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Desktop 96px / mobile 64px min-height; різні font-size та icon.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "color", token: "--text-default" },
  { element: "Root", property: "border", token: "--border-strong" },
  { element: "Hover", property: "background", token: "--pryt-brand-orange-200" },
  { element: "Desktop index", property: "font-size", token: "--font-size-numbers-section" },
  { element: "Desktop title", property: "font-size", token: "--font-size-heading-h3" },
  { element: "Mobile title", property: "font-size", token: "--font-size-heading-h4" },
  { element: "Root", property: "padding", token: "--space-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function DirectionsExternalLinksShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewSize, setPreviewSize] = useState<ShowcaseDocSizeOption>("desktop");

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
        title="Directions External Links"
        description="Рядок-посилання на зовнішній напрям: номер, display-заголовок, Arrow-Up-Right."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Desktop row — типовий елемент списку напрямів."
        >
          <ShowcaseDocLivePreview
            caption={`size=${previewSize} · index="01" · hover — CSS.`}
            code={LIVE_PREVIEW_CODE}
            constrainWidth
            previewSize={previewSize}
            onPreviewSizeChange={setPreviewSize}
            previewSizeOptions={SHOWCASE_DOC_SIZE_OPTIONS_TWO}
          >
            <DirectionsExternalLinks
              index="01"
              title="Допомога військовим"
              href="#military"
              size={previewSize as "desktop" | "mobile"}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Desktop list — stacked rows."
        >
          <ShowcasePreview className={styles.list}>
            {DEMO_ITEMS.map((item) => (
              <DirectionsExternalLinks key={item.index} {...item} size="desktop" />
            ))}
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Hover --pryt-brand-orange-200 — brand token (немає Alias); TODO
            mapped hover-list-row.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Нативний <a href> — семантичне посилання.",
              "Іконка Arrow-Up-Right — aria-hidden.",
              "Зовнішні URL: target=\"_blank\" rel=\"noopener noreferrer\" з батька.",
              "Focus-visible: outline --border-focus.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Список напрямів на лендингу — колонка рядків",
              "Коректний href; зовнішні — target + rel",
              "Групуй рядки — бордери зливаються в список",
            ]}
            dont={[
              "Не плутай з LinkCard (pill + 3D)",
              "Не додавай variant/state props",
              "Не хардкодуй жовтий hover поза --pryt-brand-orange-200",
            ]}
            alternatives={[
              { label: "Link Card", path: "link-card", note: "pill + illustration" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Link Card", path: "link-card" }]}
            usedWith={[{ label: "Sub Page Hero", path: "sub-page-hero" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function DirectionsExternalLinksShowcase() {
  return (
    <ShowcaseThemeProvider>
      <DirectionsExternalLinksShowcasePage />
    </ShowcaseThemeProvider>
  );
}
