import { useMemo, useState } from "react";
import { ChipPaymentType } from "../../design-system/ChipPaymentType";
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
import styles from "./ChipPaymentTypeShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=284-14412";

const LIVE_PREVIEW_CODE = `import { ChipPaymentType } from "@/design-system/ChipPaymentType";

<ChipPaymentType state="selected" recommendBadge>
  Щомісяця
</ChipPaymentType>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: '"Щомісяця"',
    description: "Підпис під іконкою (Figma labelText).",
  },
  {
    property: "state",
    type: '"default" | "selected"',
    typeKind: "VARIANT",
    optionsDefault: '"default"',
    description: "Figma State=Default / Hover (обраний спосіб).",
  },
  {
    property: "recommendBadge",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Бейдж «Найдієвіше» над чіпом (absolute).",
  },
  {
    property: "recommendBadgeText",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Найдієвіше"',
    description: "Текст recommend badge.",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Нативний disabled на <button>.",
  },
  {
    property: "icon",
    type: "ReactNode",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "IconPaymentRepeat 20px",
    description: "Слот іконки; за замовчуванням repeat payment.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-default" },
  { element: "Selected", property: "background", token: "--surface-page" },
  { element: "Root", property: "border", token: "--border-default" },
  { element: "Selected", property: "border-color", token: "--accent-secondary" },
  { element: "Root", property: "color", token: "--text-muted" },
  { element: "Selected", property: "color", token: "--text-default" },
  { element: "Root", property: "font-size", token: "--font-size-caption-medium" },
  { element: "Root", property: "padding", token: "--size-2xsmall, --space-medium" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Root", property: "gap", token: "--space-xsmall" },
  { element: "Badge", property: "background", token: "--accent-secondary" },
  { element: "Badge", property: "font-size", token: "--font-size-numbers-tiny" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function ChipPaymentTypeShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [selected, setSelected] = useState<"monthly" | "once">("monthly");

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
        title="Chip Payment Type"
        description="Чіп вибору типу платежу (щомісяця / одноразово) з іконкою та опційним бейджем «Найдієвіше»."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Обраний варіант з recommend badge — типовий donate flow."
        >
          <ShowcaseDocLivePreview
            caption="state=selected · recommendBadge=true · label=Щомісяця."
            code={LIVE_PREVIEW_CODE}
          >
            <ChipPaymentType state="selected" recommendBadge>
              Щомісяця
            </ChipPaymentType>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="State × recommendBadge; інтерактивна група вибору."
        >
          <p className={styles.galleryCaption}>
            Property: state · Cols=recommendBadge false|true
          </p>
          <ShowcaseMatrix
            columns={["Без бейджа", "З бейджем «Найдієвіше»"]}
            rows={[
              {
                rowLabel: "Default",
                cells: [
                  <ChipPaymentType key="d0" state="default">
                    Щомісяця
                  </ChipPaymentType>,
                  <ChipPaymentType key="d1" state="default" recommendBadge>
                    Щомісяця
                  </ChipPaymentType>,
                ],
              },
              {
                rowLabel: "Selected",
                cells: [
                  <ChipPaymentType key="s0" state="selected">
                    Щомісяця
                  </ChipPaymentType>,
                  <ChipPaymentType key="s1" state="selected" recommendBadge>
                    Щомісяця
                  </ChipPaymentType>,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>
            Interactive · aria-pressed · один selected у групі
          </p>
          <ShowcasePreview className={styles.preview}>
            <div className={styles.interactiveRow}>
              <ChipPaymentType
                state={selected === "monthly" ? "selected" : "default"}
                recommendBadge
                onClick={() => setSelected("monthly")}
              >
                Щомісяця
              </ChipPaymentType>
              <ChipPaymentType
                state={selected === "once" ? "selected" : "default"}
                onClick={() => setSelected("once")}
              >
                Одноразово
              </ChipPaymentType>
            </div>
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            .iconWrap border-radius 10px — між --radius-medium і --radius-large;
            TODO токен у Figma.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Нативний <button>; aria-pressed={selected}.",
              "Recommend badge — aria-hidden (декоративний текст дублює сенс у label).",
              "Keyboard: Tab, Space/Enter для вибору в групі.",
              "Focus-visible: outline --border-focus на .root.",
              "У групі вибору керуйте state з батьківського стану (один selected).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "state=selected для обраного способу оплати",
              "recommendBadge лише на рекомендованому варіанті (напр. щомісяця)",
              "Flex/grid з достатнім gap — бейдж absolute, виходить за межі чіпа",
            ]}
            dont={[
              "Не плутай з Filter Chip — pill без вертикальної іконки",
              "Не хардкодь #ffa400 / #fffdf3 — --accent-secondary, --surface-page",
              "Не два selected одночасно в одній групі",
            ]}
            alternatives={[
              {
                label: "Filter Chip",
                path: "filter-chip",
                note: "фільтри списку, не payment type",
              },
              {
                label: "Quick Amount",
                path: "quick-amount",
                note: "preset суми, не тип платежу",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Filter Chip", path: "filter-chip" },
              { label: "Quick Amount", path: "quick-amount" },
            ]}
            usedWith={[
              { label: "General Widget", path: "general-widget" },
              { label: "Payment Info", path: "payment-info" },
              { label: "Button", path: "button" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function ChipPaymentTypeShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ChipPaymentTypeShowcasePage />
    </ShowcaseThemeProvider>
  );
}
