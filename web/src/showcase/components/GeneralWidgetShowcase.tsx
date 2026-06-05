import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  DEFAULT_PAYMENT_INFO_SECTIONS,
  GeneralWidget,
} from "../../design-system/GeneralWidget";
import type { GeneralWidgetPaymentTab } from "../../design-system/GeneralWidget";
import {
  GENERAL_WIDGET_ARTICLE_DESKTOP_WIDTH_PX,
  GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX,
  GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX,
  GENERAL_WIDGET_SCROLL_RANGE,
} from "../../design-system/GeneralWidget/generalWidgetScroll";
import { useArticleMorphDemo } from "./useArticleMorphDemo";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocSizeSwitch,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  figmaComponentSizeForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./GeneralWidgetShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=287-14741";

const FIGMA_DESKTOP_ARTICLE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=915-14314";

const FIGMA_TABLET_FULL_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=947-14263";

const FIGMA_TABLET_COLLAPSED_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1107-26075";

const FIGMA_MOBILE_FULL_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=947-19185";

const FIGMA_MOBILE_COLLAPSED_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1107-24593";

function articleLivePreviewFrameWidth(previewWidth: number): number {
  if (previewWidth >= 768 && previewWidth < 1024) {
    return GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX;
  }
  if (previewWidth < 768) {
    return GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX;
  }
  return GENERAL_WIDGET_ARTICLE_DESKTOP_WIDTH_PX;
}

const HERO_VARIANT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='329' height='374'%3E%3Crect fill='%23d1d1d1' width='329' height='374'/%3E%3C/svg%3E";

/** Той самий кадр, що з’являється в compact thumbnail при scroll (layout=article). */
const HERO_ARTICLE = publicAssetUrl("/images/general-widget-chyste-nebo-thumb.png");

const LIVE_PREVIEW_CODE = `import { GeneralWidget } from "@/design-system/GeneralWidget";

<GeneralWidget
  layout="article"
  progress={progress}
  hero={{ src: "/hero.jpg", alt: "Збір" }}
  paymentTab={tab}
  onPaymentTabChange={setTab}
  amount={amount}
  onAmountChange={setAmount}
  onQuickAmountClick={(v) => setAmount(String(v))}
  onPrimaryAction={submit}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "layout",
    type: '"full" | "wide" | "veryShort" | "sidebar" | "article"',
    typeKind: "VARIANT",
    optionsDefault: '"full"',
    description: "full sidebar card · wide donate page (582px) · veryShort / sidebar / article.",
  },
  {
    property: "defaultCollapsed / collapsed / onToggleCollapse",
    type: "boolean + callback",
    typeKind: "BOOLEAN",
    optionsDefault: "sidebar: true",
    description: "layout=sidebar — expand/collapse progress.",
  },
  {
    property: "showProgress",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Блок прогресу зверху (Progressbar=On).",
  },
  {
    property: "progress",
    type: "GeneralWidgetProgress",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Дані прогресу + thumbnail для veryShort / progress.",
  },
  {
    property: "hero",
    type: "{ src, alt }",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Hero без градієнта (до токена overlay).",
  },
  {
    property: "paymentType",
    type: '"active" | "done"',
    typeKind: "VARIANT",
    optionsDefault: '"active"',
    description: "done — завершений збір: progress 101% + звіт/новини (Figma 287:14857).",
  },
  {
    property: "showSubscriptionTab",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "true",
    description: "false — збори: лише Разово + Реквізити; true — + Щомісяця.",
  },
  {
    property: "donatePageCategory + hrefs",
    type: "military | foundation",
    typeKind: "VARIANT",
    optionsDefault: "—",
    description: "layout=wide — Tabs «Допомогти війську» / «Підтримати фонд» (1384:38290).",
  },
  {
    property: "showNewsletterOptIn / newsletterOptIn",
    type: "boolean + callback",
    typeKind: "BOOLEAN",
    optionsDefault: "wide: true",
    description: "Checkbox новин на wide once (1407:37355).",
  },
  {
    property: "paymentTab / defaultPaymentTab",
    type: "once | subscription | paymentInfo",
    typeKind: "VARIANT",
    optionsDefault: '"once"',
    description: "Controlled / початковий таб.",
  },
  {
    property: "currency / currencyOptions / onCurrencyChange",
    type: "string + CurrencyCode[] + callback",
    typeKind: "TEXT",
    optionsDefault: '"UAH" · UAH/USD/EUR',
    description: "Валюта в AmountBlock — CurrencySelect з вибором.",
  },
  {
    property: "paymentInfoSections",
    type: "GeneralWidgetPaymentInfoSection[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "DEFAULT_PAYMENT_INFO_SECTIONS",
    description: "Групи PaymentInfo для «Реквізити» (Figma 287:15037).",
  },
  {
    property: "articleScrollOffset",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Опційно: фіксований scroll (Storybook); live preview — window.scrollY.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Card", property: "background", token: "--surface-default" },
  { element: "Bank CTA", property: "background", token: "--surface-inverse" },
  { element: "Form", property: "border", token: "--border-default" },
  { element: "VeryShort", property: "border", token: "--accent-secondary" },
  { element: "Amount", property: "font-size", token: "--font-size-numbers-section" },
  { element: "Tab", property: "font-size", token: "--font-size-tab-label" },
  { element: "Progress title", property: "font-size", token: "--font-size-image-caption" },
  { element: "Form", property: "padding", token: "--space-large" },
  { element: "Card", property: "border-radius", token: "--radius-large" },
] as const;

const DEMO_PROGRESS = {
  value: 69,
  title: "Чисте небо",
  thumbnailSrc: HERO_ARTICLE,
  thumbnailAlt: "Чисте небо — збір на перехоплювачі ворожих БПЛА",
  collectedAmount: "48 388 780 ₴",
  goalAmount: "20 000 000 ₴",
};

/** Figma GeneralWidget Done — node 287:14857 */
const DEMO_DONE_PROGRESS = {
  value: 101,
  title: "Чисте небо",
  collectedAmount: "35 337 495 ₴",
  goalAmount: "35 000 000 ₴",
};

type GeneralWidgetVariantId =
  | "once"
  | "campaign"
  | "subscription"
  | "paymentInfo"
  | "done"
  | "veryShort";

const VARIANT_GALLERY_OPTIONS: {
  value: GeneralWidgetVariantId;
  label: string;
}[] = [
  { value: "once", label: "Once" },
  { value: "campaign", label: "Campaign" },
  { value: "subscription", label: "Subscription" },
  { value: "paymentInfo", label: "PaymentInfo" },
  { value: "done", label: "Done" },
  { value: "veryShort", label: "VeryShort" },
];

function GeneralWidgetVariantPreview({ variant }: { variant: GeneralWidgetVariantId }) {
  switch (variant) {
    case "once":
      return (
        <GeneralWidget
          defaultPaymentTab="once"
          hero={{ src: HERO_VARIANT, alt: "Hero" }}
        />
      );
    case "campaign":
      return (
        <GeneralWidget
          showSubscriptionTab={false}
          defaultPaymentTab="once"
          hero={{ src: HERO_VARIANT, alt: "Hero" }}
        />
      );
    case "subscription":
      return (
        <GeneralWidget
          defaultPaymentTab="subscription"
          hero={{ src: HERO_VARIANT, alt: "Hero" }}
        />
      );
    case "paymentInfo":
      return (
        <GeneralWidget
          defaultPaymentTab="paymentInfo"
          paymentInfoSections={DEFAULT_PAYMENT_INFO_SECTIONS}
          hero={{ src: HERO_VARIANT, alt: "Hero" }}
        />
      );
    case "done":
      return (
        <GeneralWidget
          paymentType="done"
          progress={DEMO_DONE_PROGRESS}
          hero={{ src: HERO_VARIANT, alt: "Hero" }}
        />
      );
    case "veryShort":
      return <GeneralWidget layout="veryShort" progress={DEMO_PROGRESS} />;
  }
}

type ArticleMorphPreviewProps = {
  scrollY: number;
  paymentTab: GeneralWidgetPaymentTab;
  onPaymentTabChange: (tab: GeneralWidgetPaymentTab) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  currency: string;
  onCurrencyChange: (code: string) => void;
  onQuickAmountClick: (value: number) => void;
  onPrimaryAction: () => void;
  showSubscriptionTab?: boolean;
  articleColumn?: "desktop" | "tablet" | "mobile";
  articleScrollContainerRef?: RefObject<HTMLDivElement | null>;
  onScrollToFull?: () => void;
};

function ArticleMorphPreview({
  scrollY,
  paymentTab,
  onPaymentTabChange,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  onQuickAmountClick,
  onPrimaryAction,
  showSubscriptionTab = true,
  articleColumn,
  articleScrollContainerRef,
  onScrollToFull,
}: ArticleMorphPreviewProps) {
  return (
    <GeneralWidget
      layout="article"
      progress={DEMO_PROGRESS}
      hero={{ src: HERO_ARTICLE, alt: "Hero" }}
      articleScrollOffset={scrollY}
      articleScrollNaturalLayout
      articleColumn={articleColumn}
      articleScrollContainerRef={articleScrollContainerRef}
      onScrollToFull={onScrollToFull}
      showSubscriptionTab={showSubscriptionTab}
      paymentTab={paymentTab}
      onPaymentTabChange={onPaymentTabChange}
      amount={amount}
      onAmountChange={onAmountChange}
      currency={currency}
      onCurrencyChange={onCurrencyChange}
      onQuickAmountClick={onQuickAmountClick}
      onPrimaryAction={onPrimaryAction}
    />
  );
}

function GeneralWidgetShowcasePage() {
  const { theme } = useShowcaseTheme();
  const livePreviewScrollRef = useRef<HTMLDivElement>(null);
  const { scrollY, isCollapsed, playCollapse, playExpand } = useArticleMorphDemo();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [tab, setTab] = useState<GeneralWidgetPaymentTab>("subscription");
  const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("UAH");
  const [donateCategory, setDonateCategory] = useState<"military" | "foundation">(
    "military",
  );
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [variantGalleryId, setVariantGalleryId] =
    useState<GeneralWidgetVariantId>("once");

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const livePreviewFrameWidth = articleLivePreviewFrameWidth(previewWidth);
  const componentSize = figmaComponentSizeForViewportWidth(previewWidth);

  const handleMorphDemoClick = () => {
    if (isCollapsed) {
      playExpand();
      return;
    }
    playCollapse();
  };

  const isTabletPreview = previewWidth >= 768 && previewWidth < 1024;
  const isMobilePreview = previewWidth < 768;
  const liveShowSubscriptionTab = !isTabletPreview;
  const livePaymentTab =
    isTabletPreview || isMobilePreview ? "once" : tab;

  useEffect(() => {
    if (livePaymentTab === "paymentInfo" && !isCollapsed) {
      playCollapse();
    }
  }, [livePaymentTab, isCollapsed, playCollapse]);

  const articleColumn: ArticleMorphPreviewProps["articleColumn"] =
    previewWidth >= 1024 ? "desktop" : previewWidth >= 768 ? "tablet" : "mobile";

  const articlePreviewProps: ArticleMorphPreviewProps = {
    scrollY,
    paymentTab: livePaymentTab,
    onPaymentTabChange: setTab,
    amount,
    onAmountChange: setAmount,
    currency,
    onCurrencyChange: setCurrency,
    onQuickAmountClick: (value) => setAmount(String(value)),
    onPrimaryAction: () => setAmount(amount === "0" ? "500" : amount),
    showSubscriptionTab: liveShowSubscriptionTab,
    articleColumn,
    articleScrollContainerRef: livePreviewScrollRef,
    onScrollToFull: playExpand,
  };

  const articleSlotClass = [
    styles.livePreviewArticleSlot,
    styles.livePreviewArticleSlotInScrollableFrame,
    previewWidth >= 1024
      ? styles.livePreviewArticleSlotDesktop
      : previewWidth >= 768
        ? styles.livePreviewArticleSlotTablet
        : styles.livePreviewArticleSlotMobile,
  ].join(" ");

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="General Widget"
        description="Віджет донату: hero, таби Once / Subscription / Реквізити, compact layouts для sidebar і статті."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description={`layout=article — scroll 0…${GENERAL_WIDGET_SCROLL_RANGE}px: hero → compact. Tablet full ${FIGMA_TABLET_FULL_URL.split("node-id=")[1]} · collapsed ${FIGMA_TABLET_COLLAPSED_URL.split("node-id=")[1]} · mobile full ${FIGMA_MOBILE_FULL_URL.split("node-id=")[1]} · collapsed ${FIGMA_MOBILE_COLLAPSED_URL.split("node-id=")[1]}.`}
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${componentSize}${isTabletPreview ? ` · tablet ${GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX}px (Figma 947:14263 / 1107:26075)` : isMobilePreview ? ` · mobile ${GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}px (Figma ${FIGMA_MOBILE_FULL_URL.split("node-id=")[1]})` : ` · desktop/laptop ${GENERAL_WIDGET_ARTICLE_DESKTOP_WIDTH_PX}px (Figma ${FIGMA_DESKTOP_ARTICLE_URL.split("node-id=")[1]})`}.`}
            code={LIVE_PREVIEW_CODE}
            scrollablePreview
            flush
            previewRef={livePreviewScrollRef}
            previewClassName={styles.livePreviewPreview}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            previewFrameWidth={livePreviewFrameWidth}
            previewActions={
              <button
                type="button"
                className={styles.morphDemoButton}
                onClick={handleMorphDemoClick}
              >
                {isCollapsed ? "Повернути повний вигляд" : "Подивитися анімацію"}
              </button>
            }
          >
            <div className={articleSlotClass}>
              <ArticleMorphPreview {...articlePreviewProps} />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Перемикач — один варіант у preview (Once · Campaign · Subscription · PaymentInfo · Done · VeryShort)."
        >
          <div className={styles.variantsGallery}>
            <ShowcaseDocSizeSwitch
              value={variantGalleryId}
              onChange={setVariantGalleryId}
              labeledOptions={VARIANT_GALLERY_OPTIONS}
              aria-label="Варіант General Widget"
            />
            <ShowcasePreview className={styles.previewCell}>
              <GeneralWidgetVariantPreview variant={variantGalleryId} />
            </ShowcasePreview>
          </div>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="sizes" description="layout визначає габарити (Figma).">
          <ShowcaseDocBulletList
            items={[
              "full — hero ~329×374 + форма (desktop donate).",
              "veryShort — compact embed з progress thumbnail.",
              "sidebar — sticky peek + click expand.",
              `article — scroll morph 0…260px; desktop/laptop ${GENERAL_WIDGET_ARTICLE_DESKTOP_WIDTH_PX}px (915:14314) · tablet ${GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX}px (947:14263 / 1107:26075) · mobile ${GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}px (947:19185).`,
              "article tablet full — hero + progress + форма в два стовпці (947:14263).",
              "article tablet collapsed — compact strip + CTA (1107:26075).",
              `article mobile ${GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}px — scroll morph (fluid container).`,
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "layout=wide — donate page 582px, category tabs, newsletter checkbox.",
              "showSubscriptionTab=false — збори: Разово + Реквізити.",
              "paymentType=done — ProgressBar Done 101%, «Переглянути звіт» + «Усі новини по проєкту».",
              "Таби once | subscription | paymentInfo — controlled або default.",
              "sidebar: клік progress → expand/collapse (окремо від article scroll).",
              "article: scroll morph — hero зникає; thumbnail = той самий src, що hero.",
              "article tablet (≥768px container): два стовпці; collapsed — CTA «Підтримати проєкт».",
              `article mobile ${GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}px — morph 0…260px → VeryShort (Figma 1107:24593).`,
              "article desktop/laptop 329px — morph 0…260px → compact Short (Figma 287:15090), форма лишається.",
              "Live preview: viewport 1920…375 + «Подивитися анімацію» (0…260px; desktop/laptop → стан 2, mobile → VeryShort).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="examples"
          description="Sidebar, wide donate page, done, Once + Progressbar=On. Article morph — у Live preview; tablet/mobile — Figma refs нижче."
        >
          <p className={styles.galleryCaption}>
            Tablet · повний (Figma 947:14263)
          </p>
          <ShowcasePreview
            viewportWidth={GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX}
            constrainWidth
            flush
            className={styles.livePreviewPreview}
          >
            <div
              className={`${styles.livePreviewArticleSlot} ${styles.livePreviewArticleSlotTablet}`}
            >
              <ArticleMorphPreview
                {...articlePreviewProps}
                scrollY={0}
                articleColumn="tablet"
                showSubscriptionTab={false}
                paymentTab="once"
                onPaymentTabChange={setTab}
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Tablet · колапс на скрол (Figma 1107:26075)
          </p>
          <ShowcasePreview
            viewportWidth={GENERAL_WIDGET_ARTICLE_TABLET_WIDTH_PX}
            constrainWidth
            flush
            className={styles.livePreviewPreview}
          >
            <div
              className={`${styles.livePreviewArticleSlot} ${styles.livePreviewArticleSlotTablet}`}
            >
              <ArticleMorphPreview
                {...articlePreviewProps}
                scrollY={GENERAL_WIDGET_SCROLL_RANGE}
                articleColumn="tablet"
                showSubscriptionTab={false}
                paymentTab="once"
                onPaymentTabChange={setTab}
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Mobile · повний (Figma 947:19185 · {GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}px)
          </p>
          <ShowcasePreview
            viewportWidth={GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}
            constrainWidth
            flush
            className={styles.livePreviewPreview}
          >
            <div
              className={`${styles.livePreviewArticleSlot} ${styles.livePreviewArticleSlotMobile}`}
            >
              <ArticleMorphPreview
                {...articlePreviewProps}
                scrollY={0}
                articleColumn="mobile"
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Mobile · колапс на скрол (Figma 1107:24593)
          </p>
          <ShowcasePreview
            viewportWidth={GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX}
            constrainWidth
            flush
            className={styles.livePreviewPreview}
          >
            <div
              className={`${styles.livePreviewArticleSlot} ${styles.livePreviewArticleSlotMobile}`}
            >
              <ArticleMorphPreview
                {...articlePreviewProps}
                scrollY={GENERAL_WIDGET_SCROLL_RANGE}
                articleColumn="mobile"
              />
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>layout=sidebar (клік expand)</p>
          <ShowcasePreview className={styles.previewCell}>
            <GeneralWidget
              layout="sidebar"
              progress={DEMO_PROGRESS}
              amount={amount}
              onAmountChange={setAmount}
              onQuickAmountClick={(value) => setAmount(String(value))}
              onPrimaryAction={() => setAmount(amount === "0" ? "500" : amount)}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            layout=wide · donate page (Figma 1384:38288)
          </p>
          <ShowcasePreview className={styles.previewCellWide}>
            <GeneralWidget
              layout="wide"
              donatePageCategory={donateCategory}
              onDonatePageCategoryChange={setDonateCategory}
              paymentTab={tab}
              onPaymentTabChange={setTab}
              amount={amount}
              onAmountChange={setAmount}
              currency={currency}
              onCurrencyChange={setCurrency}
              onQuickAmountClick={(value) => setAmount(String(value))}
              newsletterOptIn={newsletterOptIn}
              onNewsletterOptInChange={setNewsletterOptIn}
              newsletterEmail={newsletterEmail}
              onNewsletterEmailChange={setNewsletterEmail}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>paymentType=done (Figma 287:14857)</p>
          <ShowcasePreview className={styles.previewCell}>
            <GeneralWidget
              paymentType="done"
              progress={DEMO_DONE_PROGRESS}
              hero={{ src: HERO_VARIANT, alt: "Hero" }}
            />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>showProgress + Once</p>
          <ShowcasePreview className={styles.previewCell}>
            <GeneralWidget
              showProgress
              progress={DEMO_PROGRESS}
              defaultPaymentTab="once"
              hero={{ src: HERO_VARIANT, alt: "Hero" }}
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Таби — кнопки з aria-selected / panel visibility.",
              "PaymentInfo всередині — accordion semantics з PaymentInfoGroup.",
              "Copy buttons на реквізитах — aria-label.",
              "Sidebar collapse — button на progress header.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Компонуй ChipPaymentType, QuickAmount, Button, PaymentInfo, ProgressBar",
              "Дані (суми, реквізити, hero) — пропсами",
              "Hero без градієнта до токена overlay",
            ]}
            dont={[
              "Не хардкодь #ffa400 / rgba gradient у віджеті",
              "Не дублюй PaymentInfo-розмітку",
              "Не state props для hover табів",
            ]}
            alternatives={[
              { label: "Payment Info", path: "payment-info" },
              { label: "Progress Bar", path: "progress-bar" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Button", path: "button" },
              { label: "Payment Info", path: "payment-info" },
              { label: "Progress Bar", path: "progress-bar" },
              { label: "Quick Amount", path: "quick-amount" },
              { label: "Chip Payment Type", path: "chip-payment-type" },
            ]}
            usedWith={[
              { label: "Currency Select", path: "currency-select" },
              { label: "Text Field", path: "text-field" },
              { label: "Department Select", path: "department-select" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
