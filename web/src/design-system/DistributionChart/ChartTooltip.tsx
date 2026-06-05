import { formatChartCurrency } from "./chartFormat";
import styles from "./ChartTooltip.module.css";

type ChartTooltipProps = {
  label: string;
  value: number;
  colorVar: string;
  breakdown?: ReadonlyArray<{ id: string; label: string; value: number }>;
  className?: string;
};

export function ChartTooltip({
  label,
  value,
  colorVar,
  breakdown,
  className,
}: ChartTooltipProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} role="tooltip">
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <span
            className={styles.swatch}
            style={{ background: `var(${colorVar})` }}
            aria-hidden
          />
          <span className={styles.title}>{label}</span>
        </div>
        <span className={styles.headerValue}>{formatChartCurrency(value)}</span>
      </div>
      {breakdown && breakdown.length > 0 ? (
        <div className={styles.breakdown}>
          {breakdown.map((item) => (
            <div key={item.id} className={styles.breakdownRow}>
              <div className={styles.breakdownLabel}>
                <span
                  className={styles.swatchSmall}
                  style={{ background: `var(${colorVar})` }}
                  aria-hidden
                />
                <span>{item.label}</span>
              </div>
              <span className={styles.breakdownValue}>
                {formatChartCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
