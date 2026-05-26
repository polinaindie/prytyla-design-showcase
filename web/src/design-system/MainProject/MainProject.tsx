import { ProgressBar } from "../ProgressBar";
import type { MainProjectProps } from "./MainProject.types";
import styles from "./MainProject.module.css";

export function MainProject({
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
}: MainProjectProps) {
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
      <div className={styles.hero}>
        <div className={styles.imageMotion}>
          <img
            className={styles.image}
            src={imageSrc}
            alt={imageAlt}
            decoding="async"
            draggable={false}
          />
        </div>
        <div className={styles.heroContent}>
          <header className={styles.heroHeader}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </header>
          <div className={styles.glassPanel}>
            <div className={styles.panelBody}>
              <div className={styles.statsBlock}>
                <ProgressBar
                  value={progress}
                  className={styles.progressBar}
                  label={`Прогрес збору: ${Math.round(progress)}%`}
                />
                <div className={styles.amounts}>
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
        </div>
      </div>
    </article>
  );
}
