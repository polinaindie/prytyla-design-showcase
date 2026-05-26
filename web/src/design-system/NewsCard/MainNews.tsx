import { IconChevronRight20 } from "../Icons";
import { NewsCard } from "./NewsCard";
import type { MainNewsProps } from "./MainNews.types";
import styles from "./MainNews.module.css";
import { NewsCardPagination } from "./NewsCardPagination";

export function MainNews({
  card,
  slideCount = 3,
  activeIndex = 0,
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
  className,
  ...rest
}: MainNewsProps) {
  const rootClass = [styles.mainNews, className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} {...rest}>
      <div className={styles.slideRow}>
        <NewsCard {...card} />
        {showPrev ? (
          <div className={`${styles.navSlot} ${styles.navPrev}`}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Попередня новина"
              onClick={(event) => {
                event.preventDefault();
                onPrev?.();
              }}
            >
              <IconChevronRight20 size={20} aria-hidden />
            </button>
          </div>
        ) : null}
        {showNext ? (
          <div className={`${styles.navSlot} ${styles.navNext}`}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Наступна новина"
              onClick={(event) => {
                event.preventDefault();
                onNext?.();
              }}
            >
              <IconChevronRight20 size={20} aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
      <NewsCardPagination count={slideCount} activeIndex={activeIndex} />
    </div>
  );
}
