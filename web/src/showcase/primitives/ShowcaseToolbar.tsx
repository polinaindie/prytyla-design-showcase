import type { ReactNode } from "react";
import { useShowcaseTheme } from "./ShowcaseThemeContext";
import type { ShowcaseThemeMode } from "./showcase.types";
import styles from "./ShowcaseToolbar.module.css";

export type ShowcaseToolbarFilter = {
  id: string;
  label: string;
};

type ShowcaseToolbarProps = {
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  searchIcon?: ReactNode;
  showThemeToggle?: boolean;
  filters?: ShowcaseToolbarFilter[];
  activeFilterIds?: string[];
  onToggleFilter?: (id: string) => void;
};

export function ShowcaseToolbar({
  showSearch = false,
  searchPlaceholder = "Пошук…",
  searchValue = "",
  onSearch,
  searchIcon,
  showThemeToggle = true,
  filters,
  activeFilterIds = [],
  onToggleFilter,
}: ShowcaseToolbarProps) {
  const { theme, setTheme } = useShowcaseTheme();

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Панель showcase">
      {showThemeToggle ? (
        <div className={styles.group}>
          <span className={styles.label}>Тема</span>
          <div className={styles.themeToggle} role="group" aria-label="Перемикач теми">
            {(["light", "dark"] as ShowcaseThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`${styles.themeButton} ${theme === mode ? styles.themeButtonActive : ""}`}
                aria-pressed={theme === mode}
                onClick={() => setTheme(mode)}
              >
                {mode === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {showSearch && onSearch ? (
        <div className={styles.searchWrap}>
          {searchIcon ? <span className={styles.searchIcon}>{searchIcon}</span> : null}
          <input
            type="search"
            className={styles.search}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) => onSearch(event.target.value)}
            aria-label={searchPlaceholder}
          />
        </div>
      ) : null}

      {filters && filters.length > 0 && onToggleFilter ? (
        <div className={styles.filters} role="group" aria-label="Категорії іконок">
          {filters.map((filter) => {
            const active = activeFilterIds.includes(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                aria-pressed={active}
                onClick={() => onToggleFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
