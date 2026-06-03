export type MultiDropLevel = 1 | 2 | 3;

/** Figma checkbox: Empty | Done | SomeSelected */
export type MultiDropCheckboxState = "empty" | "checked" | "indeterminate";

export type MultiDropProps = {
  /** Текст рядка (Figma itemText). */
  label: string;
  /** Figma level 1 | 2 | 3 — відступ зліва. */
  level?: MultiDropLevel;
  checkboxState?: MultiDropCheckboxState;
  /** Figma drop — показати chevron (Closed/Open). */
  expandable?: boolean;
  /** Figma dropType Open — chevron вгору. */
  expanded?: boolean;
  onExpandToggle?: () => void;
  /** Клік по рядку (toggle checkbox). */
  onToggle?: () => void;
  disabled?: boolean;
  className?: string;
};
