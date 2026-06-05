import type { DateRangeValue } from "./calendarUtils";

export type CalendarPickerLayout = "row" | "column";

export type CalendarPickerProps = {
  value: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  /** Desktop: two months side-by-side. Mobile: stacked with divider. */
  layout?: CalendarPickerLayout;
  className?: string;
  /** First visible month (defaults to range start or today). */
  defaultViewMonth?: Date;
};
