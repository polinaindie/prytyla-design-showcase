import { useMemo, useState } from "react";
import { Checkbox } from "../../design-system/Checkbox";
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
import styles from "./CheckboxShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1308-37260";

const LIVE_PREVIEW_CODE = `import { Checkbox } from "@/design-system/Checkbox";

<Checkbox>Сухопутні війська</Checkbox>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "status",
    type: "variant",
    typeKind: "VARIANT",
    optionsDefault: "Default · Active · SomeSelected",
    description: "Figma variant; у коді — checked + indeterminate.",
  },
  {
    property: "checked",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Обраний стан (Active).",
  },
  {
    property: "indeterminate",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Частковий вибір (SomeSelected).",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Opacity 38%, без pointer events.",
  },
  {
    property: "children",
    type: "ReactNode",
    optionsDefault: "—",
    description: "Текстова мітка праворуч від control.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Control", property: "size", token: "--size-small" },
  { element: "Control", property: "border-radius", token: "--radius-small" },
  { element: "Control", property: "gap to label", token: "--space-small" },
  { element: "Box fill", property: "background", token: "--surface-subtle-neutral" },
  { element: "Box", property: "border-color", token: "--border-default" },
  { element: "Label", property: "color", token: "--text-default" },
  { element: "Label disabled", property: "color", token: "--text-disabled" },
  { element: "Mark", property: "color", token: "--text-on-inverse" },
  { element: "Focus", property: "outline-color", token: "--border-focus" },
] as const;

function InteractiveDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className={styles.stateColumn}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(event) => {
          setIndeterminate(false);
          setChecked(event.target.checked);
        }}
      >
        Підпис чекбокса
      </Checkbox>
      <button
        type="button"
        className={styles.resetButton}
        onClick={() => {
          setIndeterminate(true);
          setChecked(false);
        }}
      >
        Скинути в indeterminate
      </button>
    </div>
  );
}

function CheckboxShowcasePage() {
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
        title="Checkbox"
        description="16×16 чекбокс для одиночного або групового вибору; підтримує checked та indeterminate."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Найрепрезентативніший випадок — enabled з текстовою міткою."
        >
          <ShowcaseDocLivePreview
            caption="Variant: Default · Status=Default · Selected=False · with label."
            code={LIVE_PREVIEW_CODE}
          >
            <Checkbox>Сухопутні війська</Checkbox>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Усі стани Figma; рядки = enabled/disabled, колонки = status."
        >
          <p className={styles.galleryCaption}>Icon only · Status axis</p>
          <ShowcasePreview className={styles.preview}>
            <div className={styles.stateColumn}>
              <Checkbox aria-label="Status=Default · Selected=False" />
              <Checkbox checked readOnly aria-label="Status=Active" />
              <Checkbox
                indeterminate
                readOnly
                aria-label="Status=SomeSelected"
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>Interactive · Status=SomeSelected</p>
          <ShowcasePreview className={styles.preview}>
            <InteractiveDemo />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            With label · Row=Enabled/Disabled · Col=Default / Checked / Indeterminate
          </p>
          <ShowcaseMatrix
            columns={["Default", "Checked", "Indeterminate"]}
            rows={[
              {
                rowLabel: "Enabled",
                cells: [
                  <Checkbox key="d">Сухопутні війська</Checkbox>,
                  <Checkbox key="c" checked readOnly>
                    Сухопутні війська
                  </Checkbox>,
                  <Checkbox key="i" indeterminate readOnly>
                    Сухопутні війська
                  </Checkbox>,
                ],
              },
              {
                rowLabel: "Disabled",
                cells: [
                  <Checkbox key="dd" disabled>
                    Сухопутні війська
                  </Checkbox>,
                  <Checkbox key="dc" checked disabled>
                    Сухопутні війська
                  </Checkbox>,
                  <Checkbox key="di" indeterminate disabled>
                    Сухопутні війська
                  </Checkbox>,
                ],
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          description="React props і Figma component properties."
        >
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="token-usage"
          description="Semantic tokens у Checkbox.module.css."
        >
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Keyboard: Tab до focus; Space перемикає checked (native input).",
              "role=\"checkbox\" через <input type=\"checkbox\">; indeterminate — aria-checked=\"mixed\".",
              "Hit target: control --size-small (16px) + label — клік по label перемикає стан.",
              "Focus: outline --border-focus на :focus-visible.",
              "Screen reader: обов'язково children або aria-label, якщо немає видимої мітки.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "indeterminate для «обрано частково» (батьківський чекбокс у дереві)",
              "Завжди давайте видиму мітку (children) або aria-label",
              "Використовуйте в списках вибору та фільтрах",
            ]}
            dont={[
              "Не плутайте indeterminate з checked — різні семантики",
              "Не використовуйте для взаємовиключного вибору — radio group",
              "Не хардкодуйте 16px — лише --size-small",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="related-components"
          description="Споріднені та типові комбінації в UI."
        >
          <ShowcaseDocRelated
            related={[{ label: "Tag", path: "tag" }]}
            usedWith={[
              { label: "DepartmentSelect", path: "department-select" },
              { label: "MultiDrop", path: "multi-drop" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function CheckboxShowcase() {
  return (
    <ShowcaseThemeProvider>
      <CheckboxShowcasePage />
    </ShowcaseThemeProvider>
  );
}
