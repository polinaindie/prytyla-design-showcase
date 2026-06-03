import { useMemo, useState } from "react";
import { ProgressBar } from "../../design-system/ProgressBar";
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
import styles from "./ProgressBarShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=728-13566";

const LIVE_PREVIEW_CODE = `import { ProgressBar } from "@/design-system/ProgressBar";

<ProgressBar value={69} variant="inProgress" />`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "value",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Відсоток 0–100+; badge показує округлене ціле.",
  },
  {
    property: "variant",
    type: '"inProgress" | "done"',
    typeKind: "VARIANT",
    optionsDefault: "auto (done if value ≥ 100)",
    description: "Figma Property 1: InProgres | Done.",
  },
  {
    property: "label",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Прогрес: N%"',
    description: "aria-label для role=progressbar.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Track", property: "background", token: "--pryt-brand-neutral-200" },
  { element: "Fill", property: "background", token: "--accent-primary" },
  {
    element: "Badge (in progress)",
    property: "background",
    token: "--pryt-brand-neutral-500",
  },
  { element: "Badge", property: "color", token: "--text-on-inverse" },
  { element: "Badge", property: "font-size", token: "--font-size-caption" },
  { element: "Track/fill", property: "border-radius", token: "--radius-medium" },
  { element: "Badge", property: "border-radius", token: "--radius-round" },
] as const;

function ProgressBarShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [sliderValue, setSliderValue] = useState(69);

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
        title="Progress bar"
        description="Лінійний індикатор збору: in progress (fill + badge на краю) або done (повний track, navy badge)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="In progress ~69% — типовий стан картки проєкту."
        >
          <ShowcaseDocLivePreview
            caption="variant=inProgress · value=69 · max-width 340px."
            code={LIVE_PREVIEW_CODE}
            constrainWidth
          >
            <ProgressBar value={69} variant="inProgress" />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Property: variant · інтерактивний slider 0–110."
        >
          <p className={styles.galleryCaption}>
            variant=inProgress (69%) · variant=done (101%)
          </p>
          <ShowcaseMatrix
            columns={["In progress (69%)", "Done (101%)"]}
            rows={[
              {
                cells: [
                  <ProgressBar key="ip" value={69} variant="inProgress" />,
                  <ProgressBar key="d" value={101} variant="done" />,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>Interactive · value from range</p>
          <ShowcasePreview className={styles.preview}>
            <div className={styles.liveRow}>
              <label className={styles.rangeMeta} htmlFor="progress-demo-range">
                value: {Math.round(sliderValue)}
              </label>
              <input
                id="progress-demo-range"
                className={styles.rangeInput}
                type="range"
                min={0}
                max={110}
                step={1}
                value={sliderValue}
                onChange={(event) =>
                  setSliderValue(Number(event.target.value))
                }
              />
              <ProgressBar value={sliderValue} />
            </div>
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Track/badge in-progress використовують --pryt-brand-* у CSS
            компонента (legacy); fill/badge done — --accent-primary. Track
            height 6px — TODO mapped token.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "role=progressbar; aria-valuenow/min/max; aria-label з label prop.",
              "Відсоток у badge — візуально; SR читає aria-valuenow.",
              "Не покладайтесь лише на колір fill — текст N% у badge.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "value з API (зібрано / ціль × 100)",
              'variant="done" або value ≥ 100 для завершених зборів',
              "Контейнер width 100%, max 340px на картці",
            ]}
            dont={[
              "Не хардкодуй кольори track/fill/badge",
              "Не дублюй markup у сторінках — імпортуй ProgressBar",
              "Не зменшуй висоту track без токена в Figma",
            ]}
            alternatives={[]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[]}
            usedWith={[
              { label: "Project Card", path: "project-card" },
              { label: "Main Project", path: "main-project" },
              { label: "General Widget", path: "general-widget" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function ProgressBarShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ProgressBarShowcasePage />
    </ShowcaseThemeProvider>
  );
}
