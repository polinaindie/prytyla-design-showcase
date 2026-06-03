import { useMemo } from "react";
import { MultiDrop } from "../MultiDrop";
import { IconSearch } from "../Icons";
import { TextField } from "../TextField";
import type { DepartmentSelectProps } from "./DepartmentSelect.types";
import styles from "./DepartmentSelect.module.css";

const DEFAULT_SEARCH_PLACEHOLDER = "Пошук відомства";

export function DepartmentSelect({
  options,
  selectedIds,
  onSelectionChange,
  searchQuery = "",
  onSearchQueryChange,
  searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
  showFooter = false,
  onClearSelection,
  clearSelectionLabel = "Очистити обрані",
  selectedCountLabel = (count) => `Обрано: ${count}`,
  className,
}: DepartmentSelectProps) {
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const filteredOptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, searchQuery]);

  const listClass = [
    styles.list,
    showFooter && styles.listWithFooter,
  ]
    .filter(Boolean)
    .join(" ");

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const toggleOption = (id: string) => {
    const next = new Set(selectedSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectionChange([...next]);
  };

  const handleClear = () => {
    if (onClearSelection) {
      onClearSelection();
      return;
    }
    onSelectionChange([]);
  };

  return (
    <div className={rootClass}>
      <div className={styles.header}>
        <TextField
          className={styles.search}
          hideLabel
          hideHelperText
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(event) => onSearchQueryChange?.(event.target.value)}
          leadingIcon={<IconSearch size={24} aria-hidden />}
          aria-label={searchPlaceholder}
        />
        <hr className={styles.divider} />
      </div>

      <ul className={listClass} role="listbox" aria-multiselectable="true">
        {filteredOptions.map((option) => {
          const checked = selectedSet.has(option.id);
          return (
            <li key={option.id} role="presentation">
              <MultiDrop
                label={option.label}
                level={1}
                checkboxState={checked ? "checked" : "empty"}
                onToggle={() => toggleOption(option.id)}
              />
            </li>
          );
        })}
      </ul>

      {showFooter ? (
        <footer className={styles.footer}>
          <hr className={styles.divider} />
          <div className={styles.footerInner}>
            <span className={styles.selectedCount}>
              {selectedCountLabel(selectedIds.length)}
            </span>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              disabled={selectedIds.length === 0}
            >
              {clearSelectionLabel}
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
