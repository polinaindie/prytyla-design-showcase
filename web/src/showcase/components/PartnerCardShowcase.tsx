import { useMemo, useState } from "react";
import { PartnerCard } from "../../design-system/PartnerCard";
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
  ShowcasePreview,
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./PartnerCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7139";

const LOGO_SICH = "/showcase/partner-logo-sich.png";
const LOGO_DILA = "/showcase/partner-logo-dila.png";

const LIVE_PREVIEW_CODE = `import { PartnerCard } from "@/design-system/PartnerCard";

<PartnerCard
  type="info"
  logoSrc="/showcase/partner-logo-sich.png"
  logoAlt="SICH Tourniquet"
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "type",
    type: '"info" | "main" | "project" | "projects"',
    typeKind: "VARIANT",
    optionsDefault: '"info"',
    description: "Figma Type: темна info, accent main, warm project/projects.",
  },
  {
    property: "logoSrc / logoAlt",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "PNG/SVG логотип; object-fit: contain.",
  },
  {
    property: "logo",
    type: "ReactNode",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Замість img — напр. PartnerLogo.",
  },
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Якщо задано — рендер <a>.",
  },
  {
    property: "selected",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Активний стан у сітці Partners (info).",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "type=info", property: "background", token: "--surface-section-dark" },
  {
    element: "info hover / selected",
    property: "background",
    token: "--surface-card-dark-elevated",
  },
  { element: "type=info", property: "border", token: "--border-dark" },
  { element: "info hover", property: "border", token: "--border-muted" },
  { element: "type=main", property: "background", token: "--bg-subtle-accent" },
  { element: "type=main", property: "border", token: "--accent-secondary" },
  { element: "type=project(s)", property: "background", token: "--surface-page" },
  { element: "type=project(s)", property: "border", token: "--border-default" },
  { element: "Root", property: "border-radius", token: "--radius-small" },
  { element: "Corners", property: "size", token: "--space-medium" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function PartnerCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

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
        title="Partner Card"
        description="Картка партнера з декоративною кутовою рамкою; чотири type-варіанти для темних і світлих секцій."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — перемикай у toolbar (Wide desktop … Mobile); type=info на темному фоні."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · type=info · 212×116px fixed slot · hover — наведи курсор.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <div className={styles.livePreviewSlot}>
              <PartnerCard
                type="info"
                selected
                logoSrc={LOGO_SICH}
                logoAlt="SICH Tourniquet"
              />
              <PartnerCard type="info" logoSrc={LOGO_DILA} logoAlt="Діла" />
              <PartnerCard type="info" logoSrc={LOGO_SICH} logoAlt="SICH Tourniquet" />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Info на темному · main / projects / project на світлому."
        >
          <p className={styles.galleryCaption}>type=info (dark)</p>
          <ShowcasePreview className={styles.previewDark}>
            <div className={styles.row}>
              <p className={styles.rowLabel}>Default</p>
              <PartnerCard type="info" logoSrc={LOGO_SICH} logoAlt="SICH Tourniquet" />
            </div>
            <div className={styles.row}>
              <p className={styles.rowLabel}>Hover</p>
              <PartnerCard
                type="info"
                logoSrc={LOGO_SICH}
                logoAlt="SICH Tourniquet"
                aria-label="SICH — наведіть для hover"
              />
            </div>
            <div className={styles.row}>
              <p className={styles.rowLabel}>Selected</p>
              <PartnerCard
                type="info"
                selected
                logoSrc={LOGO_SICH}
                logoAlt="SICH Tourniquet"
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>main · projects · project (light)</p>
          <ShowcasePreview className={styles.preview}>
            <ShowcaseMatrix
              columns={["Default", "Hover (наведіть курсор)"]}
              rows={[
                {
                  rowLabel: "main",
                  cells: [
                    <PartnerCard key="m-d" type="main" logoSrc={LOGO_DILA} logoAlt="Діла" />,
                    <PartnerCard key="m-h" type="main" logoSrc={LOGO_DILA} logoAlt="Діла" />,
                  ],
                },
                {
                  rowLabel: "projects",
                  cells: [
                    <PartnerCard
                      key="p-d"
                      type="projects"
                      logoSrc={LOGO_DILA}
                      logoAlt="Діла"
                    />,
                    <PartnerCard
                      key="p-h"
                      type="projects"
                      logoSrc={LOGO_DILA}
                      logoAlt="Діла"
                    />,
                  ],
                },
                {
                  rowLabel: "project",
                  cells: [
                    <PartnerCard
                      key="pr-d"
                      type="project"
                      logoSrc={LOGO_DILA}
                      logoAlt="Діла"
                    />,
                    <PartnerCard
                      key="pr-h"
                      type="project"
                      logoSrc={LOGO_DILA}
                      logoAlt="Діла"
                    />,
                  ],
                },
              ]}
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="sizes" description="Figma 212×116px; фіксований слот логотипу.">
          <ShowcasePreview className={styles.preview}>
            <PartnerCard type="main" logoSrc={LOGO_DILA} logoAlt="Діла" />
          </ShowcasePreview>
          <p className={styles.note}>
            Ширина/висота root — 13.25rem × 7.25rem; logo max 142×79px. TODO: size tokens
            якщо зʼявляться у Figma.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            type=main hover: border-width 3px — Figma border-3; TODO token.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Hover лише CSS (@media hover: hover).",
              "info: збільшення --partner-corner до --space-large, elevated фон.",
              "selected на info — той самий вигляд, що hover (сітка Partners).",
              "main: hover — border 3px (accent-secondary).",
              "project/projects: hover — --border-dark на warm panel.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="examples" description="Клікабельна картка з href.">
          <ShowcasePreview className={styles.preview}>
            <PartnerCard
              type="projects"
              href="https://example.com"
              logoSrc={LOGO_DILA}
              logoAlt="Діла"
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "logoAlt обовʼязковий для <img>; декоративна рамка aria-hidden.",
              "href → семантичний <a>; без href — <div> у сітці.",
              "Focus-visible: --border-focus.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "type відповідає секції: info на темному, main/projects на warm",
              "logoSrc — прозорий PNG/SVG, object-fit: contain",
              "href + target=_blank для зовнішніх партнерів",
              "selected у каруселі Partners",
            ]}
            dont={[
              "Не хардкодьте warm/dark кольори",
              "Не замінюйте corner frame простим border",
              "Не плутайте з Memorandum Partner Card",
            ]}
            alternatives={[
              {
                label: "Memorandum Partner Card",
                path: "memorandum-partner-card",
                note: "без кутової рамки",
              },
              { label: "Partner Logo", path: "partner-logo", note: "слот логотипу" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Partner Logo", path: "partner-logo" },
              { label: "Memorandum Partner Card", path: "memorandum-partner-card" },
            ]}
            usedWith={[{ label: "Partners", path: "partners" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function PartnerCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PartnerCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
