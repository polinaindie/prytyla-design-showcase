import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { Button } from "../Button";
import {
  IconArrowLeftDouble10,
  IconArrowRightDouble10,
  IconClose,
} from "../Icons";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import type { EvidenceViewerProps } from "./EvidenceViewer.types";
import styles from "./EvidenceViewer.module.css";

const DOUBLE_TAP_MS = 300;
const ZOOM_HINT_PHOTO = "Клікніть двічі на фото для збільшення масштабу";
const ZOOM_HINT_DOCUMENT =
  "Клікніть двічі на документ для збільшення масштабу";

type PanOffset = { x: number; y: number };

export function EvidenceViewer({
  className,
  open = true,
  onClose,
  layout = "modal",
  viewportTier,
  title,
  mode,
  items,
  page,
  defaultPage = 1,
  onPageChange,
  previousLabel = "попередня",
  nextLabel = "наступна",
  closeLabel = "Закрити",
}: EvidenceViewerProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTapRef = useRef(0);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const [internalPage, setInternalPage] = useState(defaultPage);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState<PanOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const pageCount = Math.max(1, items.length);
  const currentPage = Math.min(
    Math.max(1, page ?? internalPage),
    pageCount,
  );
  const currentItem = items[currentPage - 1];
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  const setPage = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(1, next), pageCount);
      onPageChange?.(clamped);
      if (page === undefined) {
        setInternalPage(clamped);
      }
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    },
    [onPageChange, page, pageCount],
  );

  useEffect(() => {
    if (!open || layout !== "modal") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [layout, onClose, open]);

  useEffect(() => {
    if (open && layout === "modal") {
      closeBtnRef.current?.focus();
    }
  }, [layout, open]);

  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [currentPage, mode]);

  if (!open || !currentItem) {
    return null;
  }

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const toggleZoom = () => {
    setZoomed((value) => {
      if (value) {
        setPan({ x: 0, y: 0 });
        setIsDragging(false);
      }
      return !value;
    });
  };

  const handleMediaDoubleClick = () => {
    toggleZoom();
  };

  const handleMediaTouchEnd = () => {
    if (isDragging) return;

    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      toggleZoom();
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!zoomed || event.button !== 0) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !zoomed) return;

    setPan({
      x: dragStartRef.current.panX + event.clientX - dragStartRef.current.x,
      y: dragStartRef.current.panY + event.clientY - dragStartRef.current.y,
    });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={rootClass}
      data-layout={layout}
      data-viewport-tier={viewportTier}
      role={layout === "modal" ? "dialog" : undefined}
      aria-modal={layout === "modal" ? true : undefined}
      aria-labelledby={titleId}
      onClick={layout === "modal" ? handleBackdropClick : undefined}
    >
      <div className={styles.shell} onClick={(event) => event.stopPropagation()}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            aria-label={closeLabel}
            onClick={onClose}
          >
            <IconClose className={styles.closeIcon} size={24} aria-hidden />
          </button>
        </header>

        <div className={styles.viewport} data-mode={mode}>
          <div
            className={styles.mediaStage}
            data-zoomed={zoomed || undefined}
            data-dragging={isDragging || undefined}
            onDoubleClick={handleMediaDoubleClick}
            onTouchEnd={handleMediaTouchEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={styles.mediaPan}
              style={
                zoomed
                  ? { transform: `translate(${pan.x}px, ${pan.y}px)` }
                  : undefined
              }
            >
              <img
                className={styles.mediaImage}
                data-zoomed={zoomed || undefined}
                src={publicAssetUrl(currentItem.src)}
                alt={currentItem.alt ?? title}
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
          <p className={styles.zoomHint}>
            {mode === "photo" ? ZOOM_HINT_PHOTO : ZOOM_HINT_DOCUMENT}
          </p>
        </div>

        <footer className={styles.footer}>
          <nav className={styles.nav} aria-label="Навігація між доказами">
            <Button
              variant="nav"
              navAppearance="outline"
              className={styles.navIconOnly}
              disabled={isFirstPage}
              showRightIcon={false}
              leftIcon={<IconArrowLeftDouble10 size={10} aria-hidden />}
              aria-label="Перший доказ"
              onClick={() => setPage(1)}
            >
              {null}
            </Button>

            <Button
              variant="nav"
              navAppearance="outline"
              className={styles.navCompactIconOnly}
              disabled={isFirstPage}
              showRightIcon={false}
              aria-label={previousLabel}
              onClick={() => setPage(currentPage - 1)}
            >
              <span className={styles.navCompactLabel}>{previousLabel}</span>
            </Button>

            <Button
              variant="nav"
              navAppearance="outline"
              active
              className={styles.pageIndicator}
              showLeftIcon={false}
              showRightIcon={false}
              aria-current="true"
              aria-label={`Доказ ${currentPage} з ${pageCount}`}
            >
              {`${currentPage} / ${pageCount}`}
            </Button>

            <Button
              variant="nav"
              navAppearance="outline"
              className={styles.navCompactIconOnly}
              disabled={isLastPage}
              showLeftIcon={false}
              aria-label={nextLabel}
              onClick={() => setPage(currentPage + 1)}
            >
              <span className={styles.navCompactLabel}>{nextLabel}</span>
            </Button>

            <Button
              variant="nav"
              navAppearance="outline"
              className={styles.navIconOnly}
              disabled={isLastPage}
              showRightIcon={false}
              leftIcon={<IconArrowRightDouble10 size={10} aria-hidden />}
              aria-label="Останній доказ"
              onClick={() => setPage(pageCount)}
            >
              {null}
            </Button>
          </nav>
        </footer>
      </div>
    </div>
  );
}
