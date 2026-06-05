/** Figma Progress bar (728:13566) — Property 1: InProgres | Done */
export type ProgressBarVariant = "inProgress" | "done";

export type ProgressBarProps = {
  /** 0–100+; fill обмежений 100% ширини track, badge показує фактичне ціле (112% тощо) */
  value: number;
  /** Якщо не задано — `done` при value ≥ 100. При ≥100: сірий track, navy badge в кінці. */
  variant?: ProgressBarVariant;
  className?: string;
  /** aria-label; за замовчуванням «Прогрес: N%» */
  label?: string;
};
