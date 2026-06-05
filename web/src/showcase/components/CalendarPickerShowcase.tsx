import { useMemo, useState } from "react";
import type { DateRangeValue } from "../../design-system/CalendarPicker";
import { DateRangeField } from "../../design-system/DateRangeField";
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
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./CalendarPickerShowcase.module.css";

const FIGMA_PICKER =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1311-31695";
const FIGMA_MOBILE =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1307-35685";
const FIGMA_FIELD =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1307-35570";

const DEMO_RANGE: DateRangeValue = {
  start: new Date(2025, 8, 1),
  end: new Date(2025, 8, 16),
};

const LIVE_PREVIEW_CODE = `import { DateRangeField } from "@/design-system/DateRangeField";

<DateRangeField
  label="Дата видачі"
  value={{ start, end }}
  onChange={setRange}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "value",
    type: "DateRangeValue",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "{ start, end }",
    description: "Діапазон дат; null — порожній стан.",
  },
  {
    property: "onChange",
    type: "(range) => void",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "1-й клік — початок; 2-й — кінець (одна дата або діапазон); 3-й — новий вибір.",
  },
  {
    property: "layout",
    type: '"row" | "column"',
    typeKind: "VARIANT",
    optionsDefault: "row",
    description: "CalendarPicker: desktop row / mobile column.",
  },
  {
    property: "open",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "DateRangeField: контроль відкриття popover.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Panel", property: "background", token: "--surface-default" },
  { element: "Panel", property: "border", token: "--border-default" },
  { element: "Panel", property: "shadow", token: "--shadow-popover" },
  { element: "Range", property: "background", token: "--bg-range-highlight" },
  { element: "Selected day", property: "background", token: "--bg-inverse-strong" },
  { element: "Selected day", property: "color", token: "--text-on-inverse" },
  { element: "Weekday", property: "color", token: "--text-muted" },
  { element: "Outside month", property: "color", token: "--text-secondary" },
  { element: "Nav button", property: "size", token: "--pryt-brand-scale-700" },
  { element: "Day cell", property: "min-height", token: "--size-xlarge" },
  { element: "Typography", property: "font-size", token: "--font-size-body-small" },
] as const;

function CalendarPickerShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [range, setRange] = useState<DateRangeValue>(DEMO_RANGE);

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const pickerLayout = previewWidth < 768 ? "column" : "row";

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
        title="Calendar Picker"
        description="Вибір діапазону дат: поле-тригер (Text field + Calendar) і popover з двома місяцями."
        status="stable"
        version="1.0"
        updatedAt="2026-06-04"
        figmaUrl={FIGMA_PICKER}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина поля — Figma 210px; frame — Wide desktop … Mobile. Popover inline у preview (масштабується разом із frame)."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · DateRangeField · Figma 1307:35570.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            previewClassName={styles.livePreviewPanel}
            scrollablePreview
          >
            <div className={styles.livePreviewArea}>
              <div className={styles.previewSlot}>
              <DateRangeField
                label="Дата видачі"
                value={range}
                onChange={setRange}
                pickerLayout={pickerLayout}
                popoverMount="inline"
                defaultOpen={false}
              />
              </div>
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Поле: read-only input (лише вибір у календарі), `aria-haspopup=\"dialog\"`, іконка календаря з `aria-label`.",
              "Календар: `role=\"application\"`, дні — кнопки з `aria-selected` на межах діапазону.",
              "Клавіатура: Space/Enter на полі — toggle panel; Escape закриває; повторний клік по полю або іконці календаря — toggle.",
              "Вибір: 1-й клік — початок; 2-й — одна дата (той самий день) або діапазон; 3-й — новий вибір; drag по сітці.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Використовуйте DateRangeField для форм; CalendarPicker окремо — лише в кастомних popover.",
              "Wide desktop … Tablet: два місяці в ряд; Mobile (375): в колонку. Клік по полю відкриває picker.",
              "Формат у полі: `DD.MM - DD.MM.YYYY` (див. formatDateRangeDisplay).",
            ]}
            dont={[
              "Не хардкодьте #ceecff — лише `--bg-range-highlight`.",
              "Не дублюйте shadow — `--shadow-popover`.",
            ]}
            alternatives={[
              {
                label: "Text field",
                path: "text-field",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Text field", path: "text-field" },
              { label: "Icons", path: "icons" },
            ]}
          />
          <ShowcaseDocBulletList
            items={[
              `Figma desktop panel: ${FIGMA_PICKER}`,
              `Figma mobile panel: ${FIGMA_MOBILE}`,
              `Figma trigger field: ${FIGMA_FIELD}`,
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function CalendarPickerShowcase() {
  return (
    <ShowcaseThemeProvider>
      <CalendarPickerShowcasePage />
    </ShowcaseThemeProvider>
  );
}
