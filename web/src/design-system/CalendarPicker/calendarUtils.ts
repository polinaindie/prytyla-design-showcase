export type DateRangeValue = {
  start: Date | null;
  end: Date | null;
};

export type CalendarDayCell = {
  date: Date;
  inCurrentMonth: boolean;
};

export const WEEKDAY_LABELS_UK = ["пн", "вт", "ср", "чт", "пт", "сб", "нд"] as const;

const MONTH_NAMES_UK = [
  "січень",
  "лютий",
  "березень",
  "квітень",
  "травень",
  "червень",
  "липень",
  "серпень",
  "вересень",
  "жовтень",
  "листопад",
  "грудень",
] as const;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function normalizeRange(start: Date, end: Date): DateRangeValue {
  if (isBeforeDay(end, start)) {
    return { start: startOfDay(end), end: startOfDay(start) };
  }
  return { start: startOfDay(start), end: startOfDay(end) };
}

export function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function formatMonthYear(date: Date): string {
  const month = MONTH_NAMES_UK[date.getMonth()];
  return `${month} ${date.getFullYear()}`;
}

function parseDateParts(day: string, month: string, year: string): Date | null {
  const d = Number.parseInt(day, 10);
  const m = Number.parseInt(month, 10);
  const y = Number.parseInt(year, 10);
  if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return startOfDay(date);
}

/**
 * Parses field text written by users (inverse of formatDateRangeDisplay).
 * Returns null when the string is non-empty but not a valid range.
 */
export function parseDateRangeInput(text: string): DateRangeValue | null {
  const trimmed = text.trim();
  if (!trimmed) return { start: null, end: null };

  const fullYearRange = trimmed.match(
    /^(\d{1,2})\.(\d{1,2})\.(\d{4})\s*-\s*(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
  );
  if (fullYearRange) {
    const start = parseDateParts(fullYearRange[1], fullYearRange[2], fullYearRange[3]);
    const end = parseDateParts(fullYearRange[4], fullYearRange[5], fullYearRange[6]);
    if (!start || !end) return null;
    return normalizeRange(start, end);
  }

  const shortEndRange = trimmed.match(
    /^(\d{1,2})\.(\d{1,2})\s*-\s*(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
  );
  if (shortEndRange) {
    const year = shortEndRange[5];
    const start = parseDateParts(shortEndRange[1], shortEndRange[2], year);
    const end = parseDateParts(shortEndRange[3], shortEndRange[4], year);
    if (!start || !end) return null;
    return normalizeRange(start, end);
  }

  const single = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (single) {
    const start = parseDateParts(single[1], single[2], single[3]);
    if (!start) return null;
    return { start, end: start };
  }

  return null;
}

/** Figma trigger value: `01.09 - 16.09.2025` */
export function formatDateRangeDisplay(range: DateRangeValue): string {
  const { start, end } = range;
  if (!start) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmtShort = (d: Date) =>
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;

  if (!end || isSameDay(start, end)) {
    return `${fmtShort(start)}.${start.getFullYear()}`;
  }

  const endYear = end.getFullYear();
  const startYear = start.getFullYear();
  if (startYear === endYear) {
    return `${fmtShort(start)} - ${fmtShort(end)}.${endYear}`;
  }

  return `${fmtShort(start)}.${startYear} - ${fmtShort(end)}.${endYear}`;
}

/** Monday-first grid (6 rows max). */
export function getCalendarDays(year: number, month: number): CalendarDayCell[] {
  const first = new Date(year, month, 1);
  const mondayIndex = (first.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayIndex);
  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + i,
    );
    cells.push({
      date,
      inCurrentMonth: date.getMonth() === month,
    });
  }

  return cells;
}

export function getEffectiveRange(
  range: DateRangeValue,
  hoverDate: Date | null,
  isPicking: boolean,
): DateRangeValue {
  if (!range.start) return { start: null, end: null };
  if (isPicking && hoverDate) {
    return normalizeRange(range.start, hoverDate);
  }
  if (range.end) {
    return normalizeRange(range.start, range.end);
  }
  if (isPicking) {
    return { start: range.start, end: range.start };
  }
  return { start: range.start, end: range.start };
}

export function isDayInRange(
  day: Date,
  effective: DateRangeValue,
): boolean {
  if (!effective.start || !effective.end) return false;
  return (
    !isBeforeDay(day, effective.start) && !isAfterDay(day, effective.end)
  );
}

export function isRangeStart(day: Date, effective: DateRangeValue): boolean {
  return Boolean(effective.start && isSameDay(day, effective.start));
}

export function isRangeEnd(day: Date, effective: DateRangeValue): boolean {
  return Boolean(effective.end && isSameDay(day, effective.end));
}

/** Rounded left edge when range continues on the previous row (Figma week wrap). */
export function isRangeSegmentStart(
  day: Date,
  week: Date[],
  effective: DateRangeValue,
): boolean {
  if (!isDayInRange(day, effective)) return false;
  if (isRangeStart(day, effective)) return true;
  const index = week.findIndex((d) => isSameDay(d, day));
  if (index <= 0) return true;
  return !isDayInRange(week[index - 1], effective);
}

/** Rounded right edge when range continues on the next row (Figma week wrap). */
export function isRangeSegmentEnd(
  day: Date,
  week: Date[],
  effective: DateRangeValue,
): boolean {
  if (!isDayInRange(day, effective)) return false;
  if (isRangeEnd(day, effective)) return true;
  const index = week.findIndex((d) => isSameDay(d, day));
  if (index < 0 || index >= week.length - 1) return true;
  return !isDayInRange(week[index + 1], effective);
}
