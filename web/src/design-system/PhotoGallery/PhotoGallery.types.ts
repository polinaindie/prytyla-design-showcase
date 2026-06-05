export type PhotoGalleryItem = {
  src: string;
  alt?: string;
  /** Підпис під головним фото; змінюється при перемиканні слайду. */
  caption: string;
};

/** Figma frame tier — wide (1920/1440/1200), tablet (768), mobile (375). */
export type PhotoGalleryViewportTier = "wide" | "tablet" | "mobile";

export type PhotoGalleryProps = {
  className?: string;
  items: PhotoGalleryItem[];
  /** 0-based; controlled */
  index?: number;
  /** @default 0 */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /**
   * Явний Figma breakpoint. Без пропа — container queries на ширину контейнера.
   * Showcase передає з viewport toggle.
   */
  viewportTier?: PhotoGalleryViewportTier;
  previousLabel?: string;
  nextLabel?: string;
};
