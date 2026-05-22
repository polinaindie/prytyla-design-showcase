import { useState } from "react";
import { GeneralWidget } from "../../design-system/GeneralWidget";
import type {
  GeneralWidgetPaymentInfoSection,
  GeneralWidgetPaymentTab,
} from "../../design-system/GeneralWidget";
import type { PaymentInfoField } from "../../design-system/PaymentInfo";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseGrid,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./GeneralWidgetShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=287-14741";

const QUICK_EXAMPLE = `import { GeneralWidget } from '@/design-system/GeneralWidget';

<GeneralWidget
  layout="full"
  hero={{ src: "/hero.jpg", alt: "Проєкт" }}
  defaultPaymentTab="once"
  quickAmounts={[200, 500, 1000]}
/>`;

const CARD_FIELDS: PaymentInfoField[] = [
  { label: "Одержувач", value: "Сергій Притула", copyValue: "Сергій Притула" },
  {
    label: "IBAN",
    value: "UA8430529900000026200681993072",
    copyValue: "UA8430529900000026200681993072",
  },
];

const PAYMENT_INFO_SECTIONS: GeneralWidgetPaymentInfoSection[] = [
  {
    title: "Перекази по Україні",
    items: [
      {
        id: "gw-card",
        paymentType: "card",
        title: "Переказ на карту",
        fields: CARD_FIELDS,
      },
      {
        id: "gw-bank",
        paymentType: "bank",
        title: "Банківський переказ",
        fields: [
          {
            label: "Одержувач",
            value: "БО Фонд Сергія Притули",
            copyValue: "БО Фонд Сергія Притули",
          },
        ],
      },
    ],
  },
  {
    title: "Перекази з-закордону",
    items: [
      {
        id: "gw-paypal",
        paymentType: "paypal",
        title: "Paypal",
        fields: [
          {
            label: "Email",
            value: "serhiy.prytula.kyiv@gmail.com",
            copyValue: "serhiy.prytula.kyiv@gmail.com",
          },
        ],
      },
      {
        id: "gw-swift",
        paymentType: "swift",
        title: "SWIFT перекази",
        fields: [{ label: "SWIFT code", value: "PBANUA2X", copyValue: "PBANUA2X" }],
      },
    ],
  },
];

const PROPS = [
  {
    name: "layout",
    type: '"full" | "veryShort"',
    default: '"full"',
    description: "Повна картка з hero/формою або компактний progress (VeryShort).",
  },
  {
    name: "showProgress",
    type: "boolean",
    default: "false",
    description: "Блок прогресу зверху (Figma Progressbar=On).",
  },
  {
    name: "progress",
    type: "GeneralWidgetProgress",
    description: "Дані прогресу + thumbnail для veryShort / showProgress.",
  },
  {
    name: "hero",
    type: "{ src, alt }",
    description: "Hero-зображення без градієнта (до токена overlay).",
  },
  {
    name: "paymentTab / defaultPaymentTab",
    type: "GeneralWidgetPaymentTab",
    description: "Контрольований / початковий таб: once | subscription | paymentInfo.",
  },
  {
    name: "paymentInfoSections",
    type: "GeneralWidgetPaymentInfoSection[]",
    description: "Групи PaymentInfo для табу «Реквізити».",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--surface-default", usedIn: "Картка, форма" },
  { category: "Surface", name: "--surface-inverse", usedIn: "Кнопка «На банку»" },
  { category: "Border", name: "--border-default, --border-strong", usedIn: "Form, underline" },
  { category: "Accent", name: "--accent-secondary", usedIn: "VeryShort border, chip selected" },
  {
    category: "Typography",
    name: "--pryt-brand-font-size-1000, --pryt-brand-font-size-700, --pryt-brand-font-size-450",
    usedIn: "Сума 52px, UAH 28px, заголовок progress 18px",
  },
  {
    category: "Layout",
    name: "--space-large, --space-2xlarge, --radius-large",
    usedIn: "Form padding/gap (18px → --space-large), radius 12px",
  },
];

const DEMO_PROGRESS = {
  value: 69,
  title: "Чисте небо",
  collectedAmount: "48 388 780 ₴",
  goalAmount: "20 000 000 ₴",
};

function GeneralWidgetShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [tab, setTab] = useState<GeneralWidgetPaymentTab>("once");
  const [amount, setAmount] = useState("0");

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="General Widget"
        description={`Віджет донату (Figma GeneralWidget 287:14741). Ітерація 1: Once, PaymentInfo, VeryShort. Figma: ${FIGMA_URL}`}
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Once — сума + quick amounts + CTA. Hero — placeholder без градієнта."
        >
          <div className={styles.previewCell}>
            <GeneralWidget
              hero={{
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='329' height='374' viewBox='0 0 329 374'%3E%3Crect fill='%23e7e7e7' width='329' height='374'/%3E%3C/svg%3E",
                alt: "",
              }}
              paymentTab={tab}
              onPaymentTabChange={setTab}
              amount={amount}
              onQuickAmountClick={(value) => setAmount(String(value))}
              onPrimaryAction={() => setAmount(amount === "0" ? "500" : amount)}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Variants" description="Ітерація 1 — три режими з Figma.">
          <ShowcaseGrid columns={1}>
            <div className={styles.previewRow}>
              <div className={styles.previewCell}>
                <GeneralWidget
                  defaultPaymentTab="once"
                  hero={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='329' height='374'%3E%3Crect fill='%23d1d1d1' width='329' height='374'/%3E%3C/svg%3E",
                    alt: "Hero",
                  }}
                />
                <p className={styles.cellLabel}>Once (Progressbar=Off)</p>
              </div>
              <div className={styles.previewCell}>
                <GeneralWidget
                  defaultPaymentTab="paymentInfo"
                  paymentInfoSections={PAYMENT_INFO_SECTIONS}
                  hero={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='329' height='374'%3E%3Crect fill='%23d1d1d1' width='329' height='374'/%3E%3C/svg%3E",
                    alt: "Hero",
                  }}
                />
                <p className={styles.cellLabel}>PaymentInfo</p>
              </div>
              <div className={styles.previewCell}>
                <GeneralWidget layout="veryShort" progress={DEMO_PROGRESS} />
                <p className={styles.cellLabel}>VeryShort + Progressbar</p>
              </div>
            </div>
          </ShowcaseGrid>
        </ShowcaseSection>

        <ShowcaseSection title="With progress" description="Figma Once + Progressbar=On.">
          <GeneralWidget
            showProgress
            progress={DEMO_PROGRESS}
            defaultPaymentTab="once"
            hero={{
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='329' height='374'%3E%3Crect fill='%23d1d1d1' width='329' height='374'/%3E%3C/svg%3E",
              alt: "Hero",
            }}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Компонуй з ChipPaymentType, QuickAmount, Button, PaymentInfo, ProgressBar.",
              "Дані (суми, реквізити, hero) передавай пропсами — API пізніше.",
              "Hero без градієнта до появи токена overlay.",
            ]}
            dont={[
              "НЕ хардкодь #ffa400 / rgba gradient у GeneralWidget.",
              "НЕ дублюй PaymentInfo-розмітку — використовуй PaymentInfoGroup.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function GeneralWidgetShowcase() {
  return (
    <ShowcaseThemeProvider>
      <GeneralWidgetShowcasePage />
    </ShowcaseThemeProvider>
  );
}
