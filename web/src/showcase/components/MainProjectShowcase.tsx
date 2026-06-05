import { useMemo, useState } from "react";
import { MainProject } from "../../design-system/MainProject";
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
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./MainProjectShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=16-10164";

const DEMO_IMAGE = publicAssetUrl("/showcase/main-project-demo.jpg");

const LIVE_PREVIEW_CODE = `import { MainProject } from "@/design-system/MainProject";

<MainProject
  href="/projects/unified-fundraising"
  donateHref="https://donate.example.org/unified"
  imageSrc="${publicAssetUrl("/showcase/main-project-demo.jpg")}"
  title="Єдинозбір"
  description="…"
  progress={69}
  collectedAmount="571 819 486 ₴"
  goalAmount="1 000 000 000 ₴"
/>`;

const DEMO = {
  href: "/projects/unified-fundraising",
  donateHref: "https://donate.example.org/unified",
  imageSrc: DEMO_IMAGE,
  imageAlt: "Єдинозбір — hero",
  title: "Єдинозбір",
  description:
    "Купуємо дрони-перехоплювачі Шахедів та комплектуємо екіпажі операторів необхідним обладнанням",
  progress: 69,
  collectedAmount: "571 819 486 ₴",
  goalAmount: "1 000 000 000 ₴",
} as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Сторінка збору (overlay link).",
  },
  {
    property: "donateHref",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Зовнішній донат (кнопка, target=_blank).",
  },
  {
    property: "imageSrc / imageAlt",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "Hero background.",
  },
  {
    property: "title / description",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "H0 + body large (inverse).",
  },
  {
    property: "progress",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "0–100",
    description: "ProgressBar value.",
  },
  {
    property: "collectedAmount / goalAmount",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Суми збору.",
  },
  {
    property: "size",
    type: '"desktop" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Figma Size breakpoints.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Glass panel", property: "background", token: "--surface-glass-strong" },
  { element: "Donate CTA", property: "background", token: "--surface-action" },
  { element: "Hero", property: "color", token: "--text-on-inverse" },
  { element: "Stats", property: "color", token: "--text-default" },
  { element: "Labels", property: "color", token: "--text-secondary" },
  { element: "Title", property: "font-size", token: "--font-size-heading-h0" },
  { element: "Description", property: "font-size", token: "--font-size-body-large" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Panel", property: "padding", token: "--space-3xlarge" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function MainProjectShowcasePage() {
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
        title="Main Project"
        description="Головний hero активного збору: фото, H0, glass-панель з ProgressBar і CTA донату."
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
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${componentSize} · href overlay + donateHref button.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <MainProject {...DEMO} size={componentSize} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            ProgressBar — окремий компонент; glass panel — --surface-glass-strong
            (approved exception у design system).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Desktop @media (hover: hover): image scale(1.1) + title underline.",
              "Overlay <a href> на hero; donate — окрема кнопка target=_blank.",
              "Без state props — hover лише CSS.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<section> з cardAriaLabel або title у overlay.",
              "Дві зони кліку: hero link + donate button (не вкладені <a>).",
              "Focus-visible на overlay і CTA — --border-focus.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "href — сторінка збору; donateHref — зовнішній платіж",
              "Один MainProject на головній / featured slot",
              "Desktop hover — scale + underline",
            ]}
            dont={[
              "Не плутати з ProjectCard (сітка проєктів)",
              "Не вкладати <a> в <a>",
              "Не дублювати hero на сторінці",
            ]}
            alternatives={[
              { label: "Project Card", path: "project-card", note: "картка в сітці" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Project Card", path: "project-card" },
              { label: "Progress Bar", path: "progress-bar" },
              { label: "Button", path: "button" },
            ]}
            usedWith={[{ label: "General Widget", path: "general-widget" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function MainProjectShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MainProjectShowcasePage />
    </ShowcaseThemeProvider>
  );
}
