import styles from "./ShowcaseDocSizeSwitch.module.css";

export const SHOWCASE_DOC_SIZE_OPTIONS = ["desktop", "tablet", "mobile"] as const;

export type ShowcaseDocSizeOption = (typeof SHOWCASE_DOC_SIZE_OPTIONS)[number];

export type ShowcaseDocSwitchOption<T extends string = string> = {
  value: T;
  label: string;
};

/** Components with Figma Size desktop | mobile only (LinkCard, MediaCard, …). */
export const SHOWCASE_DOC_SIZE_OPTIONS_TWO: readonly ShowcaseDocSizeOption[] = [
  "desktop",
  "mobile",
];

/** Components with Figma Size desktop | tablet | mobile (ProjectCard, Footer, …). */
export const SHOWCASE_DOC_SIZE_OPTIONS_THREE = SHOWCASE_DOC_SIZE_OPTIONS;

const SIZE_LABEL: Record<ShowcaseDocSizeOption, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export function toSizeSwitchOptions(
  sizes: readonly ShowcaseDocSizeOption[],
): ShowcaseDocSwitchOption<ShowcaseDocSizeOption>[] {
  return sizes.map((value) => ({ value, label: SIZE_LABEL[value] }));
}

type ShowcaseDocSizeSwitchProps<T extends string = ShowcaseDocSizeOption> = {
  value: T;
  onChange: (value: T) => void;
  /** Standard Figma size tokens — mapped to Desktop / Tablet / Mobile labels. */
  options?: readonly ShowcaseDocSizeOption[];
  /** Custom labeled options (e.g. News Card matrix columns). */
  labeledOptions?: readonly ShowcaseDocSwitchOption<T>[];
  "aria-label"?: string;
};

export function ShowcaseDocSizeSwitch<T extends string = ShowcaseDocSizeOption>({
  value,
  onChange,
  options = SHOWCASE_DOC_SIZE_OPTIONS,
  labeledOptions,
  "aria-label": ariaLabel = "Preview size",
}: ShowcaseDocSizeSwitchProps<T>) {
  const items: readonly ShowcaseDocSwitchOption<T>[] =
    labeledOptions ?? (toSizeSwitchOptions(options) as ShowcaseDocSwitchOption<T>[]);
  const segmented = labeledOptions !== undefined && labeledOptions.length > 0;

  return (
    <div
      className={`${styles.root} ${segmented ? styles.rootSegmented : ""}`}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.button} ${value === option.value ? styles.buttonActive : ""}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
