import { useState } from "react";
import { MainNews, NewsCard } from "../../design-system/NewsCard";
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
import styles from "./NewsCardShowcase.module.css";

const FIGMA_CARD_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7070";

const FIGMA_FEATURED_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=292-5047";

const DEMO_IMAGE = "/showcase/news-card-demo.jpg";

const QUICK_EXAMPLE = `import { NewsCard } from '@/design-system/NewsCard';

<NewsCard
  href="/news/safety-ua"
  imageSrc="/media/safety-ua.jpg"
  date="11/08/2025"
  category="Проєкт"
  title="Завершено проєкт «Безпека UA: …»"
  tagLabel="WOГОНЬ Допомоги. Загін роботів 2.0"
/>`;

const FEATURED_EXAMPLE = `import { MainNews } from '@/design-system/NewsCard';

<MainNews
  card={{
    variant: "featured",
    size: "desktop",
    href: "/news/safety-ua",
    imageSrc: "/media/safety-ua.jpg",
    date: "11/08/2025",
    category: "Гуманітарна допомога",
    title: "Завершено проєкт «Безпека UA: …»",
    tags: ["Розмінування", "Цивільний захист"],
  }}
  slideCount={3}
  activeIndex={0}
  onPrev={() => {}}
  onNext={() => {}}
/>`;

const PROPS = [
  { name: "href", type: "string", required: true, description: "URL статті / новини." },
  { name: "imageSrc", type: "string", required: true, description: "Зображення." },
  { name: "imageAlt", type: "string", description: "Alt для img." },
  { name: "date", type: "string", required: true, description: "Дата в meta row." },
  { name: "category", type: "string", required: true, description: "SubTag." },
  { name: "title", type: "string", required: true, description: "Заголовок (H4 card / H2 featured desktop)." },
  { name: "tagLabel", type: "string", description: "Один тег для variant=\"card\"." },
  { name: "tags", type: "string[]", description: "Кілька тегів для variant=\"featured\"." },
  {
    name: "variant",
    type: '"card" | "featured"',
    default: '"card"',
    description: "card — 3:7070; featured — Main News 292:5047.",
  },
  {
    name: "size",
    type: '"desktop" | "tablet" | "mobile"',
    default: '"desktop"',
    description: "card: desktop|tablet; featured: desktop|mobile.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--surface-default, --surface-badge", usedIn: "Тіло / Tag" },
  { category: "Border", name: "--border-default, --text-default", usedIn: "Обводка / активна крапка" },
  { category: "Text", name: "--text-default, --text-muted", usedIn: "Заголовок / дата" },
  {
    category: "Typography",
    name: "--font-size-heading-h2, --font-size-heading-h4, --font-size-body-small",
    usedIn: "Featured H2 / card H4",
  },
  {
    category: "Layout",
    name: "--space-4xlarge, --space-2xlarge, --space-large, --radius-large",
    usedIn: "Featured padding 40px, radius 12px",
  },
  { category: "Composite", name: "SubTag, Tag", usedIn: "Meta і теги" },
];

const DEMO = {
  href: "/news/safety-ua",
  imageSrc: DEMO_IMAGE,
  imageAlt: "",
  date: "11/08/2025",
  category: "Проєкт",
  title:
    "Завершено проєкт «Безпека UA: гуманітарне розмінування та готовність цивільних»",
  tagLabel: "WOГОНЬ Допомоги. Загін роботів 2.0",
} as const;

const FEATURED_CARD = {
  variant: "featured" as const,
  size: "desktop" as const,
  href: "/news/safety-ua",
  imageSrc: DEMO_IMAGE,
  imageAlt: "",
  date: "11/08/2025",
  category: "Гуманітарна допомога",
  title:
    "Завершено проєкт «Безпека UA: гуманітарне розмінування та готовність цивільних»",
  tags: ["Розмінування", "Цивільний захист"],
};

const FEATURED_SLIDES = [
  FEATURED_CARD,
  {
    ...FEATURED_CARD,
    category: "Проєкт",
    title:
      "«Студентська гонка» у «Єдинозборі». Студенти 44 виша доєдналися до збору",
    tags: ["Єдинозбір"],
  },
  {
    ...FEATURED_CARD,
    tags: ["Розмінування", "Цивільний захист", "WOГОНЬ Допомоги"],
  },
] as const;

function NewsCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredSlide = FEATURED_SLIDES[featuredIndex] ?? FEATURED_SLIDES[0];
  const slideCount = FEATURED_SLIDES.length;

  const goPrev = () => {
    setFeaturedIndex((index) => (index <= 0 ? slideCount - 1 : index - 1));
  };

  const goNext = () => {
    setFeaturedIndex((index) => (index >= slideCount - 1 ? 0 : index + 1));
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="News Card"
        description={`Компактна картка (Figma 3:7070) і featured Main News (Figma 292:5047). Hover — pan + zoom фото, underline заголовка.`}
      >
        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview — Card"
          description={`Figma: ${FIGMA_CARD_URL}`}
        >
          <ShowcasePreview className={styles.previewDesktop}>
            <NewsCard {...DEMO} />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview — Main News"
          description={`Наведіть на блок — з’являться стрілки (Figma 292:5066). ${FIGMA_FEATURED_URL}`}
        >
          <ShowcaseCodeBlock code={FEATURED_EXAMPLE} language="tsx" />
          <ShowcasePreview className={styles.previewFeatured}>
            <MainNews
              card={featuredSlide}
              slideCount={slideCount}
              activeIndex={featuredIndex}
              onPrev={goPrev}
              onNext={goNext}
            />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Variants" description="Card і Featured; hover — інтерактивно.">
          <ShowcaseMatrix
            columns={["Card Desktop", "Card Tablet", "Featured Desktop", "Featured Mobile"]}
            rows={[
              {
                cells: [
                  <NewsCard key="card-d" {...DEMO} />,
                  <NewsCard key="card-t" {...DEMO} size="tablet" />,
                  <NewsCard key="feat-d" {...FEATURED_CARD} />,
                  <NewsCard key="feat-m" {...FEATURED_CARD} size="mobile" />,
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
              "variant=\"card\" у сітці; variant=\"featured\" для головної новини",
              "tags[] для featured; tagLabel для компактної картки",
            ]}
            dont={[
              "Не змішуйте featured з size=\"tablet\" — використовуйте desktop | mobile",
              "Main News — обгортка зі стрілками на hover (Figma 292:5066)",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Accessibility">
          <p>
            Семантичні <code>&lt;time&gt;</code>, <code>&lt;h2&gt;</code> / <code>&lt;h3&gt;</code>{" "}
            у <code>&lt;a href&gt;</code>. <code>NewsCardPagination</code> —{" "}
            <code>role="tablist"</code>. Pan/zoom вимикається при{" "}
            <code>prefers-reduced-motion</code>.
          </p>
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function NewsCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <NewsCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
