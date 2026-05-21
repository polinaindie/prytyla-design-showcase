import type { PropsConfig } from "./showcase.types";
import styles from "./ShowcasePropsTable.module.css";

type ShowcasePropsTableProps = {
  props: PropsConfig[];
};

export function ShowcasePropsTable({ props }: ShowcasePropsTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Default</th>
            <th className={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((row) => (
            <tr key={row.name}>
              <td className={styles.td}>
                <span className={styles.mono}>{row.name}</span>
                {row.required ? <span className={styles.required}>required</span> : null}
              </td>
              <td className={`${styles.td} ${styles.mono}`}>{row.type}</td>
              <td className={`${styles.td} ${styles.mono}`}>{row.default ?? "—"}</td>
              <td className={styles.td}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
