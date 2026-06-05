import type { ReactNode } from "react";
import type { TableColumn, TableSortDirection } from "./Table.types";

type Comparable = string | number;

function parseSortValue(value: ReactNode): Comparable {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return String(value ?? "");

  const dateMatch = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (dateMatch) {
    const [, day, month, year] = dateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }

  const numeric = value.replace(/\s/g, "").replace(",", ".");
  if (/^-?\d+(\.\d+)?$/.test(numeric)) return Number.parseFloat(numeric);

  return value;
}

function compareValues(a: Comparable, b: Comparable): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "uk", { numeric: true });
}

export function sortTableRows<T>(
  rows: T[],
  columns: TableColumn<T>[],
  sortColumnId: string | null | undefined,
  sortDirection: TableSortDirection | null | undefined,
): T[] {
  if (!sortColumnId || !sortDirection) return rows;

  const column = columns.find((item) => item.id === sortColumnId);
  if (!column?.sortable || !column.accessor) return rows;

  const accessor = column.accessor;
  const directionMultiplier = sortDirection === "asc" ? 1 : -1;

  return [...rows].sort((rowA, rowB) => {
    const a = parseSortValue(accessor(rowA));
    const b = parseSortValue(accessor(rowB));
    return compareValues(a, b) * directionMultiplier;
  });
}
