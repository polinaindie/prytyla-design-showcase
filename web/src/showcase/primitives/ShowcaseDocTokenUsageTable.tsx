import styles from "./showcaseTables.module.css";

export type DocTokenUsageRow = {
  element: string;
  property: string;
  token: string;
  value?: string;
};

type ShowcaseDocTokenUsageTableProps = {
  rows: DocTokenUsageRow[];
};

export function ShowcaseDocTokenUsageTable({ rows }: ShowcaseDocTokenUsageTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} scope="col">
              Element
            </th>
            <th className={styles.th} scope="col">
              Property
            </th>
            <th className={styles.th} scope="col">
              Token
            </th>
            <th className={styles.th} scope="col">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.element}-${row.property}-${row.token}`}>
              <td className={styles.td}>{row.element}</td>
              <td className={styles.td}>{row.property}</td>
              <td className={styles.td}>
                <span className={styles.chip}>{row.token}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.mono}>{row.value ?? "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
