import { useMemo, useState } from "react";
import { Partners, PARTNERS_DEMO } from "../../design-system/Partners";
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
  figmaComponentSizeForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./PartnersShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7369";

const LIVE_PREVIEW_CODE = `import { Partners, PARTNERS_DEMO } from "@/design-system/Partners";

<Partners
  size="desktop"
  partners={PARTNERS_DEMO}
  defaultActivePartnerId={PARTNERS_DEMO[0]?.id}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "size",
    type: '"desktop" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Figma Size — layout сітки та банера.",
  },
  {
    property: "partners",
    type: "PartnerItem[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "id, name, description, logoVariant, href.",
  },
  {
    property: "activePartnerId",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Controlled активний партнер.",
  },
  {
    property: "defaultActivePartnerId",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "partners[0].id",
    description: "Початковий партнер (uncontrolled).",
  },
  {
    property: "onActivePartnerChange",
    type: "(id: string) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Callback при зміні активного.",
  },
  {
    property: "title / intro",
    type: "string / ReactNode",
    typeKind: "TEXT",
    optionsDefault: "DEFAULT_*",
    description: "Заголовок H2 і текст сайдбару.",
  },
  {
    property: "allPartnersHref / allPartnersLabel",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"/partners"',
    description: "CTA «Усі партнери».",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Section", property: "background", token: "--surface-section-dark" },
  { element: "Sidebar", property: "color", token: "--text-on-inverse" },
  { element: "Featured banner", property: "background", token: "--bg-badge" },
  { element: "Featured copy", property: "color", token: "--text-default" },
  { element: "CTA", property: "border", token: "--border-inverse" },
  { element: "Selected card", property: "background", token: "--surface-card-dark-elevated" },
  { element: "Title", property: "font-size", token: "--font-size-heading-h2" },
  { element: "Featured title", property: "font-size", token: "--font-size-heading-h3" },
  { element: "Section", property: "padding-block", token: "--space-6xlarge" },
  { element: "Grid", property: "gap", token: "--space-2xlarge" },
] as const;

function PartnersShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const componentSize = figmaComponentSizeForViewportWidth(previewWidth);

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
        title="Partners"
        description="Секція «Наші партнери»: темний фон, сайдбар, featured-банер і сітка PartnerCard."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — перемикай у toolbar; Figma size і typography підбираються автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${componentSize} · PARTNERS_DEMO · width 100%.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <Partners size={componentSize} partners={PARTNERS_DEMO} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Клік PartnerCard type=info → selected + оновлення featured (aria-live).",
              "Uncontrolled: defaultActivePartnerId або перший у списку.",
              "Controlled: activePartnerId + onActivePartnerChange.",
              "Mobile: featured copy під банером; desktop/tablet — поруч.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<section> з <h2> заголовком секції.",
              "Featured <article aria-live=\"polite\"> при зміні партнера.",
              "PartnerCard з href — навігація; без href — button-like grid.",
              "CTA «Усі партнери» — <a href>.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "PartnerCard type=info + selected для активного",
              "PartnerLogo variant у PartnerItem; featuredLogoVariant для банера",
              "PARTNERS_DEMO або власний масив partners",
              "size для responsive макетів",
            ]}
            dont={[
              "Не хардкодьте логотипи в секції",
              "Не дублюйте розмітку — імпортуйте <Partners />",
              "Не MemorandumPartnerCard у цій секції",
            ]}
            alternatives={[
              { label: "Partner Card", path: "partner-card" },
              { label: "Partner Logo", path: "partner-logo" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Partner Card", path: "partner-card" },
              { label: "Partner Logo", path: "partner-logo" },
            ]}
            usedWith={[{ label: "Media Card", path: "media-card" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function PartnersShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PartnersShowcasePage />
    </ShowcaseThemeProvider>
  );
}
