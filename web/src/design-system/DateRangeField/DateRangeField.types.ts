import type { DateRangeValue } from "../CalendarPicker/calendarUtils";
import type { CalendarPickerLayout } from "../CalendarPicker/CalendarPicker.types";

export type DateRangeFieldProps = {
  label: string;
  value: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  helperText?: string;
  hideHelperText?: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  /** Force picker layout; default `column` below 768px, `row` otherwise. */
  pickerLayout?: CalendarPickerLayout;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  placeholder?: string;
  /**
   * `portal` — fixed popover in `document.body` (forms, modals).
   * `inline` — absolute popover under the field (showcase frames with CSS scale).
   */
  popoverMount?: "portal" | "inline";
};
