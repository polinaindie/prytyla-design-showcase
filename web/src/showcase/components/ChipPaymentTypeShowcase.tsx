import { useState } from "react";
import { ChipPaymentType } from "../../design-system/ChipPaymentType";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./ChipPaymentTypeShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=284-14412";

const QUICK_EXAMPLE = `import { ChipPaymentType } from '@/design-system/ChipPaymentType';

<ChipPaymentType state="default">Щомісяця</ChipPaymentType>
<ChipPaymentType state="selected" recommendBadge>
  Щомісяця
</ChipPaymentType>`;

const PROPS = [
  {
    name: "children",
    type: "ReactNode",
    default: '"Щомісяця"',
    description: "Підпис під іконкою (Figma labelText).",
  },
  {
    name: "state",
    type: '"default" | "selected"',
    default: '"default"',
    description: "Figma State=Default / Hover (обраний спосіб).",
  },
  {
    name: "recommendBadge",
    type: "boolean",
    default: "false",
    description: "Figma label — бейдж «Найдієвіше».",
  },
  {
    name: "recommendBadgeText",
    type: "string",
    default: '"Найдієвіше"',
    description: "Текст бейджа.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Нативний disabled на <button>.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-default, --surface-page",
    usedIn: "Default card / selected warm (#fffdf3)",
  },
  {
    category: "Border",
    name: "--border-default, --accent-secondary",
    usedIn: "Default outline / selected orange 2px",
  },
  { category: "Text", name: "--text-muted, --text-default", usedIn: "Label default / selected" },
  {
    category: "Accent",
    name: "--accent-secondary",
    usedIn: "Recommend badge fill (orange-500)",
  },
  {
    category: "Typography",
    name: "--font-size-caption-medium, --font-size-numbers-tiny",
    usedIn: "Label 13px / badge 10px",
  },
  {
    category: "Layout",
    name: "--space-medium, --size-2xsmall, --space-xsmall, --radius-large",
    usedIn: "Padding 12×10px, gap, radius 12px",
  },
  { category: "Icon", name: "IconPaymentRepeat 20×20", usedIn: "Figma Icons/Repeat 1411:38080" },
];

function ChipPaymentTypeShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [selected, setSelected] = useState<"monthly" | "once">("monthly");

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Chip Payment Type"
        description={`Чіп вибору типу платежу (Figma ChipPaymentType 284:14412). Figma: ${FIGMA_URL}`}
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Variants"
          description="Сітка як у Figma: Default / Selected × без бейджа / з «Найдієвіше»."
        >
          <ShowcaseMatrix
            columns={["Без бейджа", "З бейджем «Найдієвіше»"]}
            rows={[
              {
                rowLabel: "Default",
                cells: [
                  <ChipPaymentType state="default">Щомісяця</ChipPaymentType>,
                  <ChipPaymentType state="default" recommendBadge>
                    Щомісяця
                  </ChipPaymentType>,
                ],
              },
              {
                rowLabel: "Selected",
                cells: [
                  <ChipPaymentType state="selected">Щомісяця</ChipPaymentType>,
                  <ChipPaymentType state="selected" recommendBadge>
                    Щомісяця
                  </ChipPaymentType>,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Interactive" description="Група вибору — один selected, aria-pressed.">
          <ShowcasePreview>
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
              "Використовуй IconPaymentRepeat і state selected для обраного варіанту.",
              "recommendBadge лише на рекомендованому варіанті (напр. щомісяця).",
              "Обгортай у flex/grid з gap — бейдж виходить за межі чіпа (position absolute).",
            ]}
            dont={[
              "НЕ плутай з Filter Chip — інша форма (pill) і без іконки.",
              "НЕ хардкодь #ffa400 / #fffdf3 — --accent-secondary, --surface-page.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
