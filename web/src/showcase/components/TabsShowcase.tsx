import { useMemo, useState } from "react";
import { Tab, Tabs } from "../../design-system/Tabs";
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
import styles from "./TabsShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1161-28678";

const TAB_ITEMS = [
  { id: "issue", label: "Видача майна" },
  { id: "requests", label: "Запити" },
  { id: "reports", label: "Звіти" },
] as const;

const LIVE_PREVIEW_CODE = `import { Tabs } from "@/design-system/Tabs";

<Tabs items={items} value={value} onChange={setValue} />`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "Tabs.items",
    type: "TabItem[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "{ id, label } — вкладки.",
  },
  {
    property: "Tabs.value",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Обраний id.",
  },
  {
    property: "Tabs.onChange",
    type: "(id: string) => void",
    typeKind: "BOOLEAN",
    optionsDefault: "required",
    description: "Callback при виборі.",
  },
  {
    property: "Tab.selected",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Active — Strong + orange indicator.",
  },
  {
    property: "Tab.children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Підпис вкладки.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Label", property: "font-size", token: "--font-size-tab-label" },
  { element: "Active", property: "font-family", token: "--font-display" },
  { element: "Inactive", property: "color", token: "--text-muted" },
  { element: "Active", property: "color", token: "--text-default" },
  { element: "Indicator", property: "background", token: "--surface-action" },
  { element: "Indicator", property: "height", token: "--size-xsmall" },
  { element: "Tab", property: "gap", token: "--space-medium" },
  { element: "Tabs list", property: "gap", token: "--space-2xlarge" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function TabsShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState<string>(TAB_ITEMS[0].id);

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
        title="Tabs"
        description="Текстові вкладки з помаранчевим індикатором; active — Mariupol Strong."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Три вкладки — типова навігація розділу."
        >
          <ShowcaseDocLivePreview
            caption={`value=${value} · role=tablist.`}
            code={LIVE_PREVIEW_CODE}
          >
            <Tabs items={TAB_ITEMS} value={value} onChange={setValue} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Інтерактивний ряд · окремий Tab selected/default."
        >
          <p className={styles.galleryCaption}>Tabs · interactive</p>
          <ShowcasePreview className={styles.preview}>
            <Tabs items={TAB_ITEMS} value={value} onChange={setValue} />
            <p className={styles.hint}>Обрано: {value}</p>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>Tab · selected=true | false</p>
          <ShowcaseMatrix
            columns={["Selected", "Default"]}
            rows={[
              {
                cells: [
                  <Tab key="s" selected onClick={() => {}}>
                    Видача майна
                  </Tab>,
                  <Tab key="d" onClick={() => {}}>
                    Запити
                  </Tab>,
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
            Dual label layers (Strong + Medium) — без layout shift при
            перемиканні; hover inactive → --text-default.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Tabs: role=tablist; Tab: role=tab, aria-selected.",
              "Keyboard: Tab до focus, Enter/Space вибір (нативна button).",
              "Focus-visible: outline --border-focus.",
              "Панелі контенту — окремо від Tabs (не в компоненті).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Tabs для перемикання секцій на одній сторінці",
              "value/onChange з батьківського стану",
              "role tablist/tab з Tabs компонента",
            ]}
            dont={[
              "Не Filter Chip / Badge для цієї навігації",
              "Не дублюй Figma hover як prop",
              "Не змінюй dual-layer label без дизайну",
            ]}
            alternatives={[
              { label: "Filter Chip", path: "filter-chip", note: "фільтри списку" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            usedWith={[
              { label: "DepartmentSelect", path: "department-select" },
              { label: "Vacancy Card", path: "vacancy-card" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <ShowcaseThemeProvider>
      <TabsShowcasePage />
    </ShowcaseThemeProvider>
  );
}
