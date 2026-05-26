import { useState } from "react";
import { CurrencySelect } from "../../design-system/CurrencySelect";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./CurrencySelectShowcase.module.css";

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

const QUICK_EXAMPLE = `import { CurrencySelect } from '@/design-system/CurrencySelect';

<CurrencySelect
  options={[{ code: 'USD' }, { code: 'EUR' }, { code: 'PLN' }]}
  value={currency}
  onChange={setCurrency}
/>`;

const PROPS = [
  {
    name: "options",
    type: "CurrencyCode[]",
    required: true,
    description: "{ code } — коди валют у меню.",
  },
  { name: "value", type: "string", required: true, description: "Обраний code." },
  {
    name: "onChange",
    type: "(code: string) => void",
    required: true,
    description: "Callback при виборі.",
  },
  {
    name: "open / onOpenChange",
    type: "boolean",
    description: "Контрольований стан панелі (за потреби).",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Typography",
    name: "--font-size-caption",
    usedIn: "Caption 12px",
  },
  { category: "Color", name: "--text-default", usedIn: "Код валюти" },
  {
    category: "Surface",
    name: "--surface-subtle-accent, --surface-default",
    usedIn: "Тригер pill / рядок / hover",
  },
  { category: "Layout", name: "--space-small, --space-xsmall", usedIn: "Padding, gap" },
  { category: "Radius", name: "--radius-round, 0.375rem panel", usedIn: "Pill + menu" },
];

function CurrencySelectShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState("USD");
  const [copied, setCopied] = useState(false);

  const options = [{ code: "USD" }, ...CURRENCIES];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Currency Select"
        description="Вибір валюти (pill + dropdown). Figma Currency Picker / Currency / CurrencyDropdown."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
          <CurrencySelect
            options={options}
            value={value}
            onChange={setValue}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Клік по тригеру відкриває список; hover на пунктах — CSS.",
              "Відкритий стан у коді — open / onOpenChange, не окремі Figma-пропи.",
            ]}
            dont={[
              "Не використовуй DropdownItem — інший розмір і стиль.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
