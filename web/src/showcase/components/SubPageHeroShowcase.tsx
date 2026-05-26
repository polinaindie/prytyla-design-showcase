import { useState } from "react";
import { SubPageHero } from "../../design-system/SubPageHero";
import type { SubPageHeroBackground, SubPageHeroLink } from "../../design-system/SubPageHero";
import { Tabs } from "../../design-system/Tabs";
import type { TabItem } from "../../design-system/Tabs";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./SubPageHeroShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1634-40752";
const FIGMA_COMPONENT_SET_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=408-3881";

const FIGMA_MOBILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=817-13626";

const DEMO_LINKS: [SubPageHeroLink, SubPageHeroLink] = [
  {
    title: "Проєкти гуманітарного напрямку",
    href: "#humanitarian",
    illustration: "humanitarianProjects",
  },
  {
    title: "Проєкти цивільного напрямку",
    href: "#civilian",
    illustration: "projects",
  },
];

const DEMO_DESCRIPTION = (
  <>
    Фонд працює без комісій: усі донати спрямовуються на Сили оборони, а роботу Фонду можна{" "}
    <a href="#support">підтримати</a> окремо.
  </>
);

const DEMO_COPY = {
  title: "Проєкти",
  description: DEMO_DESCRIPTION,
};

const VARIANT_TABS: TabItem[] = [
  { id: "links", label: "Links" },
  { id: "image", label: "Image" },
];

const BACKGROUNDS: { id: SubPageHeroBackground; label: string; token: string }[] = [
  { id: "orange", label: "Orange (FFA400)", token: "--accent-secondary" },
  { id: "amber", label: "Amber (FFDA46)", token: "--pryt-brand-orange-300" },
  { id: "sky", label: "Sky (E9F7FF)", token: "--surface-subtle-info" },
  { id: "blue", label: "Blue (CEECFF)", token: "--surface-info" },
  { id: "gray", label: "Gray (E7E7E7)", token: "--bg-badge" },
  { id: "warm", label: "Warm (FFF5C5)", token: "--accent-highlight" },
];

const QUICK_EXAMPLE = `import { SubPageHero } from '@/design-system/SubPageHero';

<SubPageHero
  variant="links"
  background="orange"
  title="Новини"
  description="Короткий опис сторінки."
  links={[
    { title: "Напрямок А", href: "/a", illustration: "humanitarianProjects" },
    { title: "Напрямок Б", href: "/b", illustration: "civilianTraining" },
  ]}
/>`;

const PROPS = [
  { name: "variant", type: '"links" | "image"', required: true, description: "З картками або з 3D-ілюстрацією." },
  { name: "title", type: "string", required: true, description: "H0 заголовок." },
  {
    name: "description",
    type: "ReactNode",
    description: "Текст під заголовком; <a> всередині — accent link (Figma 817:13626).",
  },
  { name: "background", type: "SubPageHeroBackground", default: '"orange"', description: "Колір фону (6 токенів)." },
  {
    name: "links",
    type: "[SubPageHeroLink, SubPageHeroLink]",
    description: "Рівно 2 LinkCard — лише для variant=\"links\".",
  },
  {
    name: "illustration",
    type: "Illustration3DVariant",
    default: '"humanitarianProjects"',
    description: "Для variant=\"image\".",
  },
  {
    name: "showTitle",
    type: "boolean",
    default: "true",
    description: "Показувати H0.",
  },
  {
    name: "showDescription",
    type: "boolean",
    default: "true",
    description: "Показувати опис.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--accent-secondary, --pryt-brand-orange-300, --surface-subtle-info, --surface-info, --bg-badge, --accent-highlight",
    usedIn: "background prop (6 Figma fills)",
  },
  {
    category: "Typography",
    name: "--font-display, --font-size-heading-h0, --font-size-body-large",
    usedIn: "Responsive H0 + body",
  },
  { category: "Layout", name: "--space-large, --space-3xlarge, --space-6xlarge, --radius-large", usedIn: "Padding, gap, radius" },
  { category: "Composite", name: "LinkCard, Illustration3D", usedIn: "links / image variants" },
];

function SubPageHeroShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [variant, setVariant] = useState<"links" | "image">("links");
  const [background, setBackground] = useState<SubPageHeroBackground>("amber");

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Sub-page Hero"
        description={`Hero підсторінки: links desktop — ${FIGMA_URL}; варіанти — ${FIGMA_COMPONENT_SET_URL}`}
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description={`Вкладки Links / Image та вибір фону. Ширина зверху (1920–375) — container для breakpoints. Mobile ref: ${FIGMA_MOBILE_URL}`}
        >
          <div className={styles.controls}>
            <Tabs
              items={VARIANT_TABS}
              value={variant}
              onChange={(id) => setVariant(id as "links" | "image")}
              aria-label="Варіант Sub-page Hero"
            />
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel} htmlFor="subpage-hero-background">
                Колір фону
              </label>
              <select
                id="subpage-hero-background"
                className={styles.select}
                value={background}
                onChange={(event) =>
                  setBackground(event.target.value as SubPageHeroBackground)
                }
              >
                {BACKGROUNDS.map(({ id, label, token }) => (
                  <option key={id} value={id}>
                    {label} · {token}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ShowcasePreview flush>
            {variant === "links" ? (
              <SubPageHero
                variant="links"
                background={background}
                links={DEMO_LINKS}
                {...DEMO_COPY}
              />
            ) : (
              <SubPageHero
                variant="image"
                background={background}
                illustration="humanitarianProjects"
                {...DEMO_COPY}
              />
            )}
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Завжди передавайте рівно 2 елементи в links",
              "Використовуйте background з SubPageHeroBackground — без raw hex",
            ]}
            dont={[
              "Не додавайте третю LinkCard без оновлення Figma",
              "Не задавайте size prop — layout через container queries (ширина hero)",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function SubPageHeroShowcase() {
  return (
    <ShowcaseThemeProvider>
      <SubPageHeroShowcasePage />
    </ShowcaseThemeProvider>
  );
}
