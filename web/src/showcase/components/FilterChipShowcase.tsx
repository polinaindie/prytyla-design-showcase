import { useState } from "react";
import { FilterChip } from "../../design-system/FilterChip";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./FilterChipShowcase.module.css";

const QUICK_EXAMPLE = `import { FilterChip } from '@/design-system/FilterChip';

<FilterChip state="default">Назва</FilterChip>
<FilterChip state="active">Назва</FilterChip>`;

const PROPS = [
  {
    name: "state",
    type: '"default" | "active"',
    default: '"default"',
    description: "Візуальний стан (Figma State=Default / Active).",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Текст фільтра.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Нативний disabled на <button>.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Typography",
    name: "--font-size-body-small",
    usedIn: "Label 14px semibold",
  },
  {
    category: "Color",
    name: "--text-default, --text-on-primary",
    usedIn: "Default / active text",
  },
  {
    category: "Surface",
    name: "rgba(255,255,255,0.8), --surface-primary",
    usedIn: "Default glass (як ProjectsPage) / active fill",
  },
  {
    category: "Border",
    name: "--border-default, --border-strong (hover)",
    usedIn: "Default outline",
  },
  {
    category: "Layout",
    name: "--space-large, --space-small, --size-2xsmall, 2.5rem min-height",
    usedIn: "Padding і висота active",
  },
  { category: "Radius", name: "--radius-round", usedIn: "Pill shape" },
];

const DEMO_LABELS = ["Усі", "Гуманітарні", "Військові", "Освіта"];

function FilterChipShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Filter Chip"
        description="Pill-фільтр для списків і каталогів. Figma Filter Chip (node 459:10025)."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
          <ShowcaseMatrix
            columns={["default", "active", "disabled"]}
            rows={[
              {
                cells: [
                  <FilterChip state="default">Назва</FilterChip>,
                  <FilterChip state="active">Назва</FilterChip>,
                  <FilterChip state="default" disabled>
                    Disabled
                  </FilterChip>,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection
          title="Ряд фільтрів"
          description="Клік перемикає active; батьківський стан керує state."
        >
          <ShowcasePreview>
            <div className={styles.filterDemo}>
            {DEMO_LABELS.map((label, index) => (
              <FilterChip
                key={label}
                state={activeIndex === index ? "active" : "default"}
                onClick={() => setActiveIndex(index)}
              >
                {label}
              </FilterChip>
            ))}
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Рендери як <button type=\"button\"> з aria-pressed для active.",
              "Керуй вибором з батька (один active у групі або мультивибір — за UX сторінки).",
            ]}
            dont={[
              "Не додавай іконки всередину FilterChip — лише текст.",
              "Не вигадуй новий glass-токен; фон default як у ProjectsPage.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function FilterChipShowcase() {
  return (
    <ShowcaseThemeProvider>
      <FilterChipShowcasePage />
    </ShowcaseThemeProvider>
  );
}
