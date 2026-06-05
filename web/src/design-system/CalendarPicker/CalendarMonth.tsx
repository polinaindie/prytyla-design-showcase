import { useId } from "react";
import { IconChevronDown10 } from "../Icons";
import {
  type CalendarDayCell,
  type DateRangeValue,
  WEEKDAY_LABELS_UK,
  formatMonthYear,
  getCalendarDays,
  isDayInRange,
  isRangeEnd,
  isRangeSegmentEnd,
  isRangeSegmentStart,
  isRangeStart,
} from "./calendarUtils";
import styles from "./CalendarPicker.module.css";

export type CalendarMonthProps = {
  viewDate: Date;
  effective: DateRangeValue;
  /** Spacer when `showPrev` is false — Figma second month uses muted 28×28. */
  leadingSpacerVariant?: "empty" | "muted";
  showPrev?: boolean;
  showNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onDayClick: (date: Date) => void;
  onDayPointerDown: (date: Date) => void;
  onDayPointerEnter: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
};

function getDayCellClasses(
  cell: CalendarDayCell,
  week: Date[],
  effective: DateRangeValue,
): string {
  const { date } = cell;
  const inRange = isDayInRange(date, effective);
  const segmentStart = isRangeSegmentStart(date, week, effective);
  const segmentEnd = isRangeSegmentEnd(date, week, effective);
  const single =
    isRangeStart(date, effective) && isRangeEnd(date, effective);

  return [
    styles.dayCell,
    inRange ? styles.dayCellInRange : "",
    segmentStart ? styles.dayCellRangeStart : "",
    segmentEnd ? styles.dayCellRangeEnd : "",
    single ? styles.dayCellRangeSingle : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function getDayButtonClasses(
  cell: CalendarDayCell,
  effective: DateRangeValue,
): string {
  const { date, inCurrentMonth } = cell;
  const start = isRangeStart(date, effective);
  const end = isRangeEnd(date, effective);

  return [
    styles.dayButton,
    !inCurrentMonth ? styles.dayOutside : "",
    start || end ? styles.daySelected : "",
    isDayInRange(date, effective) && !start && !end
      ? styles.dayInRange
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function CalendarMonth({
  viewDate,
  effective,
  leadingSpacerVariant = "empty",
  showPrev = false,
  showNext = false,
  onPrev,
  onNext,
  onDayClick,
  onDayPointerDown,
  onDayPointerEnter,
  onDayHover,
}: CalendarMonthProps) {
  const gridId = useId();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = getCalendarDays(year, month);
  const weeks: CalendarDayCell[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const leadingSpacerClass =
    leadingSpacerVariant === "muted"
      ? styles.navSpacerMuted
      : styles.navSpacer;

  return (
    <section className={styles.month} aria-labelledby={`${gridId}-title`}>
      <header className={styles.monthHeader}>
        {showPrev ? (
          <button
            type="button"
            className={styles.navButton}
            onClick={onPrev}
            aria-label="Попередній місяць"
          >
            <IconChevronDown10
              size={10}
              className={styles.chevronPrev}
              aria-hidden
            />
          </button>
        ) : (
          <span className={leadingSpacerClass} aria-hidden />
        )}
        <h3 id={`${gridId}-title`} className={styles.monthTitle}>
          {formatMonthYear(viewDate)}
        </h3>
        {showNext ? (
          <button
            type="button"
            className={styles.navButton}
            onClick={onNext}
            aria-label="Наступний місяць"
          >
            <IconChevronDown10
              size={10}
              className={styles.chevronNext}
              aria-hidden
            />
          </button>
        ) : (
          <span className={styles.navSpacer} aria-hidden />
        )}
      </header>

      <div className={styles.monthGrid}>
        <div className={styles.weekHeader} role="row">
          {WEEKDAY_LABELS_UK.map((label) => (
            <span key={label} className={styles.weekday} role="columnheader">
              {label}
            </span>
          ))}
        </div>

        <div
          className={styles.weeks}
          role="grid"
          aria-label={formatMonthYear(viewDate)}
          onPointerLeave={() => onDayHover(null)}
        >
          {weeks.map((week, weekIndex) => {
            const weekDates = week.map((cell) => cell.date);

            return (
              <div key={weekIndex} className={styles.weekRow} role="row">
                {week.map((cell) => {
              const day = cell.date;
              const label = `${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}`;

              return (
                <div
                  key={day.toISOString()}
                  className={getDayCellClasses(cell, weekDates, effective)}
                  role="gridcell"
                >
                  <button
                    type="button"
                    className={getDayButtonClasses(cell, effective)}
                    aria-label={label}
                    aria-selected={
                      isRangeStart(day, effective) ||
                      isRangeEnd(day, effective)
                    }
                    onClick={() => onDayClick(day)}
                    onPointerDown={(event) => {
                      if (event.button !== 0) return;
                      onDayPointerDown(day);
                    }}
                    onPointerEnter={() => {
                      onDayPointerEnter(day);
                      onDayHover(day);
                    }}
                    onFocus={() => onDayHover(day)}
                    onBlur={() => onDayHover(null)}
                  >
                    {day.getDate()}
                  </button>
                </div>
              );
            })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
