import { isValidElement, useEffect, useRef, type ReactNode } from "react";
import { useShowcaseViewport } from "../ShowcaseViewportContext";
import { showcaseViewportFrameStyle } from "./showcaseViewportFrame";
import styles from "./ShowcaseMatrix.module.css";

export type ShowcaseMatrixAlign = "start" | "center" | "end";

export type ShowcaseMatrixCell =
  | ReactNode
  | {
      label?: string;
      children: ReactNode;
      align?: ShowcaseMatrixAlign;
    };

export type ShowcaseMatrixRow = {
  rowLabel?: string;
  cells: ShowcaseMatrixCell[];
};

export type ShowcaseMatrixProps = {
  columns?: string[];
  rows: ShowcaseMatrixRow[];
  className?: string;
  compact?: boolean;
};

function normalizeCell(cell: ShowcaseMatrixCell): {
  label?: string;
  children: ReactNode;
  align: ShowcaseMatrixAlign;
} {
  if (
    !isValidElement(cell) &&
    cell !== null &&
    typeof cell === "object" &&
    !Array.isArray(cell) &&
    "children" in cell
  ) {
    const structured = cell as {
      label?: string;
      children: ReactNode;
      align?: ShowcaseMatrixAlign;
    };
    return {
      label: structured.label,
      children: structured.children,
      align: structured.align ?? "start",
    };
  }

  return { children: cell as ReactNode, align: "start" };
}

function alignClass(
  align: ShowcaseMatrixAlign,
  map: Record<ShowcaseMatrixAlign, string>,
): string {
  return map[align] ?? map.start;
}

export function ShowcaseMatrix({
  columns,
  rows,
  className,
  compact = false,
}: ShowcaseMatrixProps) {
  const { viewportWidth, typographyMode } = useShowcaseViewport();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapRef.current?.scrollTo({ left: 0, top: 0 });
  }, [viewportWidth]);

  const hasRowLabels = rows.some((row) => Boolean(row.rowLabel));
  const hasColumnHeaders = Boolean(columns?.length);
  const wrapClass = [
    styles.wrap,
    compact ? styles.compact : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={wrapRef} className={wrapClass}>
      <table className={styles.table}>
        {hasColumnHeaders ? (
          <thead>
            <tr>
              {hasRowLabels ? <th className={styles.corner} scope="col" /> : null}
              {columns!.map((label) => (
                <th key={label} className={styles.colHeader} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.rowLabel ?? `row-${rowIndex}`}>
              {row.rowLabel ? (
                <th className={styles.rowHeader} scope="row">
                  {row.rowLabel}
                </th>
              ) : null}
              {row.cells.map((cell, cellIndex) => {
                const { label, children, align } = normalizeCell(cell);
                const innerClass = alignClass(align, {
                  start: styles.cellInner,
                  center: `${styles.cellInner} ${styles.cellInnerCenter}`,
                  end: `${styles.cellInner} ${styles.cellInnerEnd}`,
                });
                const bodyClass = alignClass(align, {
                  start: styles.cellBody,
                  center: `${styles.cellBody} ${styles.cellBodyCenter}`,
                  end: `${styles.cellBody} ${styles.cellBodyEnd}`,
                });

                return (
                  <td
                    key={label ?? `cell-${rowIndex}-${cellIndex}`}
                    className={styles.cell}
                  >
                    <div className={innerClass}>
                      {label ? <p className={styles.cellLabel}>{label}</p> : null}
                      <div className={styles.cellViewport}>
                        <div
                          className={bodyClass}
                          style={showcaseViewportFrameStyle(viewportWidth)}
                          data-showcase-typography={typographyMode}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
