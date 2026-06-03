import { useMemo, useState } from "react";
import { MultiDrop } from "../../design-system/MultiDrop";
import type { MultiDropCheckboxState } from "../../design-system/MultiDrop";
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
import styles from "./MultiDropShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1308-37107";

const LABEL = "Категорія майна";

const LIVE_PREVIEW_CODE = `import { MultiDrop } from "@/design-system/MultiDrop";

<MultiDrop
  label="Категорія майна"
  level={1}
  expandable
  expanded
  checkboxState="indeterminate"
  onExpandToggle={() => setOpen((v) => !v)}
  onToggle={toggleParent}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "label",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Figma itemText.",
  },
  {
    property: "level",
    type: "1 | 2 | 3",
    typeKind: "VARIANT",
    optionsDefault: "1",
    description: "Відступ зліва (padding-left).",
  },
  {
    property: "checkboxState",
    type: '"empty" | "checked" | "indeterminate"',
    typeKind: "VARIANT",
    optionsDefault: '"empty"',
    description: "Стан Checkbox у рядку.",
  },
  {
    property: "expandable",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Figma drop — chevron для розгортання.",
  },
  {
    property: "expanded",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Figma dropType Open.",
  },
  {
    property: "onExpandToggle",
    type: "() => void",
    typeKind: "BOOLEAN",
    optionsDefault: "—",
    description: "Клік по chevron.",
  },
  {
    property: "onToggle",
    type: "() => void",
    typeKind: "BOOLEAN",
    optionsDefault: "—",
    description: "Toggle checkbox у рядку.",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Disabled рядок + label.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Label", property: "color", token: "--text-default" },
  { element: "Label disabled", property: "color", token: "--text-disabled" },
  { element: "Label", property: "font-size", token: "--font-size-body-small" },
  { element: "Level 1 hover", property: "background", token: "--border-default" },
  {
    element: "Level 2+ hover",
    property: "background",
    token: "--surface-subtle-neutral",
  },
  { element: "Row", property: "gap", token: "--space-small" },
  { element: "Level 2 expandable", property: "padding-left", token: "--size-3xlarge" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function checkboxState(
  checked: boolean,
  indeterminate: boolean,
): MultiDropCheckboxState {
  if (indeterminate) return "indeterminate";
  if (checked) return "checked";
  return "empty";
}

function TreeDemo() {
  const [open, setOpen] = useState(true);
  const [parent, setParent] = useState<MultiDropCheckboxState>("indeterminate");
  const [childA, setChildA] = useState(true);
  const [childB, setChildB] = useState(false);

  const syncParent = (a: boolean, b: boolean) => {
    if (a && b) setParent("checked");
    else if (!a && !b) setParent("empty");
    else setParent("indeterminate");
  };

  return (
    <div className={styles.tree}>
      <MultiDrop
        label={LABEL}
        level={1}
        expandable
        expanded={open}
        checkboxState={parent}
        onExpandToggle={() => setOpen((value) => !value)}
        onToggle={() => {
          const all = parent !== "checked";
          setChildA(all);
          setChildB(all);
          setParent(all ? "checked" : "empty");
        }}
      />
      {open ? (
        <>
          <MultiDrop
            label="Підкатегорія A"
            level={2}
            checkboxState={checkboxState(childA, false)}
            onToggle={() => {
              const next = !childA;
              setChildA(next);
              syncParent(next, childB);
            }}
          />
          <MultiDrop
            label="Підкатегорія B"
            level={2}
            checkboxState={checkboxState(childB, false)}
            onToggle={() => {
              const next = !childB;
              setChildB(next);
              syncParent(childA, next);
            }}
          />
          <MultiDrop
            label="Елемент рівня 3"
            level={3}
            checkboxState="empty"
            onToggle={() => undefined}
          />
        </>
      ) : null}
    </div>
  );
}

function MultiDropShowcasePage() {
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
        title="MultiDrop"
        description="Рядок ієрархічного мультивибору: checkbox, chevron, рівні 1–3."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Level 1 expandable, open, indeterminate — типовий батьківський ряд."
        >
          <ShowcaseDocLivePreview
            caption="level=1 · expandable · expanded · checkboxState=indeterminate."
            code={LIVE_PREVIEW_CODE}
            constrainWidth
          >
            <div className={styles.preview}>
              <MultiDrop
                label={LABEL}
                level={1}
                expandable
                expanded
                checkboxState="indeterminate"
                onExpandToggle={() => {}}
                onToggle={() => {}}
              />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="checkboxState · expandable · level · tree demo."
        >
          <p className={styles.galleryCaption}>
            checkboxState · level=1 · без chevron
          </p>
          <ShowcasePreview className={styles.preview}>
            <MultiDrop label={LABEL} checkboxState="empty" />
            <MultiDrop label={LABEL} checkboxState="checked" />
            <MultiDrop label={LABEL} checkboxState="indeterminate" />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>expandable · closed / open</p>
          <ShowcasePreview className={styles.preview}>
            <MultiDrop
              label={LABEL}
              expandable
              expanded={false}
              checkboxState="empty"
            />
            <MultiDrop
              label={LABEL}
              expandable
              expanded
              checkboxState="checked"
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>level 2 / 3 · disabled</p>
          <ShowcaseMatrix
            columns={["Level 2 leaf", "Level 3 leaf", "Disabled"]}
            rows={[
              {
                cells: [
                  <MultiDrop key="l2" label={LABEL} level={2} checkboxState="checked" />,
                  <MultiDrop key="l3" label={LABEL} level={3} checkboxState="empty" />,
                  <MultiDrop
                    key="dis"
                    label={LABEL}
                    checkboxState="checked"
                    disabled
                  />,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>
            Tree demo · parent indeterminate · sync children
          </p>
          <TreeDemo />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            level2Leaf 60px / level3Leaf 83px padding-left — raw rem з TODO у
            MultiDrop.module.css. Checkbox — /showcase/checkbox.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Окремі кнопки: chevronBtn (expand) і rowBtn (checkbox + label).",
              "Focus-visible на обох кнопках — --border-focus.",
              "disabled блокує обидві кнопки; label --text-disabled.",
              "Дерево — керуй expanded/checkboxState з батьківського стану.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "DepartmentSelect — плоский або деревоподібний список",
              "checkboxState=indeterminate на батьківському рядку",
              "level + expandable для вкладених категорій",
            ]}
            dont={[
              "Не вкладайте додаткові кнопки в label",
              "Не хардкодуйте indent без TODO до spacing token",
              "Не дублюйте Checkbox markup — використовуй MultiDrop",
            ]}
            alternatives={[
              {
                label: "DepartmentSelect",
                path: "department-select",
                note: "композит з MultiDrop",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Checkbox", path: "checkbox" }]}
            usedWith={[
              { label: "DepartmentSelect", path: "department-select" },
              { label: "Dropdown Item", path: "dropdown-item" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function MultiDropShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MultiDropShowcasePage />
    </ShowcaseThemeProvider>
  );
}
