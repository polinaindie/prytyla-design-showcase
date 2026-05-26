import type { ReactNode } from "react";
import styles from "./ShowcaseTokenTable.module.css";

export type ShowcaseTokenTableRow = {
  token: string;
  value?: string;
  preview: ReactNode;
  onCopy?: () => void;
  copyTitle?: string;
};

export type ShowcaseTokenTableProps = {
  rows: ShowcaseTokenTableRow[];
  previewHeader?: string;
  tokenHeader?: string;
  valueHeader?: string;
  className?: string;
};

export function ShowcaseTokenTable({
  rows,
  previewHeader = "Preview",
  tokenHeader = "Token",
  valueHeader = "Value",
  className,
}: ShowcaseTokenTableProps) {
  if (rows.length === 0) {
    return null;
  }

  const wrapClass = [styles.wrap, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={wrapClass}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.colHeader} ${styles.previewCol}`} scope="col">
              {previewHeader}
            </th>
            <th className={styles.colHeader} scope="col">
              {tokenHeader}
            </th>
            <th className={styles.colHeader} scope="col">
              {valueHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const tokenMeta = <p className={styles.tokenName}>{row.token}</p>;

            return (
              <tr key={row.token}>
                <td>{row.preview}</td>
                <td>
                  {row.onCopy ? (
                    <button
                      type="button"
                      className={styles.tokenButton}
                      onClick={row.onCopy}
                      title={row.copyTitle ?? `Копіювати ${row.token}`}
                    >
                      {tokenMeta}
                    </button>
                  ) : (
                    tokenMeta
                  )}
                </td>
                <td>
                  {row.value ? (
                    <p className={styles.tokenValue}>{row.value}</p>
                  ) : (
                    <span className={styles.tokenValue}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
