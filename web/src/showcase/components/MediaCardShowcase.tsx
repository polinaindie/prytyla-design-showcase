import { MediaCard } from "../../design-system/MediaCard";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./MediaCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=292-6431";

const LOGO = "/showcase/media-times-logo.png";

const QUICK_EXAMPLE = `import { MediaCard } from '@/design-system/MediaCard';

<MediaCard
  href="https://www.thetimes.com/..."
  logoSrc="/media/the-times.svg"
  logoAlt="The Times"
  title="“Ukraine Needs Armored Vehicles. This Ukrainian Charity Bought Dozens.”"
  size="desktop"
/>`;

const DEMO_TITLE =
  "“Ukraine Needs Armored Vehicles. This Ukrainian Charity Bought Dozens.”";

const PROPS = [
  { name: "href", type: "string", required: true, description: "URL згадки в ЗМІ." },
  { name: "logoSrc", type: "string", required: true, description: "Логотип видання." },
  { name: "logoAlt", type: "string", description: "Alt логотипу (default — порожній у compact)." },
  { name: "title", type: "string", required: true, description: "Цитата / заголовок." },
  {
    name: "size",
    type: '"desktop" | "mobile"',
    default: '"desktop"',
    description: "Desktop — hover (миша) / :active (touch). Mobile — OnClick (:active).",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-section-dark, --surface-card-dark-elevated",
    usedIn: "Default / hover фон (Figma surface/section-dark, surface/card-dark-elevated)",
  },
  {
    category: "Border",
    name: "--border-dark, --border-muted, --border-default-on-dark, --border-width-small",
    usedIn: "Default / hover border, divider",
  },
  { category: "Text", name: "--text-on-inverse", usedIn: "Заголовок, іконки" },
  {
    category: "Typography",
    name: "--font-display, --font-size-heading-h4, --font-size-body-small",
    usedIn: "Desktop H4 / mobile 14px semibold",
  },
  {
    category: "Layout",
    name: "--space-2xlarge, --space-large, --space-small, --radius-large, --radius-medium",
    usedIn: "Padding, radius",
  },
  {
    category: "Icon",
    name: "IconArrowUpRight32, IconArrowUpRight10",
    usedIn: "Desktop hover / mobile hover (Figma 1162:29128)",
  },
];

const DEMO = {
  href: "https://www.thetimes.com/",
  logoSrc: LOGO,
  logoAlt: "The Times",
  title: DEMO_TITLE,
} as const;

function MediaCardShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Media Card"
        description={`Картка згадки в ЗМІ (Figma Media 292:6431). Default — логотип; hover/active — цитата + стрілка. Figma: ${FIGMA_URL}`}
      >
        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Desktop — hover (миша) / натискання (touch). Mobile — OnClick (:active), стрілка 10px."
        >
          <ShowcasePreview className={styles.previewDark}>
            <div className={styles.previewRow}>
              <MediaCard {...DEMO} />
              <MediaCard {...DEMO} size="mobile" />
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Variants"
          description="Default (ліворуч). Desktop — наведення (миша) або натискання (touch). Mobile — натисніть праву картку."
        >
          <ShowcaseMatrix
            columns={["Desktop Default", "Desktop Hover", "Mobile Default", "Mobile Active"]}
            rows={[
              {
                cells: [
                  <MediaCard key="d-def" {...DEMO} aria-label="Desktop — логотип" />,
                  <MediaCard
                    key="d-hov"
                    {...DEMO}
                    aria-label="Desktop — наведіть курсор"
                  />,
                  <MediaCard key="m-def" {...DEMO} size="mobile" aria-label="Mobile — логотип" />,
                  <MediaCard
                    key="m-act"
                    {...DEMO}
                    size="mobile"
                    aria-label="Mobile — натисніть або наведіть"
                  />,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Темний фон — на секції з --surface-section-dark або темнішим контекстом",
              "href на зовнішню статтю; target=\"_blank\" rel=\"noopener noreferrer\" у продукті",
              "На touch/tablet — розгорнутий стан лише під час натискання (:active), не :hover",
            ]}
            dont={[
              "Не використовуйте для світлих сіток без темного контейнера",
              "Не замінюйте логотип текстом — лише image logoSrc",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Accessibility">
          <p>
            Посилання <code>&lt;a href&gt;</code> з осмисленим <code>title</code> або{" "}
            <code>aria-label</code>. Focus ring — <code>--border-focus</code>. Логотип у compact
            режимі — декоративний (<code>aria-hidden</code>).
          </p>
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function MediaCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MediaCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
