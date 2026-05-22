import type { ReactNode } from "react";
import type {
  PaymentInfoField,
  PaymentInfoType,
} from "../PaymentInfo/PaymentInfo.types";

/** Figma GeneralWidget — ітерація 1: once | paymentInfo | veryShort */
export type GeneralWidgetLayout = "full" | "veryShort";

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
  /** full — hero + форма; veryShort — лише progress-картка */
  layout?: GeneralWidgetLayout;
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
