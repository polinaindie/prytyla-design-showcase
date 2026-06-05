import type { DistributionChartRow } from "../DistributionChart/DistributionChart.types";
import { HorizontalDistributionChart } from "../DistributionChart/HorizontalDistributionChart";
import type { CategoryDistributionChartProps } from "./CategoryDistributionChart.types";

export function CategoryDistributionChart({
  rows,
  title = "Розподіл видач по категоріях",
  axisMax,
  axisLabels,
  className,
}: CategoryDistributionChartProps) {
  return (
    <HorizontalDistributionChart
      title={title}
      rows={rows}
      axisMax={axisMax}
      axisLabels={axisLabels}
      palette="brown"
      stacked
      className={className}
    />
  );
}

export type { CategoryDistributionChartProps, DistributionChartRow };
