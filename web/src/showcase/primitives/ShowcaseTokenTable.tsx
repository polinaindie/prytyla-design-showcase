import type { ReactNode } from "react";
import styles from "./showcaseTables.module.css";

export type ShowcaseTokenTableRow = {
  token: string;
  value?: string;
  preview?: ReactNode;
  onCopy?: () => void;
  copyTitle?: string;
};

export type ShowcaseTokenTableProps = {
  rows: ShowcaseTokenTableRow[];
  showPreview?: boolean;
  header?: ReactNode;
  className?: string;
};

export function ShowcaseTokenTable({
  rows,
  showPreview = false,
  header,
  className,
}: ShowcaseTokenTableProps) {
  if (rows.length === 0) {
    return null;
  }

  const blockClass = [styles.block, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={blockClass}>
      {header}
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {showPreview ? (
                <th className={`${styles.th} ${styles.previewCol}`} scope="col">
                  Preview
                </th>
              ) : null}
              <th className={styles.th} scope="col">
                Token
              </th>
              <th className={styles.th} scope="col">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const tokenCell = (
                <span className={styles.mono}>{row.token}</span>
              );

              return (
                <tr key={row.token}>
                  {showPreview ? (
                    <td className={`${styles.td} ${styles.previewCell}`}>
                      {row.preview}
                    </td>
                  ) : null}
                  <td className={styles.td}>
                    {row.onCopy ? (
                      <button
                        type="button"
                        className={styles.tokenButton}
                        onClick={row.onCopy}
                        title={row.copyTitle ?? `Копіювати ${row.token}`}
                      >
                        {tokenCell}
                      </button>
                    ) : (
                      tokenCell
                    )}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.mono}>{row.value ?? "—"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
