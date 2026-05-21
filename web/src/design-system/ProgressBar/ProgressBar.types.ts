/** Figma Progress bar (728:13566) — Property 1: InProgres | Done */
export type ProgressBarVariant = "inProgress" | "done";

export type ProgressBarProps = {
  /** 0–100+ (101% у стані Done) */
  value: number;
  /** Якщо не задано — `done` при value ≥ 100, інакше `inProgress` */
  variant?: ProgressBarVariant;
  className?: string;
  /** aria-label; за замовчуванням «Прогрес: N%» */
  label?: string;
};
