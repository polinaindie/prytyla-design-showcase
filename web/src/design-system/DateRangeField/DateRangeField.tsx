import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarPicker } from "../CalendarPicker";
import { formatDateRangeDisplay } from "../CalendarPicker/calendarUtils";
import { IconCalendar } from "../Icons";
import { TextField } from "../TextField";
import textFieldStyles from "../TextField/TextField.module.css";
import type { DateRangeFieldProps } from "./DateRangeField.types";
import styles from "./DateRangeField.module.css";
import { usePopoverAnchorPosition } from "./usePopoverAnchorPosition";

/** Tablet+ (768px): два місяці в ряд; Mobile (≤767px): один під одним. */
const MOBILE_MAX_WIDTH = 767;

function useMediaPickerLayout() {
  const [layout, setLayout] = useState<"row" | "column">(() =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches
      ? "column"
      : "row",
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const sync = () => setLayout(mq.matches ? "column" : "row");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return layout;
}

export function DateRangeField({
  label,
  value,
  onChange,
  helperText,
  hideHelperText = true,
  error = false,
  disabled = false,
  className,
  pickerLayout,
  open: openControlled,
  onOpenChange,
  defaultOpen = false,
  placeholder = "Оберіть діапазон",
  popoverMount = "portal",
}: DateRangeFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen);
  const mediaLayout = useMediaPickerLayout();
  const layout = pickerLayout ?? mediaLayout;
  const usePortalPopover = popoverMount === "portal";

  const displayValue = formatDateRangeDisplay(value);

  const isControlled = openControlled !== undefined;
  const open = isControlled ? openControlled : openUncontrolled;
  const anchorPosition = usePopoverAnchorPosition(
    anchorRef,
    open && usePortalPopover,
  );

  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenUncontrolled(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (usePortalPopover && popoverRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, usePortalPopover]);

  const rootClass = [styles.root, styles.fullWidth, className]
    .filter(Boolean)
    .join(" ");

  const togglePicker = () => {
    if (disabled) return;
    setOpen(!open);
  };

  const handleRangeChange: NonNullable<DateRangeFieldProps["onChange"]> = (
    range,
  ) => {
    onChange?.(range);
  };

  const popoverClass = [
    styles.popover,
    usePortalPopover ? styles.popoverPortal : styles.popoverInline,
    layout === "row" ? styles.popoverRow : styles.popoverColumn,
  ]
    .filter(Boolean)
    .join(" ");

  const popoverStyle = usePortalPopover
    ? anchorPosition === null
      ? undefined
      : {
          top: anchorPosition.top,
          left: anchorPosition.left,
          ...(layout === "column"
            ? { width: anchorPosition.width }
            : { minWidth: anchorPosition.width }),
        }
    : undefined;

  const popoverNode =
    open ? (
      <div
        ref={popoverRef}
        id={listboxId}
        className={popoverClass}
        style={popoverStyle}
        role="dialog"
        aria-label="Календар"
      >
        <CalendarPicker
          className={styles.popoverPicker}
          layout={layout}
          value={value}
          onChange={handleRangeChange}
        />
      </div>
    ) : null;

  const popover =
    popoverNode &&
    (usePortalPopover
      ? anchorPosition && typeof document !== "undefined"
        ? createPortal(popoverNode, document.body)
        : null
      : popoverNode);

  return (
    <div className={rootClass} ref={rootRef}>
      <div
        ref={anchorRef}
        className={styles.fieldTrigger}
        onClick={(event) => {
          if (disabled) return;
          if ((event.target as HTMLElement).closest("button")) return;
          togglePicker();
        }}
      >
        <TextField
          className={textFieldStyles.fullWidth}
          label={label}
          helperText={helperText}
          hideHelperText={hideHelperText}
          error={error}
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          readOnly
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              togglePicker();
            }
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          trailingIcon={<IconCalendar size={24} aria-hidden />}
          onTrailingIconClick={togglePicker}
          trailingIconLabel={open ? "Закрити календар" : "Відкрити календар"}
        />
      </div>
      {popover}
    </div>
  );
}
