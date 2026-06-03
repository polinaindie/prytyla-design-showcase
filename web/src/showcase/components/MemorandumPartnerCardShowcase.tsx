import { useMemo } from "react";
import { MemorandumPartnerCard } from "../../design-system/MemorandumPartnerCard";
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
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./MemorandumPartnerCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1107-28529";

const DEMO_LOGO = "/showcase/memorandum-partner-logo.png";

const LIVE_PREVIEW_CODE = `import { MemorandumPartnerCard } from "@/design-system/MemorandumPartnerCard";

<MemorandumPartnerCard
  logoSrc="/showcase/memorandum-partner-logo.png"
  logoAlt="Міністерство оборони України"
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "logoSrc",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "URL логотипу партнера меморандуму.",
  },
  {
    property: "logoAlt",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Alt текст логотипу.",
  },
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Якщо задано — рендер <a>.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Default", property: "border", token: "--text-disabled" },
  { element: "Hover", property: "border", token: "--text-secondary" },
  { element: "Hover", property: "background", token: "--surface-default" },
  { element: "Root", property: "padding", token: "--space-medium" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function MemorandumPartnerCardShowcasePage() {
  const { theme } = useShowcaseTheme();

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
        title="Memorandum Partner Card"
        description="Картка партнера меморандумів: проста рамка без corner frame; default прозорий, hover — білий фон."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="На світлому фоні; hover — наведи курсор."
        >
          <ShowcaseDocLivePreview
            caption="max-width 258.6px · logo contain."
            code={LIVE_PREVIEW_CODE}
          >
            <ShowcasePreview className={styles.preview}>
              <MemorandumPartnerCard
                logoSrc={DEMO_LOGO}
                logoAlt="Міністерство оборони України"
              />
            </ShowcasePreview>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default (прозорий) vs Hover."
        >
          <ShowcasePreview className={styles.preview}>
            <ShowcaseMatrix
              columns={["Default", "Hover (наведіть курсор)"]}
              rows={[
                {
                  cells: [
                    <MemorandumPartnerCard
                      key="d"
                      logoSrc={DEMO_LOGO}
                      logoAlt="Міністерство оборони України"
                    />,
                    <MemorandumPartnerCard
                      key="h"
                      logoSrc={DEMO_LOGO}
                      logoAlt="Міністерство оборони України"
                      aria-label="МОУ — наведіть для hover"
                    />,
                  ],
                },
              ]}
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="sizes"
          description="Figma ~258.6×149px; width 100% у сітці."
        >
          <ShowcasePreview className={styles.preview}>
            <MemorandumPartnerCard
              logoSrc={DEMO_LOGO}
              logoAlt="Міністерство оборони України"
            />
          </ShowcasePreview>
          <p className={styles.note}>
            Root max-width 16.1625rem, height 9.3125rem; logo max ~227×119px.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Default border використовує --text-disabled як колір обводки (Figma
            neutral-300).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Hover лише CSS (@media hover: hover).",
              "Default: transparent background, border --text-disabled.",
              "Hover: --surface-default + border --text-secondary.",
              "Без state props.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="examples" description="Сітка та посилання.">
          <p className={styles.galleryCaption}>Memorandums Grid</p>
          <ShowcasePreview className={styles.preview}>
            <div className={styles.grid}>
              <MemorandumPartnerCard
                logoSrc={DEMO_LOGO}
                logoAlt="Міністерство оборони України"
              />
              <MemorandumPartnerCard
                logoSrc={DEMO_LOGO}
                logoAlt="Міністерство оборони України"
              />
              <MemorandumPartnerCard
                logoSrc={DEMO_LOGO}
                logoAlt="Міністерство оборони України"
              />
            </div>
          </ShowcasePreview>
          <p className={styles.galleryCaption}>З href</p>
          <ShowcasePreview className={styles.preview}>
            <MemorandumPartnerCard
              href="https://mod.gov.ua"
              logoSrc={DEMO_LOGO}
              logoAlt="Міністерство оборони України"
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "logoAlt обовʼязковий на <img>.",
              "href → <a>; без href — <div> у сітці.",
              "Focus-visible: --border-focus.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "У Memorandums Grid на сторінці партнерів",
              "logo object-fit: contain у фіксованій висоті",
              "href для зовнішніх сайтів партнерів",
            ]}
            dont={[
              "Не плутайте з Partner Card (corner frame, type variants)",
              "Не хардкодьте сірі hex — токени text-disabled / text-secondary",
            ]}
            alternatives={[
              {
                label: "Partner Card",
                path: "partner-card",
                note: "кутова рамка, type=info|main|…",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Partner Card", path: "partner-card" }]}
            usedWith={[{ label: "Partners", path: "partners" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function MemorandumPartnerCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MemorandumPartnerCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
