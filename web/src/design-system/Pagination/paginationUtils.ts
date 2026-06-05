export type PaginationItem = number | "ellipsis";

export function getDisplayedRange(
  page: number,
  pageSize: number,
  totalItems: number,
): { start: number; end: number } {
  if (totalItems <= 0) {
    return { start: 0, end: 0 };
  }
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  return { start, end };
}

export function getPageCount(totalItems: number, pageSize: number): number {
  if (pageSize <= 0) return 0;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

/** Page number strip — Figma pattern: 1, 2, 3, …, last. */
export function buildPaginationItems(
  page: number,
  pageCount: number,
): PaginationItem[] {
  if (pageCount <= 0) return [];
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const items: PaginationItem[] = [1];

  let rangeStart = Math.max(2, page - 1);
  let rangeEnd = Math.min(pageCount - 1, page + 1);

  if (page <= 3) {
    rangeStart = 2;
    rangeEnd = 3;
  } else if (page >= pageCount - 2) {
    rangeStart = pageCount - 2;
    rangeEnd = pageCount - 1;
  }

  if (rangeStart > 2) {
    items.push("ellipsis");
  } else {
    for (let p = 2; p < rangeStart; p += 1) {
      items.push(p);
    }
  }

  for (let p = rangeStart; p <= rangeEnd; p += 1) {
    items.push(p);
  }

  if (rangeEnd < pageCount - 1) {
    items.push("ellipsis");
  } else {
    for (let p = rangeEnd + 1; p < pageCount; p += 1) {
      items.push(p);
    }
  }

  if (pageCount > 1) {
    items.push(pageCount);
  }

  return items;
}
