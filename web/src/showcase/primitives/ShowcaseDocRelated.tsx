import { Link } from "react-router-dom";
import { showcasePagePath } from "../showcasePaths";
import styles from "./ShowcaseDocRelated.module.css";

export type ShowcaseDocRelatedLink = {
  label: string;
  path: string;
};

type ShowcaseDocRelatedProps = {
  /** Similar / sibling components */
  related?: ShowcaseDocRelatedLink[];
  /** Often combined in product UI */
  usedWith?: ShowcaseDocRelatedLink[];
  /** @deprecated Use `related` */
  links?: ShowcaseDocRelatedLink[];
};

function LinkGroup({
  title,
  items,
}: {
  title: string;
  items: ShowcaseDocRelatedLink[];
}) {
  if (items.length === 0) return null;

  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.path}>
            <Link className={styles.link} to={showcasePagePath(item.path)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShowcaseDocRelated({
  related,
  usedWith,
  links,
}: ShowcaseDocRelatedProps) {
  const relatedLinks = related ?? links ?? [];
  const hasContent = relatedLinks.length > 0 || (usedWith?.length ?? 0) > 0;

  if (!hasContent) return null;

  return (
    <div className={styles.wrap}>
      <LinkGroup title="Related" items={relatedLinks} />
      {usedWith ? <LinkGroup title="Used with" items={usedWith} /> : null}
    </div>
  );
}
