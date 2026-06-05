import type { ReactNode } from "react";

export type TableSortDirection = "asc" | "desc";

export type TableColumnAlign = "left" | "right" | "center";

export type TableCellVariant =
  | "header"
  | "odd"
  | "even"
  | "odd-main"
  | "even-main";

export type TableIconCell = "photos" | "document";

export type TableColumn<T> = {
  id: string;
  header: ReactNode;
  /** Fixed width in px or CSS length; omit with `flex` for fluid columns. */
  width?: number | string;
  minWidth?: number;
  flex?: boolean;
  align?: TableColumnAlign;
  /** Bold body cell (Figma «Main» variant). */
  emphasis?: boolean;
  sortable?: boolean;
  /** Icon-only action column (Фото видачі / Акт видачі). */
  iconCell?: TableIconCell;
  accessor?: (row: T) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  sortColumnId?: string | null;
  sortDirection?: TableSortDirection | null;
  onSortChange?: (
    columnId: string,
    direction: TableSortDirection | null,
  ) => void;
  onPhotosClick?: (row: T) => void;
  onDocumentClick?: (row: T) => void;
  className?: string;
  ariaLabel?: string;
};

export type TableCellProps = {
  variant: TableCellVariant;
  align?: TableColumnAlign;
  width?: number | string;
  minWidth?: number;
  flex?: boolean;
  sortable?: boolean;
  sortActive?: boolean;
  sortDirection?: TableSortDirection | null;
  onSortClick?: () => void;
  className?: string;
  children?: ReactNode;
};
