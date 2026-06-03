import styles from "./showcaseTables.module.css";

export type DocPropertyTypeKind = "VARIANT" | "TEXT" | "BOOLEAN" | "INSTANCE_SWAP";

export type DocPropertyRow = {
  property: string;
  type: string;
  typeKind?: DocPropertyTypeKind;
  optionsDefault?: string;
  description: string;
};

type ShowcaseDocPropertiesTableProps = {
  rows: DocPropertyRow[];
};

export function ShowcaseDocPropertiesTable({ rows }: ShowcaseDocPropertiesTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} scope="col">
              Property
            </th>
            <th className={styles.th} scope="col">
              Type
            </th>
            <th className={styles.th} scope="col">
              Options / default
            </th>
            <th className={styles.th} scope="col">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property}>
              <td className={styles.td}>
                <span className={styles.mono}>{row.property}</span>
              </td>
              <td className={styles.td}>
                <div className={styles.typeCell}>
                  {row.typeKind ? (
                    <span className={styles.chip}>{row.typeKind}</span>
                  ) : null}
                  <span className={styles.mono}>{row.type}</span>
                </div>
              </td>
              <td className={`${styles.td} ${styles.mono}`}>
                {row.optionsDefault ?? "—"}
              </td>
              <td className={styles.td}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
