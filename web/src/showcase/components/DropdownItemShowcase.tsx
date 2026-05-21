import { useState } from "react";
import { DropdownItem } from "../../design-system/DropdownItem";
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
import styles from "./DropdownItemShowcase.module.css";

const QUICK_EXAMPLE = `import { DropdownItem } from '@/design-system/DropdownItem';

<li>
  <DropdownItem onClick={handleSelect}>Newest first</DropdownItem>
</li>`;

const PROPS = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Текст пункту.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Нативний disabled на <button>.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Typography",
    name: "--pryt-brand-font-size-400",
    usedIn: "Label 16px regular",
  },
  { category: "Color", name: "--text-default", usedIn: "Label" },
  {
    category: "Surface",
    name: "--surface-default, --surface-subtle-neutral",
    usedIn: "Default / hover (≈ Figma #F0F0F0)",
  },
  {
    category: "Layout",
    name: "--space-xlarge, --space-small",
    usedIn: "Padding 20×8",
  },
];

const SORT_OPTIONS = [
  "Newest first",
  "Oldest first",
  "Most funded",
  "Closing soon",
];

function DropdownItemShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
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
        title="Dropdown Item"
        description="Один пункт списку в dropdown. Figma Small Dropdown Item (473:6474). Обгортку меню додамо окремим компонентом."
      >
        <ShowcaseToolbar showThemeToggle />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
        </ShowcaseSection>

        <ShowcaseSection
          title="У списку"
          description="Клік і hover — наведи на пункт. Ширина від контейнера меню."
        >
          <ul className={styles.menu}>
            {SORT_OPTIONS.map((label) => (
              <li key={label}>
                <DropdownItem
                  onClick={() => setSelected(label)}
                  aria-current={selected === label ? "true" : undefined}
                >
                  {label}
                </DropdownItem>
              </li>
            ))}
          </ul>
          <p className={styles.cellLabel}>Обрано: {selected}</p>
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
              "Використовуй всередині майбутнього DropdownMenu / Select.",
              "Hover у продукті — через :hover і :focus-visible на кнопці.",
            ]}
            dont={[
              "Не додавай role=\"menu\" / menuitem на цьому рівні — це зона батьківського компонента.",
              "Не фіксуй width на самому DropdownItem — width: 100% від контейнера.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function DropdownItemShowcase() {
  return (
    <ShowcaseThemeProvider>
      <DropdownItemShowcasePage />
    </ShowcaseThemeProvider>
  );
}
