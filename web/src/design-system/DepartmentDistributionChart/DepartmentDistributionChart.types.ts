import type { DistributionChartRow } from "../DistributionChart/DistributionChart.types";

export type DepartmentDistributionChartProps = {
  title?: string;
  rows: readonly DistributionChartRow[];
  axisMax?: number;
  axisLabels?: readonly string[];
  className?: string;
};
