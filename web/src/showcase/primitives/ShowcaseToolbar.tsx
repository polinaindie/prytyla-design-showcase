import { useShowcaseTheme } from "./ShowcaseThemeContext";
import type { ShowcaseThemeMode } from "./showcase.types";
import styles from "./ShowcaseToolbar.module.css";

type ShowcaseToolbarProps = {
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  showThemeToggle?: boolean;
};

export function ShowcaseToolbar({
  showSearch = false,
  searchPlaceholder = "Пошук…",
  searchValue = "",
  onSearch,
  showThemeToggle = true,
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
        <input
          type="search"
          className={styles.search}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearch(event.target.value)}
          aria-label={searchPlaceholder}
        />
      ) : null}
    </div>
  );
}
