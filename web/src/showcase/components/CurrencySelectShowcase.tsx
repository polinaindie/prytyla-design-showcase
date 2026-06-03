import { useMemo, useState } from "react";
import { CurrencySelect } from "../../design-system/CurrencySelect";
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
import styles from "./CurrencySelectShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const CURRENCIES = [
  { code: "EUR" },
  { code: "PLN" },
  { code: "CZK" },
  { code: "GBP" },
  { code: "CHF" },
  { code: "SEK" },
  { code: "NOK" },
  { code: "JPY" },
];

const LIVE_PREVIEW_CODE = `import { CurrencySelect } from "@/design-system/CurrencySelect";

<CurrencySelect
  options={[{ code: "USD" }, { code: "EUR" }]}
  value={value}
  onChange={setValue}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "options",
    type: "CurrencyCode[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Список { code } у dropdown.",
  },
  {
    property: "value",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Обраний код валюти.",
  },
  {
    property: "onChange",
    type: "(code: string) => void",
    typeKind: "BOOLEAN",
    optionsDefault: "required",
    description: "Callback при виборі пункту.",
  },
  {
    property: "open / onOpenChange",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "uncontrolled",
    description: "Контрольований стан панелі.",
  },
  {
    property: "defaultOpen",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Початковий open для uncontrolled режиму.",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Блокує тригер і пункти.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Trigger", property: "background", token: "--surface-subtle-accent" },
  { element: "Trigger", property: "color", token: "--text-default" },
  { element: "Trigger", property: "font-size", token: "--font-size-caption" },
  { element: "Trigger", property: "border-radius", token: "--radius-round" },
  { element: "Trigger", property: "gap", token: "--space-xsmall" },
  { element: "Menu", property: "background", token: "--surface-default" },
  { element: "Option", property: "background (hover)", token: "--surface-subtle-accent" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function CurrencySelectShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState("USD");
  const options = useMemo(() => [{ code: "USD" }, ...CURRENCIES], []);

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
        title="Currency Select"
        description="Pill-тригер + dropdown для вибору коду валюти (USD, EUR, …)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Закритий тригер; клік відкриває listbox."
        >
          <ShowcaseDocLivePreview
            caption="value=USD · open=false · 9 options in menu."
            code={LIVE_PREVIEW_CODE}
          >
            <CurrencySelect options={options} value={value} onChange={setValue} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Стани open / disabled; hover на пунктах — CSS."
        >
          <p className={styles.galleryCaption}>open=true · controlled</p>
          <ShowcasePreview className={styles.preview}>
            <CurrencySelect
              options={options}
              value="EUR"
              onChange={() => {}}
              open
              onOpenChange={() => {}}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>disabled=true</p>
          <ShowcasePreview className={styles.preview}>
            <CurrencySelect
              options={options}
              value="USD"
              onChange={() => {}}
              disabled
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Interactive · value={value} · click outside / Escape closes
          </p>
          <ShowcasePreview className={styles.preview}>
            <CurrencySelect options={options} value={value} onChange={setValue} />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Menu border-radius 0.375rem (6px) — між --radius-small і --radius-medium;
            TODO токен у Figma.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Trigger: aria-expanded, aria-haspopup=listbox, aria-controls.",
              "Listbox: role=listbox, options role=option + aria-selected.",
              "Escape закриває меню; click outside — mousedown на document.",
              "Focus-visible: --border-focus на trigger і option.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Контролюй value/onChange з батьківського стану форми",
              "open/onOpenChange — коли меню має синхронізуватись з layout",
              "Короткі коди валют (ISO) у options",
            ]}
            dont={[
              "Не використовуй DropdownItem — інший розмір і стиль рядка",
              "Не дублюй CurrencyOption поза CurrencySelect без потреби",
            ]}
            alternatives={[
              {
                label: "Dropdown Item",
                path: "dropdown-item",
                note: "загальний пункт меню, не currency pill",
              },
              {
                label: "DepartmentSelect",
                path: "department-select",
                note: "складний multi-select",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Dropdown Item", path: "dropdown-item" }]}
            usedWith={[
              { label: "Payment Info", path: "payment-info" },
              { label: "General Widget", path: "general-widget" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function CurrencySelectShowcase() {
  return (
    <ShowcaseThemeProvider>
      <CurrencySelectShowcasePage />
    </ShowcaseThemeProvider>
  );
}
