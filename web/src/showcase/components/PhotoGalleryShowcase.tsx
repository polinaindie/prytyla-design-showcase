import { useMemo, useState } from "react";
import {
  PhotoGallery,
  type PhotoGalleryViewportTier,
} from "../../design-system/PhotoGallery";
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
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./PhotoGalleryShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1812-37641";

const DEMO_ITEMS = [
  {
    src: "/showcase/main-project-demo.jpg",
    alt: "Дрони Signum на підлозі",
    caption:
      "20 денних літаків-перехоплювачів для «Signum» 53 ОМБр",
  },
  {
    src: "/showcase/news-card-demo.jpg",
    alt: "Закупівля обладнання",
    caption:
      "Комплект мобільного комплексу виявлення цілей, що базується на БпЛА",
  },
  {
    src: "/showcase/project-card-demo.jpg",
    alt: "Поставка для підрозділу",
    caption: "Закупівля засобів звʼязку та спостереження для бригади",
  },
  {
    src: "/showcase/main-project-demo.jpg",
    alt: "Демонстрація комплекту",
    caption: "Презентація комплекту перехоплювачів волонтерам бригади",
  },
  {
    src: "/showcase/news-card-demo.jpg",
    alt: "Документи поставки",
    caption: "Підтверджуючі документи та фото передачі обладнання",
  },
] as const;

const ONE_ITEM = [DEMO_ITEMS[0]];

const FOUR_ITEMS = DEMO_ITEMS.slice(0, 4);

const MANY_ITEMS = [
  ...DEMO_ITEMS,
  {
    src: "/showcase/project-card-demo.jpg",
    alt: "Передача техніки",
    caption: "Передача техніки на позиції підрозділу",
  },
  {
    src: "/showcase/main-project-demo.jpg",
    alt: "Польові випробування",
    caption: "Польові випробування перехоплювачів перед передачею",
  },
  {
    src: "/showcase/news-card-demo.jpg",
    alt: "Звіт про використання",
    caption: "Звіт волонтерів про використання зібраних коштів",
  },
];

function photoGalleryTierForViewport(
  id: ShowcaseViewportId,
): PhotoGalleryViewportTier {
  if (id === "375") return "mobile";
  if (id === "768") return "tablet";
  return "wide";
}

const LIVE_PREVIEW_CODE = `import { PhotoGallery } from "@/design-system/PhotoGallery";

<PhotoGallery
  items={items}
  index={index}
  onIndexChange={setIndex}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "items",
    type: "PhotoGalleryItem[]",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Масив `{ src, alt?, caption }` — підпис змінюється з активним фото.",
  },
  {
    property: "index / onIndexChange",
    type: "number · (index) => void",
    typeKind: "TEXT",
    optionsDefault: "0",
    description: "0-based індекс активного слайду.",
  },
  {
    property: "viewportTier",
    type: '"wide" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: "—",
    description: "Явний Figma breakpoint для showcase; без пропа — container queries.",
  },
];

type TokenUsageSampleRow = {
  element: string;
  property: string;
  token: string;
  value?: string;
};

const TOKEN_USAGE_SAMPLE: readonly TokenUsageSampleRow[] = [
  { element: "Main image", property: "border-radius", token: "--radius-large" },
  { element: "Caption", property: "font-size", token: "--font-size-image-caption" },
  { element: "Caption", property: "font-weight", token: "Inter Medium", value: "500" },
  { element: "Caption", property: "color", token: "--text-default" },
  { element: "Stack gap", property: "gap", token: "--spacing-card-medium" },
  { element: "Thumbnails", property: "gap", token: "--spacing-gap-md" },
  { element: "Meta row", property: "gap", token: "--spacing-card-spacious" },
  { element: "Thumb active", property: "border-color", token: "--accent-secondary" },
  { element: "Nav button", property: "size", token: "--pryt-brand-scale-1000" },
  { element: "Mobile track", property: "gap", token: "--spacing-gap-sm" },
];

function PhotoGalleryShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [index, setIndex] = useState(0);

  const previewWidth = showcaseViewportWidth(previewViewportId);

  const usageValues = useCssVarValues(
    useMemo(
      () =>
        TOKEN_USAGE_SAMPLE.filter((row) => row.token.startsWith("--")).map(
          (row) => row.token,
        ),
      [],
    ),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: row.value ?? usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Photo Gallery"
        description="Галерея з підписом фото: підпис оновлюється при перемиканні головного зображення або мініатюри."
        status="stable"
        version="1.0"
        updatedAt="2026-06-05"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Перемикайте viewport. Desktop/tablet — стрілки (як у News) і мініатюри; mobile — горизонтальний скрол без стрілок."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · слайд ${index + 1} / ${DEMO_ITEMS.length}.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            scrollablePreview
            flush
            previewClassName={styles.livePreviewPanel}
          >
            <PhotoGallery
              viewportTier={photoGalleryTierForViewport(previewViewportId)}
              items={[...DEMO_ITEMS]}
              index={index}
              onIndexChange={setIndex}
            />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Кількість фото: 1 (без навігації), 4 (усі мініатюри в ряд) і багато (4 мініатюри + шматочок 5-ї на desktop/tablet, горизонтальний скрол слайдів на mobile)."
        >
          <div className={styles.variants}>
            <div className={styles.variantBlock}>
              <p className={styles.variantLabel}>1 фото — без стрілок і мініатюр</p>
              <ShowcasePreview>
                <PhotoGallery viewportTier="wide" items={ONE_ITEM} />
              </ShowcasePreview>
            </div>

            <div className={styles.variantBlock}>
              <p className={styles.variantLabel}>4 фото — мініатюри в ряд</p>
              <ShowcasePreview>
                <PhotoGallery viewportTier="wide" items={[...FOUR_ITEMS]} />
              </ShowcasePreview>
            </div>

            <div className={styles.variantBlock}>
              <p className={styles.variantLabel}>
                Багато фото ({MANY_ITEMS.length}) — 4 мініатюри + шматочок 5-ї, скрол
              </p>
              <ShowcasePreview>
                <PhotoGallery viewportTier="wide" items={MANY_ITEMS} />
              </ShowcasePreview>
            </div>
          </div>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Карусель — `aria-roledescription=\"carousel\"`, підпис — `aria-live=\"polite\"`.",
              "Мініатюри — `role=\"tablist\"`, активна — `aria-selected`.",
              "Стрілки та мініатюри — `aria-label` з описом дії.",
              "Клавіатура — Arrow Left / Right при фокусі на галереї.",
              "Mobile — горизонтальний скрол слайдів (без стрілок); тап по слайду оновлює підпис.",
              "1 фото — стрілки й мініатюри приховані автоматично.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Передавайте унікальний `caption` для кожного фото",
              "На mobile покладайтесь на горизонтальний скрол і тап по слайду",
              "Використовуйте `viewportTier` у showcase для перевірки всіх breakpoint",
            ]}
            dont={[
              "Не дублюйте Pagination для навігації між фото галереї",
              "Не хардкодьте розміри мініатюр — чекайте токени size/gallery-thumb-*",
              "Не використовуйте Evidence Viewer для inline галереї на сторінці",
            ]}
            alternatives={[
              { label: "Evidence Viewer", path: "evidence-viewer" },
              { label: "Pagination", path: "pagination" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Evidence Viewer", path: "evidence-viewer" },
              { label: "Media Card", path: "media-card" },
            ]}
            usedWith={[
              { label: "Icons", path: "icons" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function PhotoGalleryShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PhotoGalleryShowcasePage />
    </ShowcaseThemeProvider>
  );
}
