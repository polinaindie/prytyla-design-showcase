import { Link } from "react-router-dom";
import { showcasePagePath } from "../showcasePaths";
import { ShowcaseDoDont } from "./ShowcaseDoDont";
import styles from "./ShowcaseDocUsageGuidelines.module.css";

export type ShowcaseDocAlternative = {
  label: string;
  path: string;
  note?: string;
};

type ShowcaseDocUsageGuidelinesProps = {
  do: string[];
  dont: string[];
  alternatives?: ShowcaseDocAlternative[];
};

export function ShowcaseDocUsageGuidelines({
  do: doItems,
  dont: dontItems,
  alternatives,
}: ShowcaseDocUsageGuidelinesProps) {
  return (
    <div className={styles.wrap}>
      <ShowcaseDoDont do={doItems} dont={dontItems} />
      {alternatives && alternatives.length > 0 ? (
        <div className={styles.alternatives}>
          <h3 className={styles.alternativesTitle}>Alternatives</h3>
          <ul className={styles.alternativesList}>
            {alternatives.map((item) => (
              <li key={item.path}>
                <Link className={styles.alternativesLink} to={showcasePagePath(item.path)}>
                  {item.label}
                </Link>
                {item.note ? (
                  <span className={styles.alternativesNote}> — {item.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
