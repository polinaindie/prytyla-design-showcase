import styles from "./ShowcaseDocBulletList.module.css";

type ShowcaseDocBulletListProps = {
  items: string[];
};

export function ShowcaseDocBulletList({ items }: ShowcaseDocBulletListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
