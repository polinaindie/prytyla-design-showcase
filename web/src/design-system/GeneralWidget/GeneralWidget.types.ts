import type { ReactNode, RefObject } from "react";
import type { CurrencyCode } from "../CurrencySelect";
import type {
  PaymentInfoField,
  PaymentInfoType,
} from "../PaymentInfo/PaymentInfo.types";

/**
 * - full — hero + форма (статичний, ~329px)
 * - wide — сторінка донату без hero (~582px, Figma 1384:38288)
 * - veryShort — статичний compact (embed)
 * - sidebar — click expand/collapse (desktop sticky peek)
 * - article — window.scrollY morph hero → compact (mobile article page)
 */
export type GeneralWidgetLayout =
  | "full"
  | "wide"
  | "veryShort"
  | "sidebar"
  | "article";

export type GeneralWidgetDonatePageCategory = "military" | "foundation";

export type GeneralWidgetPaymentTab = "once" | "subscription" | "paymentInfo";

/** Figma GeneralWidget PaymentType — active (donate) | done (завершений збір). */
export type GeneralWidgetPaymentType = "active" | "done";

export type GeneralWidgetPaymentInfoItem = {
  id: string;
  paymentType: PaymentInfoType;
  title: ReactNode;
  fields: PaymentInfoField[];
  description?: ReactNode;
};

export type GeneralWidgetPaymentInfoSection = {
  title: string;
  items: GeneralWidgetPaymentInfoItem[];
};

export type GeneralWidgetProgress = {
  value: number;
  title: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  collectedLabel?: string;
  collectedAmount: string;
  goalLabel?: string;
  goalAmount: string;
};

export type GeneralWidgetHero = {
  src: string;
  alt: string;
};

export type GeneralWidgetProps = {
  className?: string;
  layout?: GeneralWidgetLayout;
  /** layout=sidebar: початковий collapsed (default true) */
  defaultCollapsed?: boolean;
  /** layout=sidebar: controlled collapsed; без пропа — uncontrolled */
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  /**
   * layout=article: клік по compact progress (після скролу) — скрол сторінки до повного віджета.
   * За замовчуванням `window.scrollTo({ top: 0 })`.
   */
  onScrollToFull?: () => void;
  /**
   * layout=article: фіксований scroll offset (px від верху віджета) замість window.scrollY.
   * Для Storybook — напр. `GENERAL_WIDGET_SCROLL_RANGE` для compact-стану.
   */
  articleScrollOffset?: number;
  /**
   * layout=article: morph від `scrollTop` зовнішнього контейнера (напр. ShowcasePreview).
   * Не внутрішній скрол віджета. Взаємовиключно з `articleScrollOffset`.
   */
  articleScrollContainerRef?: RefObject<HTMLElement | null>;
  /**
   * layout=article + articleScrollOffset: не фіксувати height на root (showcase demo).
   * Morph лишається через header; форма не обрізається.
   */
  articleScrollNaturalLayout?: boolean;
  /** Прогрес зверху (Figma Progressbar=On) — лише layout=full */
  showProgress?: boolean;
  progress?: GeneralWidgetProgress;
  hero?: GeneralWidgetHero;
  /** active — donate form; done — progress + report CTAs (Figma 287:14857). */
  paymentType?: GeneralWidgetPaymentType;
  paymentTab?: GeneralWidgetPaymentTab;
  defaultPaymentTab?: GeneralWidgetPaymentTab;
  onPaymentTabChange?: (tab: GeneralWidgetPaymentTab) => void;
  /**
   * false — лише «Разово» + «Реквізити» (збори).
   * true — + «Щомісяця» (загальна підтримка фонду).
   * @default true
   */
  showSubscriptionTab?: boolean;
  amount?: string;
  defaultAmount?: string;
  onAmountChange?: (amount: string) => void;
  currency?: string;
  currencyOptions?: CurrencyCode[];
  onCurrencyChange?: (code: string) => void;
  quickAmounts?: number[];
  onQuickAmountClick?: (amount: number) => void;
  paymentInfoSections?: GeneralWidgetPaymentInfoSection[];
  primaryActionLabel?: string;
  /** Вкладка «Щомісяця» — primary CTA (Figma 287:14926). */
  subscriptionPrimaryActionLabel?: string;
  /** Вкладка «Щомісяця» — special CTA «Долучитись». */
  subscriptionSecondaryActionLabel?: string;
  /** Посилання «скасувати» у callout банері підписки. */
  subscriptionCancelHref?: string;
  onSubscriptionCancel?: () => void;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  /**
   * layout=wide — «Допомогти війську» / «Підтримати фонд» (Figma 1384:38290).
   * Разом з militaryDonateHref / foundationDonateHref — навігація між сторінками.
   */
  donatePageCategory?: GeneralWidgetDonatePageCategory;
  onDonatePageCategoryChange?: (category: GeneralWidgetDonatePageCategory) => void;
  militaryDonateHref?: string;
  foundationDonateHref?: string;
  /** layout=wide + once — checkbox новин (Figma 1407:37355). @default true для wide */
  showNewsletterOptIn?: boolean;
  newsletterOptIn?: boolean;
  defaultNewsletterOptIn?: boolean;
  onNewsletterOptInChange?: (checked: boolean) => void;
  newsletterOptInLabel?: string;
  /** Показується коли newsletterOptIn — Figma 1407:37504 */
  newsletterEmail?: string;
  defaultNewsletterEmail?: string;
  onNewsletterEmailChange?: (email: string) => void;
  newsletterEmailLabel?: string;
};
