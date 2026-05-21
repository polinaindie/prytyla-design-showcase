import { DirectionsExternalLinks } from "../../design-system/DirectionsExternalLinks";
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
import styles from "./DirectionsExternalLinksShowcase.module.css";

const QUICK_EXAMPLE = `import { DirectionsExternalLinks } from '@/design-system/DirectionsExternalLinks';

<DirectionsExternalLinks
  href="/military-aid"
  index="01"
  title="Допомога військовим"
  size="desktop"
/>`;

const PROPS = [
  { name: "index", type: "string", required: true, description: "Номер рядка (01, 02, …)." },
  { name: "title", type: "string", required: true, description: "Заголовок напряму." },
  { name: "href", type: "string", required: true, description: "URL посилання (як LinkCard)." },
  {
    name: "size",
    type: '"desktop" | "mobile"',
    default: '"desktop"',
    description: "Desktop — 52px index, 32px title, icon 64; mobile — 32/18px, icon 32.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Text", name: "--text-default", usedIn: "Index, title, icon" },
  {
    category: "Border",
    name: "--border-strong, --border-width-small",
    usedIn: "Top/bottom rules",
  },
  {
    category: "Surface",
    name: "--pryt-brand-orange-200",
    usedIn: "Hover (#ffeb85, Figma state/hover-list-row)",
  },
  {
    category: "Typography",
    name: "--pryt-brand-font-size-1000 / 800 / 450",
    usedIn: "Index + title (desktop/mobile)",
  },
  {
    category: "Typography",
    name: "--pryt-brand-font-family-heading, --font-display",
    usedIn: "Mariupol index + Strong title",
  },
  { category: "Layout", name: "--space-large", usedIn: "Padding 16px, gap" },
];

const DEMO_ITEMS = [
  { index: "01", title: "Допомога військовим", href: "#military" },
  { index: "02", title: "Гуманітарний напрям", href: "#humanitarian" },
  { index: "03", title: "Медичний напрям", href: "#medical" },
];

function DirectionsExternalLinksShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Directions External Links"
        description="Рядок-посилання на зовнішній напрям (Figma 3:7303). Як LinkCard — <a href>, але list-row з номером, display-заголовком і Arrow-Up-Right."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Desktop"
          description="Наведи курсор — жовтий фон (Hover). Склади кілька рядків у колонку."
        >
          <div className={styles.list}>
            {DEMO_ITEMS.map((item) => (
              <DirectionsExternalLinks key={item.index} {...item} size="desktop" />
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Mobile">
          <div className={`${styles.list} ${styles.listMobile}`}>
            <DirectionsExternalLinks
              href="#"
              index="01"
              title="Допомога військовим"
              size="mobile"
            />
          </div>
          <p className={styles.hint}>max-width 343px (Figma mobile)</p>
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй для списку напрямів / зовнішніх розділів на лендингу.",
              "Групуй рядки в колонку — бордери зливаються в список.",
              "Передай коректний href; для зовнішніх URL — target=\"_blank\" + rel.",
            ]}
            dont={[
              "НЕ плутай з LinkCard (pill + 3D-ілюстрація).",
              "НЕ додавай variant/state props — лише Default + Hover у Figma.",
              "НЕ хардкодуй жовтий hover — тільки --pryt-brand-orange-200 (поки без Alias).",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function DirectionsExternalLinksShowcase() {
  return (
    <ShowcaseThemeProvider>
      <DirectionsExternalLinksShowcasePage />
    </ShowcaseThemeProvider>
  );
}
