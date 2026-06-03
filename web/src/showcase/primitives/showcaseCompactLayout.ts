/** Target ≤3 grid rows for small datasets; cap at 3 columns. */
export function compactGridColumns(itemCount: number): 2 | 3 {
  if (itemCount <= 4) return 2;
  if (itemCount <= 9) return 3;
  return 3;
}

export function useCompactGrid(itemCount: number, preferCompact = true): boolean {
  if (!preferCompact) return false;
  return itemCount <= 12;
}
