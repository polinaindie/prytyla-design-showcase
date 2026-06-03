import styles from "./showcaseTables.module.css";

export type DocChangelogEntry = {
  version: string;
  date: string;
  summary: string;
  author?: string;
};

type ShowcaseDocChangelogProps = {
  entries: DocChangelogEntry[];
};

export function ShowcaseDocChangelog({ entries }: ShowcaseDocChangelogProps) {
  if (entries.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} scope="col">
              Version
            </th>
            <th className={styles.th} scope="col">
              Date
            </th>
            <th className={styles.th} scope="col">
              Changes
            </th>
            <th className={styles.th} scope="col">
              Author
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.version}-${entry.date}`}>
              <td className={styles.td}>
                <span className={styles.mono}>{entry.version}</span>
              </td>
              <td className={styles.td}>
                <time dateTime={entry.date}>{entry.date}</time>
              </td>
              <td className={styles.td}>{entry.summary}</td>
              <td className={styles.td}>{entry.author ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
