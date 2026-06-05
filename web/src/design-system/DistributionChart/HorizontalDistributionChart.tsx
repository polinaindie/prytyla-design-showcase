import { useId, useState, type CSSProperties } from "react";
import { ChartTooltip } from "./ChartTooltip";
import {
  formatChartCurrency,
  formatChartShare,
  IMPACT_CHART_AXIS_LABELS,
  IMPACT_CHART_AXIS_MAX,
} from "./chartFormat";
import { chartColorVar, chartPaletteVars } from "./chartPalette";
import type {
  DistributionChartRow,
  DistributionChartSegment,
  HorizontalDistributionChartProps,
} from "./DistributionChart.types";
import styles from "./HorizontalDistributionChart.module.css";

function barWidthPercent(value: number, axisMax: number): string {
  const clamped = Math.max(0, Math.min(value / axisMax, 1));
  return `${(clamped * 100).toFixed(4)}%`;
}

function resolveSegments(
  row: DistributionChartRow,
  rowIndex: number,
  totalRows: number,
  palette: HorizontalDistributionChartProps["palette"],
  stacked: boolean,
): Array<{ segment: DistributionChartSegment; colorVar: string }> {
  if (stacked && row.segments && row.segments.length > 0) {
    return row.segments.map((segment, segmentIndex) => ({
      segment,
      colorVar: chartColorVar(
        palette,
        rowIndex + segmentIndex,
        totalRows + (row.segments?.length ?? 1),
      ),
    }));
  }

  return [
    {
      segment: {
        id: row.id,
        label: row.label,
        value: row.value,
      },
      colorVar: chartColorVar(palette, rowIndex, totalRows),
    },
  ];
}

export function HorizontalDistributionChart({
  title,
  rows,
  axisMax = IMPACT_CHART_AXIS_MAX,
  axisLabels = IMPACT_CHART_AXIS_LABELS,
  palette,
  stacked = false,
  className,
}: HorizontalDistributionChartProps) {
  const tooltipId = useId();
  const [activeSegment, setActiveSegment] = useState<{
    rowId: string;
    segmentId: string;
    colorVar: string;
    segment: DistributionChartSegment;
  } | null>(null);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const gridStyle = {
    ["--chart-grid-columns" as string]: String(axisLabels.length),
  } as CSSProperties;

  return (
    <article className={rootClass} aria-label={title}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.chart} style={gridStyle}>
        <div className={styles.chartFit}>
        <div className={styles.chartBody}>
        <div className={styles.plotFrame}>
          <div className={styles.plotScaffold}>
            <span className={styles.axisYLine} aria-hidden />
            <div className={styles.grid} aria-hidden>
              <span className={styles.gridYSpacer} />
              {axisLabels.map((label) => (
                <div key={label} className={styles.gridColumn}>
                  <span className={styles.gridLine} />
                </div>
              ))}
            </div>

            <div className={styles.plotArea}>
            <div className={styles.rows}>
            {rows.map((row, rowIndex) => {
              const segments = resolveSegments(
                row,
                rowIndex,
                rows.length,
                palette,
                stacked,
              );
              const isTooltipRow =
                stacked &&
                activeSegment?.rowId === row.id &&
                row.segments?.some((s) => s.id === activeSegment.segmentId);

              return (
                <div key={row.id} className={styles.row}>
                  <span className={styles.rowLabel}>{row.label}</span>
                  <div className={styles.rowPlot}>
                    <div className={styles.barPlot}>
                      <span className={styles.rowGridLine} aria-hidden />
                      <div className={styles.barRowInner}>
                        <span className={styles.barOriginTick} aria-hidden />
                        <div
                          className={styles.barTrack}
                          style={{ width: barWidthPercent(row.value, axisMax) }}
                        >
                        {segments.map(({ segment, colorVar }, segmentIndex) => {
                          const segmentWidth = barWidthPercent(
                            segment.value,
                            row.value,
                          );
                          const isActive =
                            activeSegment?.segmentId === segment.id &&
                            activeSegment.rowId === row.id;

                          return (
                            <div
                              key={segment.id}
                              className={[
                                styles.segment,
                                segmentIndex > 0 ? styles.segmentDivider : "",
                                isActive ? styles.segmentActive : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={{
                                width: segmentWidth,
                                background: `var(${colorVar})`,
                              }}
                              onMouseEnter={() =>
                                stacked &&
                                setActiveSegment({
                                  rowId: row.id,
                                  segmentId: segment.id,
                                  colorVar,
                                  segment,
                                })
                              }
                              onMouseLeave={() =>
                                stacked &&
                                setActiveSegment((current) =>
                                  current?.segmentId === segment.id &&
                                  current.rowId === row.id
                                    ? null
                                    : current,
                                )
                              }
                              onFocus={() =>
                                stacked &&
                                setActiveSegment({
                                  rowId: row.id,
                                  segmentId: segment.id,
                                  colorVar,
                                  segment,
                                })
                              }
                              onBlur={() =>
                                stacked && setActiveSegment(null)
                              }
                              role={stacked ? "button" : undefined}
                              tabIndex={stacked ? 0 : undefined}
                              aria-describedby={
                                isActive ? tooltipId : undefined
                              }
                            />
                          );
                        })}
                        </div>

                        <div className={styles.rowValue}>
                          <span className={styles.rowAmount}>
                            {formatChartCurrency(row.value)}
                          </span>
                          {row.sharePercent !== undefined ? (
                            <span className={styles.rowShare}>
                              {formatChartShare(row.sharePercent)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {isTooltipRow && activeSegment ? (
                      <div className={styles.tooltipAnchor}>
                        <ChartTooltip
                          label={activeSegment.segment.label}
                          value={activeSegment.segment.value}
                          colorVar={activeSegment.colorVar}
                          breakdown={activeSegment.segment.breakdown}
                          className={styles.tooltip}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
            </div>
            </div>

            <div className={styles.axisXLineBlock} aria-hidden>
              <div className={styles.axisXTicks}>
                <span className={styles.axisXTickSpacer} />
                {axisLabels.map((label) => (
                  <span key={label} className={styles.axisXTick} />
                ))}
              </div>
              <span className={styles.axisXLine} />
            </div>
          </div>
        </div>

        <div className={styles.axisX} aria-hidden>
          <span className={styles.axisColumnSpacer} />
          {axisLabels.map((label) => (
            <span key={label} className={styles.axisTick}>
              {label}
            </span>
          ))}
        </div>
        </div>
        </div>
      </div>
    </article>
  );
}

/** Exported for token docs / tests. */
export { chartPaletteVars };
