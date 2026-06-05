import type { TableCellProps } from "./Table.types";
import { TableSortIcon, type TableSortIconState } from "./TableSortIcon";
import styles from "./Table.module.css";

function sortIconState(
  sortActive: boolean | undefined,
  sortDirection: TableCellProps["sortDirection"],
): TableSortIconState {
  if (!sortActive || !sortDirection) return "default";
  return sortDirection;
}

function sortAriaLabel(state: TableSortIconState): string {
  switch (state) {
    case "desc":
      return "Сортування від більшого до меншого. Натисніть для зміни";
    case "asc":
      return "Сортування від меншого до більшого. Натисніть для зміни";
    default:
      return "Сортувати колонку";
  }
}

function cellVariantClass(variant: TableCellProps["variant"]): string {
  switch (variant) {
    case "header":
      return styles.cellHeader;
    case "odd-main":
      return styles.cellOddMain;
    case "even-main":
      return styles.cellEvenMain;
    case "odd":
      return styles.cellOdd;
    case "even":
    default:
      return styles.cellEven;
  }
}

function labelVariantClass(variant: TableCellProps["variant"]): string {
  const classes = [styles.label];

  if (variant === "header") {
    classes.push(styles.labelHeader);
  } else if (variant === "odd-main" || variant === "even-main") {
    classes.push(styles.labelMain);
  }

  return classes.join(" ");
}

export function TableCell({
  variant,
  align = "left",
  width,
  minWidth,
  flex,
  sortable,
  sortActive,
  sortDirection,
  onSortClick,
  className,
  children,
}: TableCellProps) {
  const iconState = sortIconState(sortActive, sortDirection);
  const cellClass = [
    styles.cell,
    cellVariantClass(variant),
    flex ? styles.cellFlex : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClass = [
    styles.content,
    variant === "header" ? styles.contentHeader : "",
    align === "right" ? styles.contentAlignRight : "",
    align === "center" ? styles.contentAlignCenter : "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClass = [
    labelVariantClass(variant),
    align === "right" ? styles.labelAlignRight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    width: flex ? undefined : width,
    minWidth,
  };

  return (
    <div className={cellClass} style={style} role={variant === "header" ? "columnheader" : "cell"}>
      <div className={contentClass}>
        {typeof children === "string" || typeof children === "number" ? (
          <p className={labelClass}>{children}</p>
        ) : (
          children
        )}
        {variant === "header" && sortable ? (
          <button
            type="button"
            className={[
              styles.sortButton,
              iconState !== "default" ? styles.sortButtonActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={sortAriaLabel(iconState)}
            aria-pressed={sortActive ?? false}
            onClick={onSortClick}
          >
            <TableSortIcon state={iconState} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
