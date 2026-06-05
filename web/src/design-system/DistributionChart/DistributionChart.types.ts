export type DistributionChartSegment = {
  id: string;
  label: string;
  value: number;
  /** Tooltip breakdown rows (category chart). */
  breakdown?: ReadonlyArray<{ id: string; label: string; value: number }>;
};

export type DistributionChartRow = {
  id: string;
  label: string;
  value: number;
  sharePercent?: number;
  /** Stacked sub-segments; sum should equal `value`. */
  segments?: readonly DistributionChartSegment[];
};

export type HorizontalDistributionChartProps = {
  title: string;
  rows: readonly DistributionChartRow[];
  axisMax?: number;
  axisLabels?: readonly string[];
  palette: "brown" | "blue";
  /** Stacked segments with segment tooltip (category chart). */
  stacked?: boolean;
  className?: string;
};
