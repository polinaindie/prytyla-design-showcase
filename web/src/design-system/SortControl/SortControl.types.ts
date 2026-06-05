export type SortOption = {
  id: string;
  label: string;
};

/** Desktop: label + trigger inline (gap). Tablet/mobile bar: full width, space-between. */
export type SortControlLayout = "inline" | "bar";

export type SortControlProps = {
  options: SortOption[];
  value: string;
  onChange: (id: string) => void;
  /** @default "inline" */
  layout?: SortControlLayout;
  /** Static label before the trigger (Figma «Сортування»). */
  label?: string;
  /** Shown next to the selected option label, e.g. 16 → «(16)». */
  count?: number;
  disabled?: boolean;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default false */
  defaultOpen?: boolean;
};
