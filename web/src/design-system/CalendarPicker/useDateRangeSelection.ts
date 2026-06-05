import { useCallback, useRef, useState } from "react";
import {
  type DateRangeValue,
  getEffectiveRange,
  normalizeRange,
  startOfDay,
} from "./calendarUtils";

export type SelectionPhase = "idle" | "picking" | "complete";

type UseDateRangeSelectionOptions = {
  value: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
};

function derivePhase(value: DateRangeValue): SelectionPhase {
  if (!value.start) return "idle";
  if (!value.end) return "picking";
  return "complete";
}

export function useDateRangeSelection({
  value,
  onChange,
}: UseDateRangeSelectionOptions) {
  const [phase, setPhase] = useState<SelectionPhase>(() => derivePhase(value));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const dragAnchorRef = useRef<Date | null>(null);

  const commitRange = useCallback(
    (next: DateRangeValue) => {
      onChange?.(next);
    },
    [onChange],
  );

  const beginPick = useCallback(
    (day: Date) => {
      const start = startOfDay(day);
      setPhase("picking");
      setHoverDate(null);
      commitRange({ start, end: null });
    },
    [commitRange],
  );

  const completePick = useCallback(
    (day: Date) => {
      if (!value.start) {
        beginPick(day);
        return;
      }
      const next = normalizeRange(value.start, day);
      setPhase("complete");
      setHoverDate(null);
      commitRange(next);
    },
    [beginPick, commitRange, value.start],
  );

  const handleDayClick = useCallback(
    (day: Date) => {
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }

      if (phase === "idle" || phase === "complete") {
        beginPick(day);
        return;
      }

      if (phase === "picking") {
        completePick(day);
      }
    },
    [beginPick, completePick, phase],
  );

  const handleDayPointerDown = useCallback((day: Date) => {
    draggingRef.current = true;
    movedRef.current = false;
    dragAnchorRef.current = startOfDay(day);
  }, []);

  const handleDayPointerEnter = useCallback(
    (day: Date) => {
      if (!draggingRef.current) return;

      const hover = startOfDay(day);
      if (!movedRef.current) {
        movedRef.current = true;
        const anchor = dragAnchorRef.current ?? hover;
        if (phase === "idle" || phase === "complete") {
          beginPick(anchor);
        }
      }

      setHoverDate(hover);
      if (value.start) {
        commitRange(normalizeRange(value.start, hover));
      }
    },
    [beginPick, commitRange, phase, value.start],
  );

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    if (movedRef.current && value.start) {
      const end = hoverDate ?? dragAnchorRef.current ?? value.start;
      const next = normalizeRange(value.start, end);
      setPhase("complete");
      setHoverDate(null);
      commitRange(next);
    }

    movedRef.current = false;
    dragAnchorRef.current = null;
  }, [commitRange, hoverDate, value.start]);

  const handleDayHover = useCallback(
    (day: Date | null) => {
      if (phase === "picking" && !draggingRef.current) {
        setHoverDate(day ? startOfDay(day) : null);
      }
    },
    [phase],
  );

  const isPicking = phase === "picking";
  const effective = getEffectiveRange(value, hoverDate, isPicking);

  return {
    phase,
    hoverDate,
    effective,
    isPicking,
    handleDayClick,
    handleDayPointerDown,
    handleDayPointerEnter,
    handlePointerUp,
    handleDayHover,
  };
}
