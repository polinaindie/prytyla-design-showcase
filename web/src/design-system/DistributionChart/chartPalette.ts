/** Chart palette — Brand chart/* tokens (no Alias/Mapped); see component CSS comments. */
export const CHART_BROWN_VARS = [
  "--pryt-brand-chart-brown-11",
  "--pryt-brand-chart-brown-10",
  "--pryt-brand-chart-brown-9",
  "--pryt-brand-chart-brown-8",
  "--pryt-brand-chart-brown-7",
  "--pryt-brand-chart-brown-6",
  "--pryt-brand-chart-brown-5",
  "--pryt-brand-chart-brown-4",
  "--pryt-brand-chart-brown-3",
  "--pryt-brand-chart-brown-2",
  "--pryt-brand-chart-brown-1",
] as const;

export const CHART_BLUE_VARS = [
  "--pryt-brand-chart-blue-11",
  "--pryt-brand-chart-blue-10",
  "--pryt-brand-chart-blue-9",
  "--pryt-brand-chart-blue-8",
  "--pryt-brand-chart-blue-7",
  "--pryt-brand-chart-blue-6",
  "--pryt-brand-chart-blue-5",
  "--pryt-brand-chart-blue-4",
  "--pryt-brand-chart-blue-3",
  "--pryt-brand-chart-blue-2",
  "--pryt-brand-chart-blue-1",
] as const;

export type ChartPaletteId = "brown" | "blue";

export function chartPaletteVars(palette: ChartPaletteId): readonly string[] {
  return palette === "brown" ? CHART_BROWN_VARS : CHART_BLUE_VARS;
}

export function chartColorVar(
  palette: ChartPaletteId,
  index: number,
  total: number,
): string {
  const vars = chartPaletteVars(palette);
  const clamped = Math.max(0, Math.min(index, vars.length - 1));
  if (palette === "blue") {
    const step = Math.round((index / Math.max(total - 1, 1)) * (vars.length - 1));
    return vars[vars.length - 1 - step];
  }
  return vars[clamped];
}
