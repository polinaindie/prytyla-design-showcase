export type PaginationProps = {
  /** Current page (1-based). */
  page: number;
  /** Total item count (e.g. 1935). */
  totalItems: number;
  /** Items per page (e.g. 15). */
  pageSize: number;
  /** @default [10, 15, 25, 50] */
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  /** Override status prefix. @default "Відображено" */
  statusShownLabel?: string;
  /** @default "записів з" */
  statusOfLabel?: string;
  /** @default "перейти на" */
  jumpPrefixLabel?: string;
  /** @default "сторінку" */
  jumpSuffixLabel?: string;
  /** @default "записів на сторінці" */
  pageSizeSuffixLabel?: string;
};
