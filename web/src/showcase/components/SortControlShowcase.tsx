import { useMemo, useState } from "react";
import { SortControl } from "../../design-system/SortControl";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./SortControlShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=473-6498";

const OPTIONS = [
  { id: "active", label: "Активні проєкти" },
  { id: "done", label: "Реалізовані проєкти" },
];

const LIVE_PREVIEW_CODE = `import { SortControl } from "@/design-system/SortControl";

<SortControl
  options={options}
  value={value}
  onChange={setValue}
  count={16}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "options",
    type: "SortOption[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "{ id, label } — пункти меню (DropdownItem).",
  },
  {
    property: "value",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Обраний id.",
  },
  {
    property: "onChange",
    type: "(id: string) => void",
    typeKind: "BOOLEAN",
    optionsDefault: "required",
    description: "Callback при виборі.",
  },
  {
    property: "label",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Сортування"',
    description: "Статичний підпис зліва (muted).",
  },
  {
    property: "count",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Лічильник у тригері: «Label (16)».",
  },
  {
    property: "open / onOpenChange",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "uncontrolled",
    description: "Контрольований стан панелі.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Label", property: "color", token: "--text-muted" },
  { element: "Value", property: "color", token: "--text-default" },
  { element: "Value", property: "font-size", token: "--font-size-body-medium" },
  { element: "Root", property: "gap", token: "--space-small" },
  { element: "Trigger", property: "gap", token: "--space-xsmall" },
  { element: "Menu", property: "background", token: "--surface-default" },
  { element: "Menu", property: "border", token: "--border-default" },
  { element: "Menu", property: "border-radius", token: "--radius-medium" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function SortControlShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState("active");

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
        title="Sort Control"
        description="Сортування списку: статичний label + тригер з поточним значенням і dropdown."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Типовий рядок над сіткою проєктів."
        >
          <ShowcaseDocLivePreview
            caption='value=active · count=16 · label="Сортування".'
            code={LIVE_PREVIEW_CODE}
          >
            <SortControl
              options={OPTIONS}
              value={value}
              onChange={setValue}
              count={16}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Закритий / open / без count."
        >
          <p className={styles.galleryCaption}>
            Interactive · value={value}
          </p>
          <ShowcasePreview className={styles.preview}>
            <SortControl
              options={OPTIONS}
              value={value}
              onChange={setValue}
              count={16}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>open=true · controlled</p>
          <ShowcasePreview className={styles.preview}>
            <SortControl
              options={OPTIONS}
              value="done"
              onChange={() => {}}
              count={8}
              open
              onOpenChange={() => {}}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>count omitted</p>
          <ShowcasePreview className={styles.preview}>
            <SortControl
              options={OPTIONS}
              value="active"
              onChange={() => {}}
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Пункти меню — токени DropdownItem (див. /showcase/dropdown-item).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Trigger: aria-expanded, aria-haspopup=listbox.",
              "DropdownItem: role=option, aria-selected.",
              "Escape і click outside закривають меню.",
              "count лише у тригері — не дублюй у пунктах меню.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Пункти — короткі label без числа в меню",
              "count на тригері для загальної кількості результатів",
              "Зміни стилю пункту — у DropdownItem",
            ]}
            dont={[
              "Не дублюй markup DropdownItem у SortControl",
              "Не плутай з Currency Select — інший UI pattern",
            ]}
            alternatives={[
              {
                label: "Filter Chip",
                path: "filter-chip",
                note: "фільтр категорій, не sort",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Dropdown Item", path: "dropdown-item" }]}
            usedWith={[
              { label: "Project Card", path: "project-card" },
              { label: "Filter Chip", path: "filter-chip" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function SortControlShowcase() {
  return (
    <ShowcaseThemeProvider>
      <SortControlShowcasePage />
    </ShowcaseThemeProvider>
  );
}
