import { useState } from "react";
import { Tab, Tabs } from "../../design-system/Tabs";
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
import styles from "./TabsShowcase.module.css";

const TAB_ITEMS = [
  { id: "issue", label: "Видача майна" },
  { id: "requests", label: "Запити" },
  { id: "reports", label: "Звіти" },
] as const;

const QUICK_EXAMPLE = `import { Tabs } from '@/design-system/Tabs';

const items = [
  { id: 'issue', label: 'Видача майна' },
  { id: 'requests', label: 'Запити' },
];

<Tabs items={items} value={tabId} onChange={setTabId} />`;

const TABS_PROPS = [
  {
    name: "items",
    type: "TabItem[]",
    required: true,
    description: "{ id, label } — вкладки.",
  },
  { name: "value", type: "string", required: true, description: "Обраний id." },
  {
    name: "onChange",
    type: "(id: string) => void",
    required: true,
    description: "Callback при виборі вкладки.",
  },
];

const TAB_PROPS = [
  {
    name: "selected",
    type: "boolean",
    default: "false",
    description: "Active — Mariupol Strong (--font-display) + помаранчева риска.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Підпис вкладки.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Typography",
    name: "--pryt-brand-font-size-700",
    usedIn: "Tab label 28px",
  },
  {
    category: "Typography",
    name: "--font-display + Mariupol Medium",
    usedIn: "Active Strong / default 500 — подвійний шар",
  },
  { category: "Color", name: "--text-default, --text-muted", usedIn: "Label" },
  { category: "Surface", name: "--surface-action", usedIn: "Indicator 4px" },
  { category: "Layout", name: "--space-medium, --space-2xlarge", usedIn: "Gap label–indicator, між табами" },
  { category: "Size", name: "--size-xsmall", usedIn: "Висота indicator (4px)" },
];

function TabsShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [value, setValue] = useState<string>(TAB_ITEMS[0].id);
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
        title="Tabs"
        description="Текстові вкладки з індикатором. Figma Tabs (1161:28678)."
      >
        <ShowcaseToolbar showThemeToggle />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Інтерактивно"
          description="Клік перемикає вкладку; неактивні — hover через CSS."
        >
          <Tabs items={TAB_ITEMS} value={value} onChange={setValue} />
          <p className={styles.hint}>Обрано: {value}</p>
        </ShowcaseSection>

        <ShowcaseSection
          title="Окремий Tab"
          description="Якщо потрібен кастомний layout — Tab окремо від Tabs."
        >
          <Tab selected onClick={() => {}}>
            Видача майна
          </Tab>
        </ShowcaseSection>

        <ShowcaseSection title="Props — Tabs">
          <ShowcasePropsTable props={TABS_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Props — Tab">
          <ShowcasePropsTable props={TAB_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Active — Mariupol Strong (Figma font/family/display); default — Medium 500.",
              "Обидва шари в DOM + фіксована висота — без зсуву при перемиканні.",
              "role=\"tablist\" / role=\"tab\" / aria-selected на Tabs і Tab.",
            ]}
            dont={[
              "Не дублюй Figma State=Default|Active як visualState для hover.",
              "Не використовуй Filter Chip / Badge для цієї навігації.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <ShowcaseThemeProvider>
      <TabsShowcasePage />
    </ShowcaseThemeProvider>
  );
}
