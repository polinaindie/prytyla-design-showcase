import { QuickAmount } from "../../design-system/QuickAmount";
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
import styles from "./QuickAmountShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1407-37060";

const QUICK_EXAMPLE = `import { QuickAmount } from '@/design-system/QuickAmount';

<QuickAmount amount={500} onClick={() => setAmount(500)} />
<QuickAmount amount={1000} currency="UAH" />`;

const PROPS = [
  {
    name: "amount",
    type: "number | string",
    required: true,
    description: "Сума після префікса «+».",
  },
  {
    name: "currency",
    type: "string",
    default: '"UAH"',
    description: "Код валюти (Figma light label).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Нативний disabled на <button>.",
  },
  {
    name: "onClick",
    type: "() => void",
    description: "Обробник вибору швидкої суми.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-subtle-neutral",
    usedIn: "Default і hover — нейтральний сірий фон",
  },
  {
    category: "Border",
    name: "--border-default, --border-width-small, --accent-secondary",
    usedIn: "1px default; hover +1px box-shadow (2px візуально, без стрибка)",
  },
  { category: "Text", name: "--text-default, --text-muted", usedIn: "«+» і сума / валюта" },
  {
    category: "Typography",
    name: "--font-size-body-small",
    usedIn: "Body small 14px, line-height 1.4",
  },
  {
    category: "Layout",
    name: "--space-small, --space-2xsmall, --size-2xlarge, --radius-round",
    usedIn: "Padding 8px, gap 2px, min-height 36px, pill",
  },
];

const DEMO_AMOUNTS = [100, 500, 1000, 5000] as const;

function QuickAmountShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Quick Amount"
        description={`Пілюля швидкого вибору суми донату (Figma Quick Amount 1407:37060). Figma: ${FIGMA_URL}`}
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Ряд типових сум — hover показує помаранчеву обводку та нейтральний сірий фон."
        >
          <ShowcasePreview>
            <div className={styles.row}>
              {DEMO_AMOUNTS.map((value) => (
                <QuickAmount key={value} amount={value} />
              ))}
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Variants"
          description="Default і Hover — наведіть курсор на другу пілюлю (hover: помаранчева обводка)."
        >
          <ShowcaseMatrix
            columns={["Default", "Hover"]}
            rows={[
              {
                cells: [
                  <QuickAmount amount={500} />,
                  <QuickAmount
                    amount={500}
                    aria-label="500 гривень — наведіть для hover"
                  />,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Завжди показуйте «+», суму та код валюти в одній пілюлі",
              "Використовуйте hover лише через CSS (:hover), без окремого selected",
            ]}
            dont={[
              "Не додавайте selected/active prop — стан обирається зовні (наприклад, група кнопок)",
              "Не змінюйте префікс «+» на інший текст без зміни дизайну в Figma",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Accessibility">
          <p>
            Нативний <code>&lt;button type=&quot;button&quot;&gt;</code>. Додайте{" "}
            <code>aria-label</code>, якщо сума без контексту (наприклад, «500 гривень»).
            Focus ring — <code>--border-focus</code>.
          </p>
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function QuickAmountShowcase() {
  return (
    <ShowcaseThemeProvider>
      <QuickAmountShowcasePage />
    </ShowcaseThemeProvider>
  );
}
