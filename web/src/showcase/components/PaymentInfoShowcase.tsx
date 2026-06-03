import { useMemo, useState } from "react";
import {
  PaymentInfo,
  PaymentInfoGroup,
  type PaymentInfoField,
} from "../../design-system/PaymentInfo";
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
import styles from "./PaymentInfoShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=284-13904";

const LIVE_PREVIEW_CODE = `import { PaymentInfo, PaymentInfoGroup } from "@/design-system/PaymentInfo";

<PaymentInfoGroup>
  <PaymentInfo id="card" paymentType="card" title="…" fields={fields} />
</PaymentInfoGroup>`;

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

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "PaymentInfo.paymentType",
    type: "card | bank | paypal | crypto | swift",
    typeKind: "VARIANT",
    optionsDefault: "required",
    description: "Іконка типу оплати.",
  },
  {
    property: "PaymentInfo.title",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Заголовок способу оплати.",
  },
  {
    property: "PaymentInfo.fields",
    type: "PaymentInfoField[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Рядки label + value + copy (+ currency на IBAN).",
  },
  {
    property: "PaymentInfo.description",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Вступ (ShowDescription=Yes).",
  },
  {
    property: "PaymentInfoGroup.allowMultiple",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Кілька відкритих блоків.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Item", property: "background", token: "--surface-default" },
  { element: "Hover", property: "background", token: "--surface-subtle-neutral" },
  { element: "Open header", property: "background", token: "--pryt-brand-orange-300" },
  { element: "Hover icon", property: "background", token: "--accent-highlight" },
  { element: "Open icon", property: "background", token: "--bg-inverse-strong" },
  { element: "Label", property: "color", token: "--text-muted" },
  { element: "Value", property: "color", token: "--text-default" },
  { element: "Item", property: "border-radius", token: "--radius-large" },
] as const;

function PaymentMethodsList({ swiftFields }: { swiftFields: PaymentInfoField[] }) {
  return (
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
      <PaymentInfo id="paypal" paymentType="paypal" title="Paypal" fields={PAYPAL_FIELDS} />
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
            Для міжнародного переказу використовуйте реквізити SWIFT та оберіть
            валюту для IBAN.
          </p>
        }
        fields={swiftFields}
      />
    </PaymentInfoGroup>
  );
}

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
        title="Payment Info"
        description="Спосіб оплати: Default, Hover, Opened з реквізитами, copy і CurrencySelect у SWIFT."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Група способів оплати — один відкритий (max-width 293px)."
        >
          <ShowcaseDocLivePreview
            caption="PaymentInfoGroup · 5 payment types · click to expand."
            code={LIVE_PREVIEW_CODE}
            constrainWidth
          >
            <ShowcasePreview className={styles.list}>
              <PaymentMethodsList swiftFields={swiftFields} />
            </ShowcasePreview>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Усі типи: card, bank, paypal, crypto, swift."
        >
          <ShowcasePreview className={styles.list}>
            <PaymentMethodsList swiftFields={swiftFields} />
          </ShowcasePreview>
          <p className={styles.hint}>
            Hover — сірий фон; Opened — header --pryt-brand-orange-300
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Open header --pryt-brand-orange-300 — brand token; icon tile radius
            10px — TODO token.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Default / Hover / Open — CSS + open state у PaymentInfoGroup.",
              "Copy на полях — PaymentInfoCopyButton + copyValue.",
              "SWIFT IBAN — CurrencySelect у field.currency.",
              "Header — button з aria-expanded; panel hidden коли closed.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Кожен спосіб — button header + region panel.",
              "Copy buttons — aria-label «Скопіювати …».",
              "Посилання в value (PayPal email) — нативні <a>.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "PaymentInfoGroup — один відкритий спосіб (за замовч.)",
              "copyValue на IBAN, email, номерах",
              "currency на IBAN для SWIFT",
            ]}
            dont={[
              "Не плутай з Accordion FAQ",
              "Не додавай state props — open через групу",
              "Не хардкодуй жовтий header",
            ]}
            alternatives={[
              { label: "Accordion", path: "accordion", note: "FAQ текст" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Currency Select", path: "currency-select" },
              { label: "Accordion", path: "accordion" },
            ]}
            usedWith={[
              { label: "General Widget", path: "general-widget" },
              { label: "Chip Payment Type", path: "chip-payment-type" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
