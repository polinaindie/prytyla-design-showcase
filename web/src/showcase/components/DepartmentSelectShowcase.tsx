import { useMemo, useState } from "react";
import { DepartmentSelect } from "../../design-system/DepartmentSelect";
import type { DepartmentOption } from "../../design-system/DepartmentSelect";
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
import styles from "./DepartmentSelectShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1308-36801";

const LIVE_PREVIEW_CODE = `import { DepartmentSelect } from "@/design-system/DepartmentSelect";

<DepartmentSelect
  options={options}
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
  searchQuery={searchQuery}
  onSearchQueryChange={setSearchQuery}
/>`;

const DEMO_OPTIONS: DepartmentOption[] = [
  { id: "land", label: "Сухопутні війська" },
  { id: "gur", label: "Головне управління розвідки" },
  { id: "sst", label: "Державна спеціальна служба транспорту" },
  { id: "air-assault", label: "Десантно-штурмові війська" },
  { id: "border", label: "Державна прикордонна служба" },
  { id: "air", label: "Повітряні сили" },
  { id: "sbu", label: "Служба безпеки України" },
  { id: "navy", label: "Військово-морські сили" },
  { id: "police", label: "Національна поліція України" },
  { id: "drones", label: "Сили Безпілотних Систем" },
  { id: "guard", label: "Національна гвардія України" },
  { id: "support", label: "Сили підтримки" },
  { id: "sso", label: "Сили спеціальних операцій" },
  { id: "territorial", label: "Сили територіальної оборони" },
  { id: "civil", label: "Цивільні юридичні особи" },
  { id: "signals", label: "Війська звʼязку" },
  { id: "logistics", label: "Сили логістики" },
  { id: "military-police", label: "Військова служба правопорядку" },
  { id: "general-staff", label: "Генеральний штаб" },
  { id: "medical", label: "Медичні сили" },
  { id: "training", label: "Підрозділи підготовки" },
  { id: "science", label: "Наука" },
  { id: "state-guard", label: "Управління державної охорони України" },
];

const FOOTER_INITIAL = [
  "land",
  "gur",
  "air",
  "navy",
  "drones",
  "support",
  "territorial",
];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "options",
    type: "DepartmentOption[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "id + label (MultiDrop rows).",
  },
  {
    property: "selectedIds",
    type: "string[]",
    typeKind: "TEXT",
    optionsDefault: "[]",
    description: "Обрані id.",
  },
  {
    property: "onSelectionChange",
    type: "(ids: string[]) => void",
    typeKind: "BOOLEAN",
    optionsDefault: "required",
    description: "Toggle рядка.",
  },
  {
    property: "searchQuery / onSearchQueryChange",
    type: "string / fn",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Контрольований пошук у header.",
  },
  {
    property: "showFooter",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Variant2 — лічильник + «Очистити».",
  },
  {
    property: "onClearSelection",
    type: "() => void",
    typeKind: "BOOLEAN",
    optionsDefault: "—",
    description: "Кастомний clear (інакше скидає selectedIds).",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Panel", property: "background", token: "--surface-default" },
  { element: "Panel", property: "border", token: "--border-default" },
  { element: "Panel", property: "border-radius", token: "--radius-medium" },
  { element: "Footer count", property: "color", token: "--text-secondary" },
  { element: "Clear", property: "color", token: "--text-default" },
  { element: "Divider", property: "background", token: "--border-default" },
] as const;

function DepartmentSelectDemo({
  showFooter = false,
  initialSelected = [] as string[],
}: {
  showFooter?: boolean;
  initialSelected?: string[];
}) {
  const [selectedIds, setSelectedIds] = useState(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DepartmentSelect
      options={DEMO_OPTIONS}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      showFooter={showFooter}
    />
  );
}

function DepartmentSelectShowcasePage() {
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
        title="Department select"
        description="Мультивибір відомств: пошук (TextField) + список MultiDrop + опційний footer."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Default panel · max-width 315px (Figma)."
        >
          <ShowcaseDocLivePreview
            caption="showFooter=false · search + multi-select rows."
            code={LIVE_PREVIEW_CODE}
          >
            <DepartmentSelectDemo />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default vs Variant2 (footer + preselected)."
        >
          <ShowcaseMatrix
            columns={["Default", "With footer"]}
            rows={[
              {
                cells: [
                  <DepartmentSelectDemo key="default" />,
                  <DepartmentSelectDemo
                    key="footer"
                    showFooter
                    initialSelected={FOOTER_INITIAL}
                  />,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>
            Side by side · default + footer (showcase layout)
          </p>
          <ShowcasePreview className={styles.preview}>
            <DepartmentSelectDemo />
            <DepartmentSelectDemo showFooter initialSelected={FOOTER_INITIAL} />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Panel box-shadow — documented exception (TODO shadow token). Row
            styles — MultiDrop; search — TextField.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Toggle рядка — onSelectionChange(selectedIds).",
              "Пошук фільтрує options (controlled searchQuery).",
              "showFooter — лічильник + clear у footer.",
              "Scroll у list — max-height 272px / 224px з footer.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Search — TextField label/helper.",
              "Rows — MultiDrop checkbox semantics.",
              "Clear footer — button з текстовим label.",
              "List scroll — keyboard у нативних control всередині.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Керуй selectedIds і searchQuery ззовні",
              "showFooter для Variant2 з лічильником",
              "options з API, не хардкод у компоненті",
            ]}
            dont={[
              "Не дублюй MultiDrop/TextField markup",
              "Не хардкодь shadow без TODO",
            ]}
            alternatives={[]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "MultiDrop", path: "multi-drop" },
              { label: "Text field", path: "text-field" },
              { label: "Checkbox", path: "checkbox" },
            ]}
            usedWith={[{ label: "General Widget", path: "general-widget" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function DepartmentSelectShowcase() {
  return (
    <ShowcaseThemeProvider>
      <DepartmentSelectShowcasePage />
    </ShowcaseThemeProvider>
  );
}
