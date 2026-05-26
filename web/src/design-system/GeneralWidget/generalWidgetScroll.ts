import type { GeneralWidgetPaymentTab } from "./GeneralWidget.types";

/** px — діапазон window.scrollY для повної анімації collapse */
export const GENERAL_WIDGET_SCROLL_RANGE = 260;

const IMAGE_MAX_H = 374;
const THUMB_W = 74;
const WIDGET_FULL_H = 837;
const COLLAPSED_H_ONCE = 506;
const COLLAPSED_H_PAYMENT_INFO = 631;
const TITLE_ANIM_MAX_H = 43;

export type GeneralWidgetScrollMetrics = {
  t: number;
  heroOpacity: number;
  heroHeight: number;
  thumbOpacity: number;
  thumbWidth: number;
  titleAnimH: number;
  widgetHeight: number | null;
  useAutoHeight: boolean;
};

export function getScrollT(scrollY: number): number {
  return Math.min(1, Math.max(0, scrollY / GENERAL_WIDGET_SCROLL_RANGE));
}

export function getGeneralWidgetScrollMetrics(
  scrollY: number,
  activeTab: GeneralWidgetPaymentTab,
): GeneralWidgetScrollMetrics {
  const t = getScrollT(scrollY);

  const collapsedH =
    activeTab === "paymentInfo" ? COLLAPSED_H_PAYMENT_INFO : COLLAPSED_H_ONCE;

  return {
    t,
    heroOpacity: 1 - t,
    heroHeight: Math.round(IMAGE_MAX_H * (1 - t)),
    thumbOpacity: t,
    thumbWidth: Math.round(THUMB_W * t),
    titleAnimH: Math.round(TITLE_ANIM_MAX_H * t),
    widgetHeight:
      activeTab === "paymentInfo"
        ? null
        : Math.round(WIDGET_FULL_H * (1 - t) + collapsedH * t),
    useAutoHeight: activeTab === "paymentInfo",
  };
}
