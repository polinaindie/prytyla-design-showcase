import type { ReactNode } from "react";
import styles from "./ShowcaseTablesRow.module.css";

export type ShowcaseTableSlot = {
  key: string;
  caption?: string;
  children: ReactNode;
};

type ShowcaseTablesRowProps = {
  tables: ShowcaseTableSlot[];
};

/** Related tables stacked in one column (full width each). */
export function ShowcaseTablesRow({ tables }: ShowcaseTablesRowProps) {
  if (tables.length === 0) return null;

  return (
    <div className={styles.stack}>
      {tables.map((slot) => (
        <div key={slot.key} className={styles.slot}>
          {slot.caption ? <p className={styles.caption}>{slot.caption}</p> : null}
          {slot.children}
        </div>
      ))}
    </div>
  );
}
