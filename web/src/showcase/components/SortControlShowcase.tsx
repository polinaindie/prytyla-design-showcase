import { useState } from "react";
import { SortControl } from "../../design-system/SortControl";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./SortControlShowcase.module.css";

const OPTIONS = [
  { id: "active", label: "Активні проєкти" },
  { id: "done", label: "Реалізовані проєкти" },
];

const QUICK_EXAMPLE = `import { SortControl } from '@/design-system/SortControl';

<SortControl
  label="Сортування"
  options={[
    { id: 'active', label: 'Активні проєкти' },
    { id: 'done', label: 'Реалізовані проєкти' },
  ]}
  value={sortId}
  onChange={setSortId}
  count={16}
/>`;

const PROPS = [
  {
    name: "options",
    type: "SortOption[]",
    required: true,
    description: "{ id, label } — пункти меню (DropdownItem).",
  },
  { name: "value", type: "string", required: true, description: "Обраний id." },
  {
    name: "onChange",
    type: "(id: string) => void",
    required: true,
    description: "Callback при виборі.",
  },
  {
    name: "label",
    type: "string",
    default: '"Сортування"',
    description: "Статичний підпис зліва.",
  },
  {
    name: "count",
    type: "number",
    description: "Лічильник у тригері: «Label (16)».",
  },
  {
    name: "open / onOpenChange",
    type: "boolean",
    description: "Контрольований стан панелі.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Typography", name: "--text-muted, --text-default", usedIn: "Label / value" },
  { category: "Typography", name: "--pryt-brand-font-size-400", usedIn: "16px type" },
  { category: "Layout", name: "--space-small, --space-xsmall", usedIn: "Gaps" },
  { category: "Surface", name: "--surface-default", usedIn: "Dropdown panel" },
  { category: "Border", name: "--border-default", usedIn: "Panel border" },
  { category: "Radius", name: "--radius-medium", usedIn: "Panel corners" },
];

function SortControlShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState("active");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Sort Control"
        description="Сортування з dropdown. Figma Sorting (473:6498) + DropdownItem."
      >
        <ShowcaseToolbar showThemeToggle />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
          <SortControl
            options={OPTIONS}
            value={value}
            onChange={setValue}
            count={16}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Пункти меню — DropdownItem з role=\"option\" і aria-selected.",
              "count лише на тригері; в меню — короткі label без числа.",
            ]}
            dont={[
              "Не дублюй логіку пункту — зміни лише в DropdownItem.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function SortControlShowcase() {
  return (
    <ShowcaseThemeProvider>
      <SortControlShowcasePage />
    </ShowcaseThemeProvider>
  );
}
