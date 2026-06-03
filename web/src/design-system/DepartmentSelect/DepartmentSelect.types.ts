export type DepartmentOption = {
  id: string;
  label: string;
};

export type DepartmentSelectProps = {
  options: DepartmentOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  /** Пошук (Figma «Пошук відомства»). */
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  searchPlaceholder?: string;
  /** Figma Variant2 — футер «Обрано: N» + «Очистити обрані». */
  showFooter?: boolean;
  onClearSelection?: () => void;
  clearSelectionLabel?: string;
  selectedCountLabel?: (count: number) => string;
  className?: string;
};
