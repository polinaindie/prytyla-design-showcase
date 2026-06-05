import type { DistributionChartRow } from "../DistributionChart/DistributionChart.types";
import { HorizontalDistributionChart } from "../DistributionChart/HorizontalDistributionChart";
import type { DepartmentDistributionChartProps } from "./DepartmentDistributionChart.types";

export function DepartmentDistributionChart({
  rows,
  title = "Розподіл видач по відомствах",
  axisMax,
  axisLabels,
  className,
}: DepartmentDistributionChartProps) {
  return (
    <HorizontalDistributionChart
      title={title}
      rows={rows}
      axisMax={axisMax}
      axisLabels={axisLabels}
      palette="blue"
      className={className}
    />
  );
}

export type { DepartmentDistributionChartProps, DistributionChartRow };
