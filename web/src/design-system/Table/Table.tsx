import { useMemo } from "react";
import { IconDocumentView, IconPhotos } from "../Icons";
import { TableCell } from "./TableCell";
import { sortTableRows } from "./tableSortUtils";
import type { TableColumn, TableProps, TableSortDirection } from "./Table.types";
import styles from "./Table.module.css";

function nextSortDirection(
  columnId: string,
  currentColumnId: string | null | undefined,
  currentDirection: TableSortDirection | null | undefined,
): TableSortDirection | null {
  if (currentColumnId !== columnId || !currentDirection) return "desc";
  if (currentDirection === "desc") return "asc";
  return null;
}

function bodyVariant(
  rowIndex: number,
  emphasis: boolean | undefined,
): "odd" | "even" | "odd-main" | "even-main" {
  const even = rowIndex % 2 === 0;
  if (emphasis) return even ? "even-main" : "odd-main";
  return even ? "even" : "odd";
}

function renderIconCell<T>(
  column: TableColumn<T>,
  row: T,
  onPhotosClick?: (row: T) => void,
  onDocumentClick?: (row: T) => void,
  iconSize = 24,
) {
  if (column.iconCell === "photos") {
    return (
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Переглянути фото видачі"
        onClick={() => onPhotosClick?.(row)}
      >
        <IconPhotos size={iconSize} aria-hidden />
      </button>
    );
  }

  if (column.iconCell === "document") {
    return (
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Переглянути акт видачі"
        onClick={() => onDocumentClick?.(row)}
      >
        <IconDocumentView size={iconSize} aria-hidden />
      </button>
    );
  }

  return null;
}

export function Table<T>({
  columns,
  rows,
  getRowKey,
  sortColumnId,
  sortDirection,
  onSortChange,
  onPhotosClick,
  onDocumentClick,
  className,
  ariaLabel = "Таблиця даних",
}: TableProps<T>) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const displayRows = useMemo(
    () => sortTableRows(rows, columns, sortColumnId, sortDirection),
    [rows, columns, sortColumnId, sortDirection],
  );

  const handleSort = (columnId: string) => {
    const next = nextSortDirection(columnId, sortColumnId, sortDirection);
    onSortChange?.(columnId, next);
  };

  return (
    <div className={rootClass}>
      <div
        className={styles.tableDesktop}
        role="table"
        aria-label={ariaLabel}
      >
        <div className={styles.row} role="row">
          {columns.map((column) => (
            <TableCell
              key={column.id}
              variant="header"
              align={column.align}
              width={column.width}
              minWidth={column.minWidth}
              flex={column.flex}
              sortable={column.sortable}
              sortActive={sortColumnId === column.id && Boolean(sortDirection)}
              sortDirection={
                sortColumnId === column.id ? sortDirection : null
              }
              onSortClick={() => handleSort(column.id)}
            >
              {column.header}
            </TableCell>
          ))}
        </div>

        {displayRows.map((row, rowIndex) => (
          <div key={getRowKey(row, rowIndex)} className={styles.row} role="row">
            {columns.map((column) => {
              const variant = bodyVariant(rowIndex, column.emphasis);

              if (column.iconCell) {
                return (
                  <TableCell
                    key={column.id}
                    variant={variant}
                    align="center"
                    width={column.width}
                    minWidth={column.minWidth}
                    flex={column.flex}
                  >
                    {renderIconCell(column, row, onPhotosClick, onDocumentClick)}
                  </TableCell>
                );
              }

              const value = column.accessor?.(row);

              return (
                <TableCell
                  key={column.id}
                  variant={variant}
                  align={column.align}
                  width={column.width}
                  minWidth={column.minWidth}
                  flex={column.flex}
                >
                  {value}
                </TableCell>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className={styles.tableCompact}
        role="table"
        aria-label={ariaLabel}
      >
        {displayRows.map((row, rowIndex) => {
          const recordTone =
            rowIndex % 2 === 0 ? styles.recordCompactEven : styles.recordCompactOdd;

          return (
            <div
              key={getRowKey(row, rowIndex)}
              className={[styles.recordCompact, recordTone]
                .filter(Boolean)
                .join(" ")}
            >
              {columns.map((column) => (
                <div
                  key={column.id}
                  className={styles.fieldRow}
                  role="row"
                >
                  <div className={styles.fieldLabel} role="rowheader">
                    {column.header}
                  </div>
                  <div className={styles.fieldValue} role="cell">
                    {column.iconCell ? (
                      renderIconCell(
                        column,
                        row,
                        onPhotosClick,
                        onDocumentClick,
                        20,
                      )
                    ) : (
                      <p
                        className={
                          column.emphasis
                            ? styles.valueStackLineMain
                            : styles.valueStackLine
                        }
                      >
                        {column.accessor?.(row)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
