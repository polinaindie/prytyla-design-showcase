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
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./ProgressBarShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=728-13566";

/** Типовий in-progress на картці проєкту (не демо-69 з Figma symbol). */
const TYPICAL_PROGRESS = 52;

const LIVE_PREVIEW_CODE = `import { ProgressBar } from "@/design-system/ProgressBar";

<ProgressBar value={progress} />`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "value",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "required",
    description:
      "0–100: синій fill + сірий badge на краю fill. ≥100: сірий track, navy badge в кінці, текст 101% / 112% …",
  },
  {
    property: "variant",
    type: '"inProgress" | "done"',
    typeKind: "VARIANT",
    optionsDefault: "auto (done if value ≥ 100)",
    description: "Figma Property 1: InProgres | Done; при value ≥ 100 стиль Done незалежно.",
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
  {
    element: "Badge (≥100%)",
    property: "background",
    token: "--accent-primary",
  },
  { element: "Badge", property: "color", token: "--text-on-inverse" },
  { element: "Badge", property: "font-size", token: "--font-size-caption" },
  { element: "Track/fill", property: "border-radius", token: "--radius-medium" },
  { element: "Badge", property: "border-radius", token: "--radius-round" },
] as const;

function ProgressBarShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [value, setValue] = useState(TYPICAL_PROGRESS);

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const roundedValue = Math.round(value);
  const previewVariant = value >= 100 ? "done" : "inProgress";

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
        description="Лінійний індикатор збору: in progress (синій fill + сірий badge) або ≥100% (сірий track, navy badge, 101%+)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — Wide desktop … Mobile; слайдер 0–150% (типовий in-progress ~52%)."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · value=${roundedValue} · variant=${previewVariant} · max-width 340px.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            constrainWidth
          >
            <div className={styles.liveRow}>
              <label className={styles.rangeMeta} htmlFor="progress-live-range">
                value: {roundedValue}
                {value >= 100 ? " · over target" : ""}
              </label>
              <input
                id="progress-live-range"
                className={styles.rangeInput}
                type="range"
                min={0}
                max={150}
                step={1}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
              />
              <ProgressBar value={value} />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Track/badge in-progress — --pryt-brand-* (legacy); fill і badge ≥100% —
            --accent-primary. Track height 6px — TODO mapped token.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "role=progressbar; aria-valuenow/min/max; aria-label з label prop.",
              "При value &gt; 100 aria-valuenow = фактичний відсоток, max лишається 100.",
              "Не покладайтесь лише на колір fill — текст N% у badge.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "value з API (зібрано / ціль × 100)",
              "value ≥ 100 — сірий track; navy badge показує 101%, 112% …",
              "Контейнер width 100%; на картці max-width знімається через className",
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
