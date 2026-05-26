import type { ReactNode } from "react";
import type {
  PaymentInfoField,
  PaymentInfoType,
} from "../PaymentInfo/PaymentInfo.types";

/**
 * - full — hero + форма (статичний)
 * - veryShort — статичний compact (embed)
 * - sidebar — click expand/collapse (desktop sticky peek)
 * - article — window.scrollY morph hero → compact (mobile article page)
 */
export type GeneralWidgetLayout = "full" | "veryShort" | "sidebar" | "article";

export type GeneralWidgetPaymentTab = "once" | "subscription" | "paymentInfo";

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
   * Для showcase / Storybook — напр. `GENERAL_WIDGET_SCROLL_RANGE` для compact-стану.
   */
  articleScrollOffset?: number;
  /** Прогрес зверху (Figma Progressbar=On) — лише layout=full */
  showProgress?: boolean;
  progress?: GeneralWidgetProgress;
  hero?: GeneralWidgetHero;
  paymentTab?: GeneralWidgetPaymentTab;
  defaultPaymentTab?: GeneralWidgetPaymentTab;
  onPaymentTabChange?: (tab: GeneralWidgetPaymentTab) => void;
  amount?: string;
  currency?: string;
  quickAmounts?: number[];
  onQuickAmountClick?: (amount: number) => void;
  paymentInfoSections?: GeneralWidgetPaymentInfoSection[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  /** Контент вкладки «Щомісяця» до наступної ітерації */
  subscriptionPlaceholder?: ReactNode;
};
