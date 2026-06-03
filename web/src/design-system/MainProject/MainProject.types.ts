import type { HTMLAttributes } from "react";

/** Figma Main project 16:10164 — featured hero зі збором. */
export type MainProjectSize = "desktop" | "tablet" | "mobile";

export type MainProjectProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** Сторінка збору (клік по hero, крім CTA). */
  href: string;
  /** Зовнішній донат. */
  donateHref: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  progress: number;
  collectedAmount: string;
  goalAmount: string;
  collectedLabel?: string;
  goalLabel?: string;
  donateLabel?: string;
  cardAriaLabel?: string;
  size?: MainProjectSize;
};
