import { useMemo, useState } from "react";
import { LinkCard } from "../../design-system/LinkCard";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseMatrix,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  type ShowcaseDocSizeOption,
  SHOWCASE_DOC_SIZE_OPTIONS_TWO,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./LinkCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=40-12193";

const LIVE_PREVIEW_CODE = `import { LinkCard } from "@/design-system/LinkCard";

<LinkCard
  href="/reports"
  title="Звітність фонду"
  illustration="annualReports"
  size="desktop"
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Підпис картки.",
  },
  {
    property: "illustration",
    type: "Illustration3DVariant",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "3D-ілюстрація зліва (Illustration3D).",
  },
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "URL посилання (<a>).",
  },
  {
    property: "size",
    type: '"desktop" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Desktop — зі стрілкою; mobile — компактна без стрілки.",
  },
  {
    property: "showIllustration",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "true",
    description: "false — mobile text-only (Menu drawer).",
  },
  {
    property: "titleSize",
    type: '"desktop" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: "from size",
    description: "Override font-size title (Figma mobile-open).",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "color", token: "--accent-primary" },
  { element: "Root", property: "background", token: "rgba(255,255,255,0.6)" },
  { element: "Hover", property: "background", token: "--surface-page" },
  { element: "Desktop title", property: "font-size", token: "--font-size-body-large" },
  { element: "Mobile title", property: "font-size", token: "--font-size-caption" },
  { element: "Desktop", property: "border-radius", token: "--radius-large" },
  { element: "Mobile", property: "border-radius", token: "--radius-medium" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function LinkCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewSize, setPreviewSize] = useState<ShowcaseDocSizeOption>("desktop");

  const tokenKeys = useMemo(
    () =>
      TOKEN_USAGE_SAMPLE.map((row) => row.token).filter((t) => t.startsWith("--")),
    [],
  );

  const usageValues = useCssVarValues(tokenKeys);

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: row.token.startsWith("--")
      ? (usageValues[row.token] ?? "—")
      : row.token,
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Link Card"
        description="Картка-посилання з 3D-ілюстрацією; desktop зі стрілкою, mobile компактна."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Desktop — hover зменшує ілюстрацію та змінює фон."
        >
          <ShowcaseDocLivePreview
            caption={`size=${previewSize} · illustration=annualReports · hover — CSS.`}
            code={LIVE_PREVIEW_CODE}
            previewSize={previewSize}
            onPreviewSizeChange={setPreviewSize}
            previewSizeOptions={SHOWCASE_DOC_SIZE_OPTIONS_TWO}
          >
            <LinkCard
              href="#"
              title={previewSize === "mobile" ? "Звітність" : "Звітність фонду"}
              illustration="annualReports"
              size={previewSize as "desktop" | "mobile"}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default vs Hover на desktop."
        >
          <ShowcaseMatrix
            columns={["Default", "Hover (наведіть курсор)"]}
            rows={[
              {
                cells: [
                  <LinkCard
                    key="d"
                    href="#"
                    title="Звітність фонду"
                    illustration="annualReports"
                    size="desktop"
                  />,
                  <LinkCard
                    key="h"
                    href="#"
                    title="Звітність фонду"
                    illustration="annualReports"
                    size="desktop"
                    aria-label="Звітність — наведіть для hover"
                  />,
                ],
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Default glass rgba(255,255,255,0.6) — approved exception; desktop
            padding використовує --pryt-brand-scale-* (layout).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Нативний <a href> — title як текст посилання.",
              "Стрілка desktop — aria-hidden (декоративна).",
              "Focus-visible: outline --border-focus.",
              "Зовнішні URL: target + rel з батька.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Hover лише CSS — фон --surface-page",
              "Illustration3D variant з каталогу /showcase/illustration-3d",
              "Desktop у сітках звітності; mobile у Menu drawer",
            ]}
            dont={[
              "Не додавай prop state=Hover",
              "Не підставляй raw img замість Illustration3D",
              "Не плутай з Directions External Links (list row)",
            ]}
            alternatives={[
              {
                label: "Directions External Links",
                path: "directions-external-links",
                note: "numbered list row",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Illustration 3D", path: "illustration-3d" },
              {
                label: "Directions External Links",
                path: "directions-external-links",
              },
            ]}
            usedWith={[
              { label: "Menu", path: "menu" },
              { label: "Sub Page Hero", path: "sub-page-hero" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function LinkCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <LinkCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
