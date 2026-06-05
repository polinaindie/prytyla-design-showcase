export type EvidenceViewerMode = "document" | "photo";

export type EvidenceViewerItem = {
  src: string;
  alt?: string;
};

export type EvidenceViewerLayout = "modal" | "embedded";

/** Figma frame tier — wide (1920/1440/1200), tablet (768), mobile (375). */
export type EvidenceViewerViewportTier = "wide" | "tablet" | "mobile";

export type EvidenceViewerProps = {
  className?: string;
  /** @default true */
  open?: boolean;
  onClose?: () => void;
  /**
   * `modal` — fixed overlay (product).
   * `embedded` — fills parent (showcase preview frame).
   * @default "modal"
   */
  layout?: EvidenceViewerLayout;
  /**
   * Явний Figma breakpoint. Без пропа — container queries на ширину контейнера.
   * Showcase передає з viewport toggle.
   */
  viewportTier?: EvidenceViewerViewportTier;
  title: string;
  mode: EvidenceViewerMode;
  items: EvidenceViewerItem[];
  /** 1-based; controlled */
  page?: number;
  /** @default 1 */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  closeLabel?: string;
};
