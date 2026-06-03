import type { GeneralWidgetPaymentTab } from "./GeneralWidget.types";

/** px — діапазон scrollY для повної анімації collapse (t = clamp(y / RANGE, 0, 1)) */
export const GENERAL_WIDGET_SCROLL_RANGE = 260;

/** Figma 915:14314 — desktop/laptop article card */
export const GENERAL_WIDGET_ARTICLE_DESKTOP_WIDTH_PX = 329;
/** Mobile article — fluid container, ширина 343px */
export const GENERAL_WIDGET_ARTICLE_MOBILE_WIDTH_PX = 343;

export const GENERAL_WIDGET_IMAGE_MAX_H = 374;
export const GENERAL_WIDGET_THUMB_W = 74;
export const GENERAL_WIDGET_THUMB_H = 95;
export const GENERAL_WIDGET_THUMB_GAP = 14;
export const GENERAL_WIDGET_TITLE_MAX_H = 43;

/** Figma 287:14788 Once + Progressbar=On */
export const GENERAL_WIDGET_FULL_H_ONCE = 837;
/** Figma 287:14962 Subscription + Progressbar=On */
export const GENERAL_WIDGET_FULL_H_SUBSCRIPTION = 923;

/** Figma 287:15090 Short + Progressbar=On */
export const GENERAL_WIDGET_COLLAPSED_H_ONCE = 506;
/**
 * Figma 287:15090 (506) + delta full Subscription vs Once (923−837).
 * Compact article + 3 таби + callout «Щомісяця».
 */
export const GENERAL_WIDGET_COLLAPSED_H_SUBSCRIPTION = 592;
export const GENERAL_WIDGET_COLLAPSED_H_PAYMENT_INFO = 631;

/** Figma 287:15104 — compact progress (py 24 + thumb 95, measured ~149px) */
export const GENERAL_WIDGET_PROGRESS_COMPACT_H = 149;
/** Figma 287:14980 — expanded progress під hero (без thumb) */
export const GENERAL_WIDGET_PROGRESS_EXPANDED_FALLBACK_H = 120;

export const GENERAL_WIDGET_PROGRESS_SECTION_FALLBACK_H =
  GENERAL_WIDGET_PROGRESS_EXPANDED_FALLBACK_H;

export type GeneralWidgetScrollMetrics = {
  t: number;
  heroOpacity: number;
  headerHeight: number;
  thumbOpacity: number;
  thumbWidth: number;
  thumbHeight: number;
  thumbGap: number;
  titleAnimH: number;
  titleOpacity: number;
  widgetHeight: number | null;
  useAutoHeight: boolean;
};

export function getScrollT(scrollY: number): number {
  return Math.min(1, Math.max(0, scrollY / GENERAL_WIDGET_SCROLL_RANGE));
}

/** Затримана поява title: opacity = clamp((t - 0.3) / 0.7, 0, 1) */
export function getScrollTitleOpacity(t: number): number {
  return Math.max(0, Math.min(1, (t - 0.3) / 0.7));
}

export function getGeneralWidgetFullHeight(
  activeTab: GeneralWidgetPaymentTab,
): number | null {
  if (activeTab === "paymentInfo") {
    return null;
  }
  return activeTab === "subscription"
    ? GENERAL_WIDGET_FULL_H_SUBSCRIPTION
    : GENERAL_WIDGET_FULL_H_ONCE;
}

export function getGeneralWidgetCollapsedHeight(
  activeTab: GeneralWidgetPaymentTab,
): number {
  switch (activeTab) {
    case "paymentInfo":
      return GENERAL_WIDGET_COLLAPSED_H_PAYMENT_INFO;
    case "subscription":
      return GENERAL_WIDGET_COLLAPSED_H_SUBSCRIPTION;
    default:
      return GENERAL_WIDGET_COLLAPSED_H_ONCE;
  }
}

function getProgressSectionMorphHeight(
  t: number,
  progressExpandedHeight: number,
): number {
  const expanded =
    progressExpandedHeight > 0
      ? progressExpandedHeight
      : GENERAL_WIDGET_PROGRESS_EXPANDED_FALLBACK_H;
  return Math.round(
    expanded * (1 - t) + GENERAL_WIDGET_PROGRESS_COMPACT_H * t,
  );
}

export function getGeneralWidgetScrollMetrics(
  scrollY: number,
  activeTab: GeneralWidgetPaymentTab,
  progressExpandedHeight = GENERAL_WIDGET_PROGRESS_EXPANDED_FALLBACK_H,
): GeneralWidgetScrollMetrics {
  /** Реквізити — завжди compact (hero прихований), щоб список переказів був видимий без внутрішнього скролу. */
  const t = activeTab === "paymentInfo" ? 1 : getScrollT(scrollY);
  const fullH = getGeneralWidgetFullHeight(activeTab);
  const collapsedH = getGeneralWidgetCollapsedHeight(activeTab);
  const progressH = getProgressSectionMorphHeight(t, progressExpandedHeight);

  return {
    t,
    heroOpacity: 1 - t,
    headerHeight: Math.round(GENERAL_WIDGET_IMAGE_MAX_H * (1 - t) + progressH),
    thumbOpacity: t,
    thumbWidth: Math.round(GENERAL_WIDGET_THUMB_W * t),
    thumbHeight: Math.round(GENERAL_WIDGET_THUMB_H * t),
    thumbGap: Math.round(GENERAL_WIDGET_THUMB_GAP * t),
    titleAnimH: Math.round(GENERAL_WIDGET_TITLE_MAX_H * t),
    titleOpacity: getScrollTitleOpacity(t),
    widgetHeight:
      fullH != null ? Math.round(fullH * (1 - t) + collapsedH * t) : null,
    useAutoHeight: activeTab === "paymentInfo",
  };
}
