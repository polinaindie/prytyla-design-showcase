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
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  sortControlLayoutForViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./SortControlShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=473-6498";

const FIGMA_BAR_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=940-9610";

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
    property: "layout",
    type: '"inline" | "bar"',
    typeKind: "VARIANT",
    optionsDefault: '"inline"',
    description:
      "inline — label + тригер поруч (desktop). bar — width 100%, space-between (tablet/mobile, Figma Filter bar).",
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
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewLayout = sortControlLayoutForViewportWidth(previewWidth);

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
          description="Ширина frame — Wide desktop … Mobile; tablet/mobile — bar як у Filter & Sort (Figma 940:9610)."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · layout=${previewLayout} · value=active · count=16.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
          >
            <div className={styles.previewRow}>
              <SortControl
                options={OPTIONS}
                value={value}
                onChange={setValue}
                count={16}
                layout={previewLayout}
              />
            </div>
          </ShowcaseDocLivePreview>
          <p className={styles.note}>
            Bar layout (tablet/mobile):{" "}
            <a href={FIGMA_BAR_URL} target="_blank" rel="noreferrer">
              Figma 940:9610
            </a>
            .
          </p>
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
              "layout=\"bar\" у Filter & Sort на tablet/mobile (<1024px)",
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
