import type { HTMLAttributes, ReactNode } from "react";

/** Figma Badge (1318:54208) — dismissible tag with label + close. */
export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  children: ReactNode;
  /** Called when the user clicks the × control. */
  onDismiss: () => void;
  /** Accessible name for the dismiss control. */
  dismissLabel?: string;
  /**
   * Breadcrumb of parent categories; shows Tooltip on hover (Figma 1318:54224).
   * Omit for flat tags without hierarchy.
   */
  categoryPath?: readonly string[];
};
