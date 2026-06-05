const currencyFormatter = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function formatChartCurrency(value: number): string {
  return `${currencyFormatter.format(value)} грн`;
}

export function formatChartShare(percent: number): string {
  return `(${percent.toLocaleString("uk-UA", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%)`;
}

export function formatChartValueLabel(value: number, sharePercent?: number): string {
  const amount = formatChartCurrency(value);
  if (sharePercent === undefined) return amount;
  return `${amount} ${formatChartShare(sharePercent)}`;
}

/** Figma axis labels for impact statistics (500M UAH scale). */
export const IMPACT_CHART_AXIS_LABELS = [
  "100 тис. грн",
  "200 тис. грн",
  "300 тис. грн",
  "400 тис. грн",
  "500 тис. грн",
] as const;

/** Max bar scale matching Figma graph (values ~500M UAH). */
export const IMPACT_CHART_AXIS_MAX = 500_000_000;
