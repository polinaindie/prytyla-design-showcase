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
  ShowcaseThemeProvider,
  figmaComponentSizeBinaryForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseDocSwitchOption,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./LinkCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=40-12193";

const LIVE_PREVIEW_CODE_INTERNAL = `import { LinkCard } from "@/design-system/LinkCard";

<LinkCard
  href="/reports"
  title="Звітність фонду"
  illustration="annualReports"
  size="desktop"
/>`;

const LIVE_PREVIEW_CODE_EXTERNAL = `import { LinkCard } from "@/design-system/LinkCard";

<LinkCard
  href="https://registry.example.gov.ua/foundation-reports"
  target="_blank"
  rel="noopener noreferrer"
  external
  title="Публічний реєстр звітності"
  illustration="statistic"
  size="desktop"
/>`;

const PREVIEW_LINK_OPTIONS = [
  { value: "internal", label: "Внутрішнє" },
  { value: "external", label: "Зовнішнє" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

type LinkCardPreviewLink = (typeof PREVIEW_LINK_OPTIONS)[number]["value"];

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
  {
    property: "external",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description:
      "Desktop: Icon/40/Arrow-Up-Right + діагональна анімація (знизу-ліворуч → вгору-праворуч).",
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
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [previewLinkKind, setPreviewLinkKind] =
    useState<LinkCardPreviewLink>("internal");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewSize = figmaComponentSizeBinaryForViewportWidth(previewWidth);
  const isExternal = previewLinkKind === "external";
  const livePreviewCode = isExternal
    ? LIVE_PREVIEW_CODE_EXTERNAL
    : LIVE_PREVIEW_CODE_INTERNAL;

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
          description="Ширина frame — Wide desktop … Mobile; перемикач Внутрішнє / Зовнішнє; Figma size desktop|mobile підбирається автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · link=${previewLinkKind} · size=${previewSize} · hover — CSS.`}
            code={livePreviewCode}
            previewValue={previewLinkKind}
            onPreviewValueChange={(value) =>
              setPreviewLinkKind(value as LinkCardPreviewLink)
            }
            previewLabeledOptions={PREVIEW_LINK_OPTIONS}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <div className={styles.livePreviewSlot}>
              {isExternal ? (
                <LinkCard
                  href="https://registry.example.gov.ua/foundation-reports"
                  target="_blank"
                  rel="noopener noreferrer"
                  external
                  title={
                    previewSize === "mobile"
                      ? "Реєстр звітності"
                      : "Публічний реєстр звітності"
                  }
                  illustration="statistic"
                  size={previewSize as "desktop" | "mobile"}
                />
              ) : (
                <LinkCard
                  href="#"
                  title={
                    previewSize === "mobile" ? "Звітність" : "Звітність фонду"
                  }
                  illustration="annualReports"
                  size={previewSize as "desktop" | "mobile"}
                />
              )}
            </div>
          </ShowcaseDocLivePreview>
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
              "Стрілка desktop — aria-hidden; internal — Arrow-Right (→), external — Arrow-Up-Right (↗).",
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
