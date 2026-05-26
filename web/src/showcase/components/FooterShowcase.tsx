import { Footer } from "../../design-system/Footer";
import type { FooterSocialLink } from "../../design-system/Footer";
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
import styles from "./FooterShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=451-3822";

const SOCIAL_LINKS: FooterSocialLink[] = [
  { network: "facebook", href: "https://facebook.com/", label: "Facebook" },
  { network: "instagram", href: "https://instagram.com/", label: "Instagram" },
  { network: "telegram", href: "https://t.me/", label: "Telegram" },
  { network: "x", href: "https://x.com/", label: "X" },
  { network: "linkedin", href: "https://linkedin.com/", label: "LinkedIn" },
  { network: "youtube", href: "https://youtube.com/", label: "YouTube" },
];

const QUICK_EXAMPLE = `import { Footer } from '@/design-system/Footer';

<Footer
  size="desktop"
  donateHref="/donate/military"
  socialLinks={[
    { network: "facebook", href: "https://facebook.com/", label: "Facebook" },
    // …
  ]}
/>`;

const PROPS = [
  { name: "donateHref", type: "string", required: true, description: "CTA «Допомогти війську»." },
  { name: "size", type: '"desktop" | "tablet" | "mobile"', default: '"desktop"', description: "Figma Size." },
  { name: "ctaTitle", type: "string", description: "Заголовок CTA (H3)." },
  { name: "ctaDescription", type: "string", description: "Текст CTA; \\n для переносу." },
  { name: "navColumn1", type: "FooterNavLink[]", description: "Ліва колонка nav (дефолт — Figma)." },
  { name: "navColumn2", type: "FooterNavLink[]", description: "Права колонка nav." },
  { name: "socialLinks", type: "FooterSocialLink[]", required: true, description: "6 соцмереж." },
  { name: "hotlineHref", type: "string", description: "tel:…" },
  { name: "emailHref", type: "string", description: "mailto:…" },
  { name: "poweredBySrc", type: "string", description: "SVG/PNG powered by." },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--bg-subtle-info, --accent-primary, --surface-action", usedIn: "CTA фон / dark card / кнопка" },
  { category: "Surface", name: "--surface-contact-subtle, --surface-contact-subtle-hover", usedIn: "Social chips" },
  { category: "Text", name: "--text-default, --text-on-inverse, --text-secondary", usedIn: "CTA / footer / copyright" },
  { category: "Typography", name: "--font-size-heading-h3, --font-size-body-large, --font-size-body-medium", usedIn: "Type scale" },
  { category: "Layout", name: "--space-6xlarge, --space-5xlarge, --space-3xlarge, --radius-xlarge", usedIn: "Spacing, radius" },
  { category: "Brand", name: "IconBrandVprytyl", usedIn: "Логотип у dark card" },
];

const DEMO = {
  donateHref: "/donate/military",
  socialLinks: SOCIAL_LINKS,
} as const;

function FooterShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Footer"
        description={`Підвал з CTA та темною карткою (Figma 451:3822). Figma: ${FIGMA_URL}`}
      >
        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection title="Live preview" description="Desktop, width 100%.">
          <ShowcasePreview className={styles.preview}>
            <Footer {...DEMO} />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes">
          <ShowcaseMatrix
            columns={["Desktop", "Tablet", "Mobile"]}
            rows={[
              {
                cells: [
                  <Footer key="d" {...DEMO} size="desktop" />,
                  <Footer key="t" {...DEMO} size="tablet" />,
                  <Footer key="m" {...DEMO} size="mobile" />,
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
              "donateHref — сторінка донату для CTA",
              "socialLinks — 6 мереж з aria-label; target=_blank на соцмережах",
              "Існуючі alias: --bg-subtle-info, --accent-primary, --surface-contact-subtle",
            ]}
            dont={[
              "Не дублюйте footer у product pages — імпортуйте Footer з design-system",
              "Не замінюйте IconBrandVprytyl текстом",
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

export function FooterShowcase() {
  return (
    <ShowcaseThemeProvider>
      <FooterShowcasePage />
    </ShowcaseThemeProvider>
  );
}
