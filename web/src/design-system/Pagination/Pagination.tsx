import { useId, useState, type FormEvent } from "react";
import { Button } from "../Button";
import { IconDropdown } from "../Icons";
import type { PaginationProps } from "./Pagination.types";
import {
  buildPaginationItems,
  getDisplayedRange,
  getPageCount,
} from "./paginationUtils";
import styles from "./Pagination.module.css";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 25, 50] as const;

export function Pagination({
  page,
  totalItems,
  pageSize,
  pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS],
  onPageChange,
  onPageSizeChange,
  className,
  statusShownLabel = "Відображено",
  statusOfLabel = "записів з",
  jumpPrefixLabel = "перейти на",
  jumpSuffixLabel = "сторінку",
  pageSizeSuffixLabel = "записів на сторінці",
}: PaginationProps) {
  const jumpInputId = useId();
  const pageCount = getPageCount(totalItems, pageSize);
  const safePage = Math.min(Math.max(1, page), pageCount);
  const { start, end } = getDisplayedRange(safePage, pageSize, totalItems);
  const pageItems = buildPaginationItems(safePage, pageCount);

  const [isJumpEditing, setIsJumpEditing] = useState(false);
  const [jumpDraft, setJumpDraft] = useState(String(safePage));

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(1, next), pageCount);
    onPageChange?.(clamped);
  };

  const handleJumpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Number.parseInt(isJumpEditing ? jumpDraft : String(safePage), 10);
    if (!Number.isFinite(parsed)) {
      setIsJumpEditing(false);
      return;
    }
    goToPage(parsed);
    setIsJumpEditing(false);
  };

  const handleJumpFocus = () => {
    setIsJumpEditing(true);
    setJumpDraft(String(safePage));
  };

  const handleJumpBlur = () => {
    setIsJumpEditing(false);
  };

  return (
    <nav className={rootClass} aria-label="Пагінація">
      <p className={styles.status}>
        <span className={styles.statusPrefix}>{statusShownLabel}</span>
        <span className={styles.statusStrong}>
          {totalItems === 0 ? "0" : `${start}-${end}`}
        </span>
        <span>{statusOfLabel}</span>
        <span className={styles.statusStrong}>{totalItems}</span>
      </p>

      <div className={styles.controls}>
        <div className={styles.pageList} role="group" aria-label="Сторінки">
          <Button
            variant="nav"
            navAppearance="outline"
            className={styles.iconNav}
            disabled={safePage <= 1}
            showRightIcon={false}
            aria-label="Попередня сторінка"
            onClick={() => goToPage(safePage - 1)}
          >
            {null}
          </Button>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden>
                …
              </span>
            ) : (
              <Button
                key={item}
                variant="nav"
                navAppearance={item === safePage ? "outline" : "ghost"}
                active={item === safePage}
                showLeftIcon={false}
                showRightIcon={false}
                aria-label={`Сторінка ${item}`}
                aria-current={item === safePage ? "page" : undefined}
                onClick={() => goToPage(item)}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant="nav"
            navAppearance="outline"
            className={styles.iconNav}
            disabled={safePage >= pageCount}
            showLeftIcon={false}
            aria-label="Наступна сторінка"
            onClick={() => goToPage(safePage + 1)}
          >
            {null}
          </Button>
        </div>

        <form className={styles.jumpGroup} onSubmit={handleJumpSubmit}>
          <label htmlFor={jumpInputId}>{jumpPrefixLabel}</label>
          <input
            id={jumpInputId}
            className={styles.pageJumpInput}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={isJumpEditing ? jumpDraft : String(safePage)}
            onChange={(event) => setJumpDraft(event.target.value)}
            onFocus={handleJumpFocus}
            onBlur={handleJumpBlur}
            aria-label="Номер сторінки"
          />
          <span>{jumpSuffixLabel}</span>
        </form>
      </div>

      <div className={styles.pageSizeGroup}>
        <div className={styles.pageSizeField}>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange?.(Number.parseInt(event.target.value, 10))
            }
            aria-label={pageSizeSuffixLabel}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <IconDropdown
            className={styles.pageSizeIcon}
            size={13}
            height={8}
            aria-hidden
          />
        </div>
        <span className={styles.pageSizeSuffix}>{pageSizeSuffixLabel}</span>
      </div>
    </nav>
  );
}
