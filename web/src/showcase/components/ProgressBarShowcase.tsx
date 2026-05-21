import { useState } from "react";
import { ProgressBar } from "../../design-system/ProgressBar";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./ProgressBarShowcase.module.css";

const QUICK_EXAMPLE = `import { ProgressBar } from '@/design-system/ProgressBar';

<ProgressBar value={69} />
<ProgressBar value={101} variant="done" />`;

const PROPS = [
  {
    name: "value",
    type: "number",
    required: true,
    description: "Відсоток 0–100+; відображається округленим цілим.",
  },
  {
    name: "variant",
    type: '"inProgress" | "done"',
    description: "Figma Property 1. Без пропа: done при value ≥ 100.",
  },
  {
    name: "label",
    type: "string",
    description: "aria-label для progressbar (за замовчуванням «Прогрес: N%»).",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--pryt-brand-neutral-200",
    usedIn: "Track (#d1d1d1, Figma surface/progress-track)",
  },
  {
    category: "Color",
    name: "--accent-primary",
    usedIn: "Fill + badge Done (#001e61)",
  },
  {
    category: "Color",
    name: "--pryt-brand-neutral-500",
    usedIn: "Badge In progress (#757575, Figma surface/percentage-badge)",
  },
  {
    category: "Text",
    name: "--text-on-inverse",
    usedIn: "Відсоток у badge",
  },
  {
    category: "Typography",
    name: "--pryt-brand-font-size-200",
    usedIn: "Caption 12px",
  },
  {
    category: "Radius",
    name: "--radius-medium, --radius-round",
    usedIn: "Track/fill 8px; badge pill",
  },
];

function ProgressBarShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [sliderValue, setSliderValue] = useState(69);

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Progress bar"
        description="Лінійний індикатор збору (Figma 728:13566, Prytula-Responsive): In progress з синім fill і сірим badge; Done — повний track і navy badge (101%)."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Variants"
          description="Figma Property 1: InProgres | Done. Ширина за замовчуванням до 340px (21.25rem), 100% у вужчому контейнері."
        >
          <div className={styles.preview}>
            <div className={styles.variantRow}>
              <div>
                <p className={styles.variantLabel}>In progress (69%)</p>
                <ProgressBar value={69} variant="inProgress" />
              </div>
              <div>
                <p className={styles.variantLabel}>Done (101%)</p>
                <ProgressBar value={101} variant="done" />
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Live preview">
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
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Передавай value з API (зібрано / ціль × 100).",
              "variant=\"done\" або value ≥ 100 для завершених зборів.",
              "Обгортай у .container / card — компонент width: 100%, max 340px.",
            ]}
            dont={[
              "НЕ хардкодуй кольори track/fill/badge.",
              "НЕ дублюй progress markup у ProjectsPage — імпортуй ProgressBar.",
              "НЕ зменшуй висоту track без нового токена в Figma.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
