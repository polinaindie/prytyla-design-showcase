import { useMemo, useState } from "react";
import { FilterChip } from "../../design-system/FilterChip";
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
import styles from "./FilterChipShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=459-10025";

const LIVE_PREVIEW_CODE = `import { FilterChip } from "@/design-system/FilterChip";

<FilterChip state="active" onClick={() => setActive(0)}>
  Усі
</FilterChip>`;

const DEMO_LABELS = ["Усі", "Гуманітарні", "Військові", "Освіта"];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "state",
    type: '"default" | "active"',
    typeKind: "VARIANT",
    optionsDefault: '"default"',
    description: "Figma State=Default / Active.",
  },
  {
    property: "children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Текст фільтра (без іконок).",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Нативний disabled на <button>.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  {
    element: "Default",
    property: "background",
    token: "rgba(255,255,255,0.8)",
  },
  { element: "Default", property: "border", token: "--border-default" },
  { element: "Default", property: "color", token: "--text-default" },
  { element: "Default (hover)", property: "border-color", token: "--border-strong" },
  { element: "Active", property: "background", token: "--surface-primary" },
  { element: "Active", property: "color", token: "--text-on-primary" },
  { element: "Root", property: "font-size", token: "--font-size-body-small" },
  { element: "Root", property: "border-radius", token: "--radius-round" },
  { element: "Root", property: "padding", token: "--size-2xsmall, --space-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function FilterChipShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [activeIndex, setActiveIndex] = useState(0);

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
        title="Filter Chip"
        description="Pill-фільтр для каталогів і списків; default (glass) та active (primary fill)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Active chip у типовому ряді фільтрів."
        >
          <ShowcaseDocLivePreview
            caption='state=active · label="Усі" · aria-pressed=true.'
            code={LIVE_PREVIEW_CODE}
          >
            <FilterChip state="active">Усі</FilterChip>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="state default|active; інтерактивна група."
        >
          <p className={styles.galleryCaption}>Property: state · static</p>
          <ShowcaseMatrix
            columns={["Default", "Active"]}
            rows={[
              {
                cells: [
                  <FilterChip key="d">Гуманітарні</FilterChip>,
                  <FilterChip key="a" state="active">
                    Гуманітарні
                  </FilterChip>,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>
            Filter row · один active · gap 6px (Figma)
          </p>
          <ShowcasePreview className={styles.preview}>
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

          <p className={styles.galleryCaption}>disabled=true</p>
          <ShowcasePreview className={styles.preview}>
            <FilterChip disabled>Недоступно</FilterChip>
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Default glass: rgba(255,255,255,0.8) — approved exception (див.
            prytula-design-system.mdc); TODO --bg-glass-strong.
            min-height 2.5rem — між --size-2xlarge і --size-3xlarge.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<button type=\"button\">; aria-pressed={active}.",
              "Один active у групі — керуй state з батьківського стану.",
              "Keyboard: Tab, Space/Enter для toggle.",
              "Focus-visible: outline --border-focus.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Горизонтальний ряд фільтрів над списком/сіткою",
              "state=active для обраного фільтра",
              "aria-pressed синхронізуй з state",
            ]}
            dont={[
              "Не додавай іконки всередину — лише текст",
              "Не плутай з Badge (×) або Chip Payment Type (іконка зверху)",
              "Не хардкодь glass без TODO — чекай --bg-glass-strong",
            ]}
            alternatives={[
              { label: "Badge", path: "badge", note: "тег із dismiss" },
              { label: "Tag", path: "tag", note: "статичний лейбл" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Tag", path: "tag" },
              { label: "Badge", path: "badge" },
            ]}
            usedWith={[
              { label: "Project Card", path: "project-card" },
              { label: "News Card", path: "news-card" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
