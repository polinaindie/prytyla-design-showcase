import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { IconChevronRight20 } from "../Icons";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import type { PhotoGalleryProps } from "./PhotoGallery.types";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery({
  className,
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  viewportTier,
  previousLabel = "Попереднє фото",
  nextLabel = "Наступне фото",
}: PhotoGalleryProps) {
  const captionId = useId();
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const programmaticScrollRef = useRef(false);
  const itemCount = items.length;
  const isSingle = itemCount <= 1;

  const [internalIndex, setInternalIndex] = useState(
    Math.min(Math.max(0, defaultIndex), Math.max(0, itemCount - 1)),
  );

  const activeIndex = Math.min(
    Math.max(0, index ?? internalIndex),
    Math.max(0, itemCount - 1),
  );

  const setIndex = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(0, next), Math.max(0, itemCount - 1));
      onIndexChange?.(clamped);
      if (index === undefined) {
        setInternalIndex(clamped);
      }
    },
    [index, itemCount, onIndexChange],
  );

  useEffect(() => {
    if (activeIndex > itemCount - 1 && itemCount > 0) {
      setIndex(itemCount - 1);
    }
  }, [activeIndex, itemCount, setIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setIndex(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    programmaticScrollRef.current = true;
    slideRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    const timer = window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 320);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    const viewport = mobileViewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const handleScroll = () => {
      if (programmaticScrollRef.current) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportRect = viewport.getBoundingClientRect();
        const centerX = viewportRect.left + viewportRect.width / 2;

        let closestIndex = activeIndex;
        let closestDistance = Number.POSITIVE_INFINITY;

        slideRefs.current.forEach((slide, slideIndex) => {
          if (!slide) return;
          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const distance = Math.abs(slideCenter - centerX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = slideIndex;
          }
        });

        if (closestIndex !== activeIndex) {
          setIndex(closestIndex);
        }
      });
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, setIndex]);

  if (itemCount === 0) {
    return null;
  }

  const currentItem = items[activeIndex];
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= itemCount - 1;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <section
      className={rootClass}
      data-viewport-tier={viewportTier}
      data-single={isSingle || undefined}
      data-many-thumbs={itemCount > 4 || undefined}
      aria-roledescription="carousel"
      aria-label="Галерея фото"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.desktopStage}>
        <div className={styles.mainFrame}>
          <img
            className={styles.mainImage}
            src={publicAssetUrl(currentItem.src)}
            alt={currentItem.alt ?? currentItem.caption}
            decoding="async"
            draggable={false}
          />
        </div>

        {itemCount > 1 ? (
          <>
            <div className={`${styles.navSlot} ${styles.navPrev}`}>
              <button
                type="button"
                className={styles.navButton}
                aria-label={previousLabel}
                disabled={isFirst}
                onClick={() => setIndex(activeIndex - 1)}
              >
                <IconChevronRight20 size={20} aria-hidden />
              </button>
            </div>

            <div className={`${styles.navSlot} ${styles.navNext}`}>
              <button
                type="button"
                className={styles.navButton}
                aria-label={nextLabel}
                disabled={isLast}
                onClick={() => setIndex(activeIndex + 1)}
              >
                <IconChevronRight20 size={20} aria-hidden />
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className={styles.mobileStage}>
        <div ref={mobileViewportRef} className={styles.mobileViewport}>
          {items.map((item, itemIndex) => (
              <button
                key={`${item.src}-${itemIndex}`}
                ref={(node) => {
                  slideRefs.current[itemIndex] = node;
                }}
                type="button"
                className={styles.mobileSlide}
                data-active={itemIndex === activeIndex || undefined}
                aria-label={item.caption}
                aria-current={itemIndex === activeIndex || undefined}
                onClick={() => setIndex(itemIndex)}
              >
                <img
                  className={styles.mobileImage}
                  src={publicAssetUrl(item.src)}
                  alt={item.alt ?? item.caption}
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
        </div>
      </div>

      <div className={styles.meta}>
        <p id={captionId} className={styles.caption} aria-live="polite">
          {currentItem.caption}
        </p>

        <div
          className={styles.thumbnails}
          role="tablist"
          aria-label="Мініатюри галереї"
        >
          {items.map((item, itemIndex) => {
            const selected = itemIndex === activeIndex;
            return (
              <button
                key={`thumb-${item.src}-${itemIndex}`}
                ref={(node) => {
                  thumbnailRefs.current[itemIndex] = node;
                }}
                type="button"
                role="tab"
                className={styles.thumbnailBtn}
                data-active={selected || undefined}
                aria-selected={selected}
                aria-label={item.caption}
                onClick={() => setIndex(itemIndex)}
              >
                <img
                  className={styles.thumbnailImage}
                  src={publicAssetUrl(item.src)}
                  alt=""
                  decoding="async"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
