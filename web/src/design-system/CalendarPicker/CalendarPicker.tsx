import { useEffect, useMemo, useState } from "react";
import { CalendarMonth } from "./CalendarMonth";
import type { CalendarPickerProps } from "./CalendarPicker.types";
import { addMonths, startOfDay } from "./calendarUtils";
import { useDateRangeSelection } from "./useDateRangeSelection";
import styles from "./CalendarPicker.module.css";

function initialViewMonth(
  value: CalendarPickerProps["value"],
  defaultViewMonth?: Date,
): Date {
  if (defaultViewMonth) {
    return new Date(defaultViewMonth.getFullYear(), defaultViewMonth.getMonth(), 1);
  }
  if (value.start) {
    return new Date(value.start.getFullYear(), value.start.getMonth(), 1);
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function CalendarPicker({
  value,
  onChange,
  layout = "row",
  className,
  defaultViewMonth,
}: CalendarPickerProps) {
  const [viewMonth, setViewMonth] = useState(() =>
    initialViewMonth(value, defaultViewMonth),
  );

  const {
    effective,
    handleDayClick,
    handleDayPointerDown,
    handleDayPointerEnter,
    handlePointerUp,
    handleDayHover,
  } = useDateRangeSelection({ value, onChange });

  useEffect(() => {
    const onPointerUpGlobal = () => handlePointerUp();
    document.addEventListener("pointerup", onPointerUpGlobal);
    document.addEventListener("pointercancel", onPointerUpGlobal);
    return () => {
      document.removeEventListener("pointerup", onPointerUpGlobal);
      document.removeEventListener("pointercancel", onPointerUpGlobal);
    };
  }, [handlePointerUp]);

  const monthA = useMemo(() => startOfDay(viewMonth), [viewMonth]);
  const monthB = useMemo(() => addMonths(viewMonth, 1), [viewMonth]);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const monthsClass =
    layout === "column" ? styles.monthsColumn : styles.monthsRow;

  const goPrev = () => setViewMonth((m) => addMonths(m, -1));
  const goNext = () => setViewMonth((m) => addMonths(m, 1));

  return (
    <div
      className={rootClass}
      role="application"
      aria-label="Календар вибору діапазону дат"
    >
      <div className={monthsClass}>
        <CalendarMonth
          viewDate={monthA}
          effective={effective}
          showPrev
          onPrev={goPrev}
          onDayClick={handleDayClick}
          onDayPointerDown={handleDayPointerDown}
          onDayPointerEnter={handleDayPointerEnter}
          onDayHover={handleDayHover}
        />
        {layout === "column" ? (
          <hr className={styles.monthDivider} aria-hidden />
        ) : null}
        {layout === "row" ? (
          <hr className={styles.monthDividerVertical} aria-hidden />
        ) : null}
        <CalendarMonth
          viewDate={monthB}
          effective={effective}
          leadingSpacerVariant="muted"
          showNext
          onNext={goNext}
          onDayClick={handleDayClick}
          onDayPointerDown={handleDayPointerDown}
          onDayPointerEnter={handleDayPointerEnter}
          onDayHover={handleDayHover}
        />
      </div>
    </div>
  );
}
