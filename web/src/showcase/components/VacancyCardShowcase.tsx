import { VacancyCard } from "../../design-system/VacancyCard";
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
import styles from "./VacancyCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1162-31929";

const QUICK_EXAMPLE = `import { VacancyCard } from '@/design-system/VacancyCard';

<VacancyCard
  href="/careers/financial-analyst"
  title="Фінансовий аналітик"
  description="Аналіз фінансових звітів та прогнозування бюджету."
/>`;

const PROPS = [
  { name: "title", type: "string", required: true, description: "Назва вакансії (Figma H3)." },
  {
    name: "description",
    type: "string",
    required: true,
    description: "Короткий опис (Figma body medium).",
  },
  { name: "href", type: "string", required: true, description: "URL сторінки вакансії." },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-default, --surface-subtle-neutral",
    usedIn: "Білий default / світло-сірий hover (neutral-50)",
  },
  {
    category: "Border",
    name: "--border-default, --border-width-small",
    usedIn: "Обводка картки",
  },
  { category: "Text", name: "--text-default", usedIn: "Заголовок, опис, іконка" },
  {
    category: "Typography",
    name: "--font-display, --font-size-heading-h3, --font-size-body-medium",
    usedIn: "H3 32px / body 16px",
  },
  {
    category: "Layout",
    name: "--space-3xlarge, --space-medium, --radius-large",
    usedIn: "Padding 32px, gap 12px, radius 12px",
  },
  { category: "Icon", name: "IconArrowUpRight32", usedIn: "Figma Icon/32/Arrow-Up-Right" },
];

const DEMO = {
  href: "/careers/financial-analyst",
  title: "Фінансовий аналітик",
  description: "Аналіз фінансових звітів та прогнозування бюджету.",
} as const;

function VacancyCardShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Vacancy Card"
        description={`Картка-лінк вакансії (Figma Vacancy Card 1162:31929). Figma: ${FIGMA_URL}`}
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Ширина 100% у контейнері (max 684px як у Figma)."
        >
          <ShowcasePreview className={styles.preview}>
            <VacancyCard {...DEMO} />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Variants"
          description="Default і Hover — наведіть курсор на картку нижче."
        >
          <ShowcaseMatrix
            columns={["Default", "Hover (наведіть курсор)"]}
            rows={[
              {
                cells: [
                  <VacancyCard {...DEMO} />,
                  <VacancyCard {...DEMO} aria-label={`${DEMO.title} — наведіть для hover`} />,
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
              "Завжди використовуйте як <a href> з осмисленим title і description",
              "Тримайте hover лише в CSS — фон --surface-subtle-neutral",
            ]}
            dont={[
              "Не замінюйте на <button> без href — це навігаційна картка",
              "Не фіксуйте жорстко 684px у продукті — width: 100% у сітці",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Accessibility">
          <p>
            Семантичний заголовок <code>&lt;h3&gt;</code> всередині посилання. Focus ring —{" "}
            <code>--border-focus</code>. За потреби додайте <code>aria-label</code> на{" "}
            <code>&lt;a&gt;</code>, якщо контекст сторінки неочевидний.
          </p>
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function VacancyCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <VacancyCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
