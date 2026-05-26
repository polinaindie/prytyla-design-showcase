import type { HTMLAttributes } from "react";
import type { NewsCardFeaturedProps } from "./NewsCard.types";

/** Figma Main News 292:5047 / slide row 292:5066 — featured card + dots + nav on hover. */
export type MainNewsProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  card: NewsCardFeaturedProps;
  /** Кількість слайдів для pagination. @default 3 */
  slideCount?: number;
  activeIndex?: number;
  onPrev?: () => void;
  onNext?: () => void;
  /** Показувати стрілку «назад» (Figma slide 2+). @default true */
  showPrev?: boolean;
  /** Показувати стрілку «вперед». @default true */
  showNext?: boolean;
};
