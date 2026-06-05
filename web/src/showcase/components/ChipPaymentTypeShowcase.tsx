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
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./ChipPaymentTypeShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=284-14412";

const LIVE_PREVIEW_CODE = `const [selected, setSelected] = useState<"plain" | "badge" | null>(null);

const toggle = (id: "plain" | "badge") =>
  setSelected((current) => (current === id ? null : id));

<ChipPaymentType
  state={selected === "plain" ? "selected" : "default"}
  onClick={() => toggle("plain")}
>
  Щомісяця
</ChipPaymentType>
<ChipPaymentType
  state={selected === "badge" ? "selected" : "default"}
  recommendBadge
  onClick={() => toggle("badge")}
>
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
  { element: "Hover / selected", property: "background", token: "--surface-page" },
  { element: "Root", property: "border", token: "--border-default" },
  { element: "Hover / selected", property: "border-color", token: "--accent-secondary" },
  { element: "Root", property: "color", token: "--text-muted" },
  { element: "Hover / selected", property: "color", token: "--text-default" },
  { element: "Root", property: "font-size", token: "--font-size-caption-medium" },
  { element: "Root", property: "padding", token: "--size-2xsmall, --space-medium" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Root", property: "gap", token: "--space-xsmall" },
  { element: "Badge", property: "background", token: "--accent-secondary" },
  { element: "Badge", property: "font-size", token: "--font-size-numbers-tiny" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

type PreviewSelection = "plain" | "badge" | null;

function ChipPaymentTypeShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [selected, setSelected] = useState<PreviewSelection>(null);

  const toggle = (id: Exclude<PreviewSelection, null>) => {
    setSelected((current) => (current === id ? null : id));
  };

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
          description="Обидва з підписом «Щомісяця» — без бейджа і з «Найдієвіше»; клік toggle selected."
        >
          <ShowcaseDocLivePreview
            caption={`selected=${selected ?? "none"} · клік перемикає · hover/active — CSS.`}
            code={LIVE_PREVIEW_CODE}
          >
            <div
              className={styles.livePreviewRow}
              role="group"
              aria-label="Тип платежу (демо)"
            >
              <ChipPaymentType
                state={selected === "plain" ? "selected" : "default"}
                onClick={() => toggle("plain")}
              >
                Щомісяця
              </ChipPaymentType>
              <ChipPaymentType
                state={selected === "badge" ? "selected" : "default"}
                recommendBadge
                onClick={() => toggle("badge")}
              >
                Щомісяця
              </ChipPaymentType>
            </div>
          </ShowcaseDocLivePreview>
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
              "selected через state + onClick; один обраний або toggle off повторним кліком",
              "Hover / :active — CSS; у формі зазвичай без зняття вибору (як tab)",
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
