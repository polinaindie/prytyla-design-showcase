import { useMemo, useState } from "react";
import { MainNews, NewsCard } from "../../design-system/NewsCard";
import type {
  NewsCardFeaturedSize,
  NewsCardSize,
} from "../../design-system/NewsCard";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseMatrix,
  ShowcasePreview,
  ShowcaseThemeProvider,
  figmaComponentSizeForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseDocSwitchOption,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./NewsCardShowcase.module.css";

const FIGMA_CARD_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7070";

const FIGMA_FEATURED_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=292-5047";

const DEMO_IMAGE = publicAssetUrl("/showcase/news-card-demo.jpg");

const LIVE_PREVIEW_CODE = `import { NewsCard } from "@/design-system/NewsCard";

<NewsCard
  href="/news/safety-ua"
  imageSrc="${publicAssetUrl("/showcase/news-card-demo.jpg")}"
  date="11/08/2025"
  category="Проєкт"
  title="Завершено проєкт «Безпека UA: …»"
  tagLabel="WOГОНЬ Допомоги"
/>`;

const PREVIEW_VARIANT_OPTIONS = [
  { value: "card", label: "Card" },
  { value: "featured", label: "Featured" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

type NewsCardPreviewVariant = (typeof PREVIEW_VARIANT_OPTIONS)[number]["value"];

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

function newsCardSizeForViewport(
  variant: NewsCardPreviewVariant,
  previewWidth: number,
): NewsCardSize | NewsCardFeaturedSize {
  const breakpoint = figmaComponentSizeForViewportWidth(previewWidth);
  if (variant === "featured") {
    return breakpoint === "mobile" ? "mobile" : "desktop";
  }
  return breakpoint === "tablet" ? "tablet" : "desktop";
}

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "URL статті.",
  },
  {
    property: "imageSrc / imageAlt",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "Зображення новини.",
  },
  {
    property: "date / category",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Meta row: time + SubTag.",
  },
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "H4 (card) / H2 (featured desktop).",
  },
  {
    property: "tagLabel",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Один Tag для variant=card.",
  },
  {
    property: "tags",
    type: "string[]",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Кілька Tag для variant=featured.",
  },
  {
    property: "variant",
    type: '"card" | "featured"',
    typeKind: "VARIANT",
    optionsDefault: '"card"',
    description: "card 3:7070 · featured 292:5047.",
  },
  {
    property: "size",
    type: '"desktop" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "card: desktop|tablet; featured: desktop|mobile.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Body", property: "background", token: "--surface-default" },
  { element: "Tag", property: "background", token: "--surface-badge" },
  { element: "Border", property: "border", token: "--border-default" },
  { element: "Title", property: "color", token: "--text-default" },
  { element: "Date", property: "color", token: "--text-muted" },
  { element: "Card title", property: "font-size", token: "--font-size-heading-h4" },
  {
    element: "Featured title",
    property: "font-size",
    token: "--font-size-heading-h2",
  },
  { element: "Card", property: "border-radius", token: "--radius-large" },
] as const;

function NewsCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [previewVariant, setPreviewVariant] =
    useState<NewsCardPreviewVariant>("card");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredSlide = FEATURED_SLIDES[featuredIndex] ?? FEATURED_SLIDES[0];
  const slideCount = FEATURED_SLIDES.length;

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewSize = newsCardSizeForViewport(previewVariant, previewWidth);

  const goPrev = () => {
    setFeaturedIndex((index) => (index <= 0 ? slideCount - 1 : index - 1));
  };

  const goNext = () => {
    setFeaturedIndex((index) => (index >= slideCount - 1 ? 0 : index + 1));
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
        title="News Card"
        description="Компактна картка (card) і featured Main News з каруселлю; hover — pan/zoom фото."
        status="stable"
        version="1.0"
        updatedAt="2026-06-03"
        figmaUrl={FIGMA_CARD_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — Wide desktop … Mobile; variant Card / Featured; Figma size підбирається автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · variant=${previewVariant} · size=${previewSize} · hover — pan + underline.`}
            code={LIVE_PREVIEW_CODE}
            previewValue={previewVariant}
            onPreviewValueChange={(value) =>
              setPreviewVariant(value as NewsCardPreviewVariant)
            }
            previewLabeledOptions={PREVIEW_VARIANT_OPTIONS}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <div className={styles.livePreviewSlot}>
              {previewVariant === "card" ? (
                <NewsCard variant="card" {...DEMO} size={previewSize as NewsCardSize} />
              ) : (
                <NewsCard
                  {...FEATURED_CARD}
                  size={previewSize as NewsCardFeaturedSize}
                />
              )}
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="variant=card vs variant=featured (desktop)."
        >
          <ShowcaseMatrix
            columns={["Card", "Featured"]}
            rows={[
              {
                cells: [
                  <NewsCard key="card" {...DEMO} />,
                  <NewsCard key="feat" {...FEATURED_CARD} />,
                ],
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="examples"
          description={`MainNews carousel · Figma 292:5047 · ${FIGMA_FEATURED_URL}`}
        >
          <ShowcasePreview className={styles.previewFeatured} flush constrainWidth>
            <MainNews
              card={featuredSlide}
              slideCount={slideCount}
              activeIndex={featuredIndex}
              onPrev={goPrev}
              onNext={goNext}
            />
          </ShowcasePreview>
          <p className={styles.hint}>
            Наведіть на блок — стрілки prev/next (292:5066). Slide{" "}
            {featuredIndex + 1}/{slideCount}
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            SubTag + Tag — окремі компоненти; pagination — NewsCardPagination
            (role=tablist).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Hover: image pan/zoom + title underline (CSS).",
              "MainNews: arrows on hover; onPrev/onNext з батька.",
              "prefers-reduced-motion вимикає pan/zoom.",
              "Featured не використовує size=tablet.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<a href> обгортає картку; <time> для date.",
              "h2/h3 за variant; featured desktop — h2.",
              "NewsCardPagination — role=tablist.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              'variant="card" у сітці новин',
              "tags[] для featured; tagLabel для card",
              "MainNews для hero-каруселі на головній",
            ]}
            dont={[
              'Не featured з size="tablet"',
              "Не дублюй SubTag/Tag markup",
            ]}
            alternatives={[
              { label: "Media Card", path: "media-card", note: "згадки ЗМІ" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Tag", path: "tag" },
              { label: "Media Card", path: "media-card" },
            ]}
            usedWith={[
              { label: "Filter Chip", path: "filter-chip" },
              { label: "Main Project", path: "main-project" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
