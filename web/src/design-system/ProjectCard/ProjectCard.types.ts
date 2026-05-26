import type { HTMLAttributes } from "react";

/** Figma Project Card 16:9982 — Size Desktop | Tablet | Mobile. */
export type ProjectCardSize = "desktop" | "tablet" | "mobile";

export type ProjectCardProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** Сторінка проєкту (вся картка, крім CTA «Підтримати»). */
  href: string;
  /** Зовнішній ресурс донату (кнопка). */
  donateHref: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  /** 0–100 для ProgressBar. */
  progress: number;
  collectedAmount: string;
  goalAmount: string;
  collectedLabel?: string;
  goalLabel?: string;
  donateLabel?: string;
  /** aria-label для overlay-посилання картки; за замовчуванням — title. */
  cardAriaLabel?: string;
  size?: ProjectCardSize;
};
