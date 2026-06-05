import type { DistributionChartRow } from "../DistributionChart/DistributionChart.types";

export type CategoryDistributionChartProps = {
  title?: string;
  rows: readonly DistributionChartRow[];
  axisMax?: number;
  axisLabels?: readonly string[];
  className?: string;
};
