import { useMemo, useState } from "react";
import { TextField } from "../../design-system/TextField";
import { IconClose, IconSearch } from "../../design-system/Icons";
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
import styles from "./TextFieldShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1026-23275";

const LIVE_PREVIEW_CODE = `import { TextField } from "@/design-system/TextField";
import { IconSearch } from "@/design-system/Icons";

<TextField
  label="Label"
  placeholder="Placeholder"
  helperText="Supporting text"
  leadingIcon={<IconSearch size={24} aria-hidden />}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "label",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Підпис поля (Figma label text).",
  },
  {
    property: "placeholder",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Placeholder"',
    description: "Placeholder у input.",
  },
  {
    property: "helperText",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Supporting text під полем.",
  },
  {
    property: "hideHelperText",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Figma showSupportingText=false.",
  },
  {
    property: "error",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "State=Error — обводка + IconError.",
  },
  {
    property: "leadingIcon / trailingIcon",
    type: "ReactNode",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Слоти 36×24; trailing clear — onTrailingIconClick.",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "State=Disabled (opacity 38%).",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Control", property: "background", token: "--surface-default" },
  { element: "Control", property: "border", token: "--border-default" },
  { element: "Control (hover)", property: "border", token: "--border-strong" },
  { element: "Control (focus)", property: "border", token: "--border-focus" },
  { element: "Error", property: "border", token: "--feedback-error" },
  { element: "Input", property: "color", token: "--text-default" },
  { element: "Label", property: "color", token: "--text-secondary" },
  { element: "Placeholder", property: "color", token: "--text-disabled" },
  { element: "Control", property: "min-height", token: "--size-4xlarge" },
  { element: "Icon slot", property: "width", token: "--size-3xlarge" },
  { element: "Control", property: "border-radius", token: "--radius-medium" },
] as const;

function ClearableDemo() {
  const [value, setValue] = useState("");

  return (
    <TextField
      className={styles.field}
      label="Label"
      placeholder="Placeholder"
      helperText="Supporting text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leadingIcon={<IconSearch size={24} aria-hidden />}
      trailingIcon={<IconClose size={24} aria-hidden />}
      onTrailingIconClick={() => setValue("")}
      trailingIconLabel="Очистити поле"
    />
  );
}

function TextFieldShowcasePage() {
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
        title="Text field"
        description="Outlined text field: M3-style label, supporting text, leading/trailing icons."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Enabled + leading icon; Figma width 210px."
        >
          <ShowcaseDocLivePreview
            caption="Default · leadingIcon=IconSearch · helperText visible."
            code={LIVE_PREVIEW_CODE}
          >
            <TextField
              className={styles.field}
              label="Label"
              placeholder="Placeholder"
              helperText="Supporting text"
              leadingIcon={<IconSearch size={24} aria-hidden />}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="States · icon slots · clearable trailing."
        >
          <p className={styles.galleryCaption}>
            States · Cols=Enabled|Error|Disabled · Rows=placeholder|with value
          </p>
          <ShowcaseMatrix
            columns={["Enabled", "Error", "Disabled"]}
            rows={[
              {
                rowLabel: "Placeholder",
                cells: [
                  <TextField
                    key="en"
                    className={styles.field}
                    label="Label"
                    placeholder="Placeholder"
                    helperText="Supporting text"
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                  <TextField
                    key="err"
                    className={styles.field}
                    label="Label"
                    placeholder="Placeholder"
                    helperText="Supporting text"
                    error
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                  <TextField
                    key="dis"
                    className={styles.field}
                    label="Label"
                    placeholder="Placeholder"
                    helperText="Supporting text"
                    disabled
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                ],
              },
              {
                rowLabel: "With value",
                cells: [
                  <TextField
                    key="val"
                    className={styles.field}
                    label="Label"
                    defaultValue="Input text"
                    helperText="Supporting text"
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                  <TextField
                    key="val-err"
                    className={styles.field}
                    label="Label"
                    defaultValue="Input text"
                    helperText="Supporting text"
                    error
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                  <TextField
                    key="val-dis"
                    className={styles.field}
                    label="Label"
                    defaultValue="Input text"
                    helperText="Supporting text"
                    disabled
                    leadingIcon={<IconSearch size={24} aria-hidden />}
                  />,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>
            Icon slots · leading | trailing clear | none
          </p>
          <ShowcasePreview className={styles.preview}>
            <TextField
              className={styles.field}
              label="Label"
              placeholder="Placeholder"
              helperText="Supporting text"
              leadingIcon={<IconSearch size={24} aria-hidden />}
            />
            <ClearableDemo />
            <TextField
              className={styles.field}
              label="Label"
              placeholder="Placeholder"
              helperText="Supporting text"
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Hover / focus — CSS на .control (:hover, :focus-within).",
              "error — --feedback-error border + IconError trailing.",
              "disabled — opacity 38%, pointer-events off.",
              "Trailing clear — button з trailingIconLabel.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "label зв’язаний з input через htmlFor/id.",
              "helperText — id; error → role=alert.",
              "leading/trailing icons — aria-hidden; clear — aria-label.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "label + helperText для доступності",
              "error + role=alert на helper для валідації",
              "Icon/* 24px у слотах",
            ]}
            dont={[
              "Не хардкодуйте обводку — --border-default / --feedback-error",
              "Не дублюйте IconError при error=true",
            ]}
            alternatives={[]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Icons", path: "icons" }]}
            usedWith={[
              { label: "DepartmentSelect", path: "department-select" },
              { label: "General Widget", path: "general-widget" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function TextFieldShowcase() {
  return (
    <ShowcaseThemeProvider>
      <TextFieldShowcasePage />
    </ShowcaseThemeProvider>
  );
}
