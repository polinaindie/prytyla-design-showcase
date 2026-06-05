import { useMemo, useState } from "react";
import { ProjectCard } from "../../design-system/ProjectCard";
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
  figmaComponentSizeForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./ProjectCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=16-9982";

const DEMO_IMAGE = publicAssetUrl("/showcase/project-card-demo.jpg");

const LIVE_PREVIEW_CODE = `import { ProjectCard } from "@/design-system/ProjectCard";

<ProjectCard
  href="/projects/jaws"
  donateHref="https://donate.example.org/jaws"
  imageSrc="${publicAssetUrl("/showcase/project-card-demo.jpg")}"
  title="Щелепи"
  description="…"
  progress={69}
  collectedAmount="48 388 780 ₴"
  goalAmount="20 000 000 ₴"
/>`;

const DEMO = {
  href: "/projects/jaws",
  donateHref: "https://donate.example.org/jaws",
  imageSrc: DEMO_IMAGE,
  imageAlt: "Збір Щелепи",
  title: "Щелепи",
  description:
    "Смерть приходить з неба і в неї гострі зуби. Наша ціль — зібрати 500 млн. грн на БПЛА Shark-M та високоточні українські баражуючі боєприпаси.",
  progress: 69,
  collectedAmount: "48 388 780 ₴",
  goalAmount: "20 000 000 ₴",
} as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Сторінка проєкту (overlay link).",
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
    description: "Обкладинка проєкту.",
  },
  {
    property: "title / description",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "H3 + body medium.",
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
  { element: "Card", property: "background", token: "--surface-default" },
  { element: "Card", property: "border", token: "--border-default" },
  { element: "Title", property: "font-size", token: "--font-size-heading-h3" },
  { element: "Body", property: "font-size", token: "--font-size-body-medium" },
  { element: "CTA", property: "background", token: "--surface-action" },
  { element: "CTA", property: "color", token: "--text-on-action" },
  { element: "Labels", property: "color", token: "--text-muted" },
  { element: "Card", property: "border-radius", token: "--radius-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function ProjectCardShowcasePage() {
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
        title="Project Card"
        description="Картка активного проєкту: обкладинка, опис, ProgressBar, CTA донату."
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
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${componentSize} · progress=69 · donate opens in new tab.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <ProjectCard {...DEMO} size={componentSize} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default vs Hover — CSS на desktop."
        >
          <ShowcaseMatrix
            columns={["Default", "Hover (наведіть курсор)"]}
            rows={[
              {
                cells: [
                  <ProjectCard key="d" {...DEMO} size="desktop" />,
                  <ProjectCard
                    key="h"
                    {...DEMO}
                    size="desktop"
                    aria-label={`${DEMO.title} — наведіть для hover`}
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
            ProgressBar tokens — /showcase/progress-bar. Gap
            --spacing-card-progress-gap — app token in index.css.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Overlay link → href (вся картка); donate button → donateHref (_blank).",
              "Hover zoom image — desktop/tablet @media (hover: hover).",
              "Title underline — desktop hover only.",
              "pointer-events: donate button поверх overlay (z-index).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "cardLink aria-label defaults to title.",
              "Donate — окреме <a> з видимим текстом.",
              "Focus-visible на overlay і donate.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "href — внутрішня сторінка; donateHref — зовнішній платіж",
              "ProgressBar для progress 0–100",
              "Hover effects лише desktop/tablet",
            ]}
            dont={[
              "Не вкладати другий <a> без donateHref pattern",
              "Не raw div замість ProgressBar",
            ]}
            alternatives={[
              { label: "Main Project", path: "main-project", note: "hero featured project" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Progress Bar", path: "progress-bar" },
              { label: "Button", path: "button" },
            ]}
            usedWith={[
              { label: "Filter Chip", path: "filter-chip" },
              { label: "Sort Control", path: "sort-control" },
              { label: "Main Project", path: "main-project" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function ProjectCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ProjectCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
