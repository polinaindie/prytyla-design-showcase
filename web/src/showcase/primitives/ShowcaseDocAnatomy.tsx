import type { ReactNode } from "react";
import styles from "./ShowcaseDocAnatomy.module.css";

type ShowcaseDocAnatomyLabel = {
  id: string;
  title: string;
  description?: string;
};

type ShowcaseDocAnatomyProps = {
  /** Diagram: component with callouts (image, SVG, or composed markup). */
  diagram: ReactNode;
  labels: ShowcaseDocAnatomyLabel[];
  caption?: string;
};

export function ShowcaseDocAnatomy({ diagram, labels, caption }: ShowcaseDocAnatomyProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.diagram}>{diagram}</div>
      {labels.length > 0 ? (
        <dl className={styles.legend}>
          {labels.map((item) => (
            <div key={item.id} className={styles.legendItem}>
              <dt className={styles.legendTerm}>{item.title}</dt>
              {item.description ? (
                <dd className={styles.legendDesc}>{item.description}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      ) : null}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
