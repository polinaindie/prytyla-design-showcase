import { useState } from "react";
import {
  PaymentInfo,
  PaymentInfoGroup,
  type PaymentInfoField,
} from "../../design-system/PaymentInfo";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./PaymentInfoShowcase.module.css";

const QUICK_EXAMPLE = `import { PaymentInfo, PaymentInfoGroup } from '@/design-system/PaymentInfo';

<PaymentInfoGroup>
  <PaymentInfo
    id="card"
    paymentType="card"
    title="Переказ на карту"
    fields={[
      { label: "Одержувач", value: "Сергій Притула", copyValue: "Сергій Притула" },
    ]}
  />
</PaymentInfoGroup>`;

const ITEM_PROPS = [
  { name: "paymentType", type: "PaymentInfoType", required: true, description: "card | bank | paypal | crypto | swift" },
  { name: "title", type: "ReactNode", required: true, description: "Заголовок способу оплати." },
  { name: "fields", type: "PaymentInfoField[]", required: true, description: "Рядки label + value + copy." },
  { name: "description", type: "ReactNode", description: "Вступ (ShowDescription=Yes)." },
  { name: "id", type: "string", description: "Id для PaymentInfoGroup." },
];

const GROUP_PROPS = [
  {
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description: "Кілька відкритих блоків.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--surface-default", usedIn: "Контейнер Default" },
  { category: "Surface", name: "--surface-subtle-neutral", usedIn: "Hover фон + icon tile" },
  { category: "Surface", name: "--accent-highlight", usedIn: "Hover icon tile (#fff5c5)" },
  {
    category: "Surface",
    name: "--pryt-brand-orange-300",
    usedIn: "Opened header (#ffda46)",
  },
  { category: "Surface", name: "--surface-inverse", usedIn: "Opened icon tile" },
  { category: "Text", name: "--text-muted / --text-default", usedIn: "Label / value" },
  { category: "Layout", name: "--radius-large, --space-medium", usedIn: "Card radius 12px, padding" },
];

const CARD_FIELDS: PaymentInfoField[] = [
  { label: "Одержувач", value: "Сергій Притула", copyValue: "Сергій Притула" },
  {
    label: "IBAN",
    value: "UA8430529900000026200681993072",
    copyValue: "UA8430529900000026200681993072",
  },
  { label: "РНОКПП", value: "2975800618", copyValue: "2975800618" },
  {
    label: "Призначення платежу",
    value: "OP00279, благодійний безповоротний внесок",
    copyValue: "OP00279, благодійний безповоротний внесок",
  },
  {
    label: "Номер карти",
    value: "5168 7420 6353 7207",
    copyValue: "5168742063537207",
  },
];

const BANK_DESCRIPTION = (
  <p>
    Для переказу в гривні скористайтесь реквізитами нижче. Переконайтесь, що
    призначення платежу вказано коректно.
  </p>
);

const BANK_FIELDS: PaymentInfoField[] = [
  {
    label: "Одержувач",
    value: "БО Фонд Сергія Притули",
    copyValue: "БО Фонд Сергія Притули",
  },
  {
    label: "IBAN",
    value: "UA843220010000026004700000011",
    copyValue: "UA843220010000026004700000011",
  },
  { label: "ЄДРПОУ", value: "43720363", copyValue: "43720363" },
  {
    label: "Призначення платежу",
    value: "OP00279, благодійний безповоротний внесок",
    copyValue: "OP00279, благодійний безповоротний внесок",
  },
];

const PAYPAL_FIELDS: PaymentInfoField[] = [
  {
    label: "Email",
    value: (
      <a href="mailto:serhiy.prytula.kyiv@gmail.com">
        serhiy.prytula.kyiv@gmail.com
      </a>
    ),
    copyValue: "serhiy.prytula.kyiv@gmail.com",
  },
  {
    label: "Обов'язковий коментар",
    value: "Charity donation for CHYSTE NEBO",
    copyValue: "Charity donation for CHYSTE NEBO",
  },
];

const CRYPTO_DESCRIPTION = (
  <p>Задонатити криптовалютою можна за посиланням на гаманці нижче.</p>
);

const CRYPTO_FIELDS: PaymentInfoField[] = [
  { label: "Bitcoin (BTC)", value: "bc1q…", copyValue: "bc1qexample" },
  { label: "Ethereum (ETH)", value: "0x…", copyValue: "0xexample" },
  { label: "Tether USDT (TRC20)", value: "T…", copyValue: "Texample" },
];

function PaymentInfoShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [swiftCurrency, setSwiftCurrency] = useState("USD");

  const swiftFields: PaymentInfoField[] = [
    {
      label: "Beneficiary",
      value: "Serhiy Prytula Charity Foundation",
      copyValue: "Serhiy Prytula Charity Foundation",
    },
    {
      label: "IBAN",
      value: "UA9030529900000026001026709343",
      copyValue: "UA9030529900000026001026709343",
      currency: {
        value: swiftCurrency,
        onChange: setSwiftCurrency,
        options: [{ code: "USD" }, { code: "EUR" }, { code: "UAH" }],
      },
    },
    { label: "SWIFT code", value: "PBANUA2X", copyValue: "PBANUA2X" },
  ];

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Payment Info"
        description="Спосіб оплати / FAQ-акордеон (Figma PaymentInfo 284:13904): Default, Hover, OnClick з реквізитами та copy."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Payment methods"
          description="Один відкритий блок. Hover — сірий фон; OnClick — жовтий header."
        >
          <div className={styles.list}>
            <PaymentInfoGroup>
              <PaymentInfo
                id="card"
                paymentType="card"
                title="Переказ на карту"
                fields={CARD_FIELDS}
              />
              <PaymentInfo
                id="bank"
                paymentType="bank"
                title={
                  <>
                    Банківський переказ
                    <br />
                    по Україні
                  </>
                }
                description={BANK_DESCRIPTION}
                fields={BANK_FIELDS}
              />
              <PaymentInfo
                id="paypal"
                paymentType="paypal"
                title="Paypal"
                fields={PAYPAL_FIELDS}
              />
              <PaymentInfo
                id="crypto"
                paymentType="crypto"
                title="Crypto"
                description={CRYPTO_DESCRIPTION}
                fields={CRYPTO_FIELDS}
              />
              <PaymentInfo
                id="swift"
                paymentType="swift"
                title={
                  <>
                    SWIFT перекази
                    <br />
                    з-за кордону
                  </>
                }
                description={
                  <p>
                    Для міжнародного переказу використовуйте реквізити SWIFT та
                    оберіть валюту для IBAN.
                  </p>
                }
                fields={swiftFields}
              />
            </PaymentInfoGroup>
          </div>
          <p className={styles.hint}>max-width 293px (Figma desktop)</p>
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="PaymentInfoGroup props">
          <ShowcasePropsTable props={GROUP_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="PaymentInfo props">
          <ShowcasePropsTable props={ITEM_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Обгортай у PaymentInfoGroup — один відкритий спосіб оплати.",
              "copyValue на полях з IBAN, email, номерами карт.",
              "currency на полі IBAN для SWIFT (CurrencySelect).",
            ]}
            dont={[
              "НЕ плутай з Accordion FAQ — інший вигляд і поля.",
              "НЕ додавай state props — Default / Hover / OnClick через CSS і open.",
              "НЕ хардкодуй жовтий header — --pryt-brand-orange-300.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function PaymentInfoShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PaymentInfoShowcasePage />
    </ShowcaseThemeProvider>
  );
}
