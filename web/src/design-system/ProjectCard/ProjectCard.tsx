import { ProgressBar } from "../ProgressBar";
import type { ProjectCardProps } from "./ProjectCard.types";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  href,
  donateHref,
  imageSrc,
  imageAlt = "",
  title,
  description,
  progress,
  collectedAmount,
  goalAmount,
  collectedLabel = "Зібрано",
  goalLabel = "Ціль",
  donateLabel = "Підтримати проєкт",
  cardAriaLabel,
  size = "desktop",
  className,
  ...rest
}: ProjectCardProps) {
  const rootClass = [
    styles.root,
    size === "mobile"
      ? styles.mobile
      : size === "tablet"
        ? styles.tablet
        : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClass} data-size={size} {...rest}>
      <a
        href={href}
        className={styles.cardLink}
        aria-label={cardAriaLabel ?? title}
        tabIndex={0}
      />
      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <div className={styles.imageMotion}>
            <img
              className={styles.image}
              src={imageSrc}
              alt={imageAlt}
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.info}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.progressSection}>
              <ProgressBar
                value={progress}
                className={styles.progressBar}
                label={`Прогрес збору: ${Math.round(progress)}%`}
              />
              <div className={styles.stats}>
                <div className={styles.statBlock}>
                  <p className={styles.statLabel}>{collectedLabel}</p>
                  <p className={styles.statValue}>{collectedAmount}</p>
                </div>
                <div className={`${styles.statBlock} ${styles.statBlockEnd}`}>
                  <p className={styles.statLabel}>{goalLabel}</p>
                  <p className={`${styles.statValue} ${styles.statValueGoal}`}>
                    {goalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            href={donateHref}
            className={styles.donateBtn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            {donateLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
