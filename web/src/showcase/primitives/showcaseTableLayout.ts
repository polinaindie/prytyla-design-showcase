/** @deprecated Layout is always single-column; kept for optional future grouping hints. */
export const SHOWCASE_SMALL_TABLE_MAX_ROWS = 10;

export function isSmallTable(rowCount: number): boolean {
  return rowCount > 0 && rowCount <= SHOWCASE_SMALL_TABLE_MAX_ROWS;
}
