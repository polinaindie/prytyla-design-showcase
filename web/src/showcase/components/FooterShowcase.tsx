import { useMemo, useState } from "react";
import { Footer } from "../../design-system/Footer";
import type { FooterSocialLink } from "../../design-system/Footer";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { figmaComponentSizeForViewportWidth } from "../showcaseTypography";
import {
  showcaseViewportName,
  showcaseViewportWidth,
  type ShowcaseViewportId,
} from "../ShowcaseViewportContext";
import { useCssVarValues } from "../tokens/useCssVarValues";
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

const LIVE_PREVIEW_CODE = `import { Footer } from "@/design-system/Footer";

<Footer
  donateHref="/donate/military"
  socialLinks={socialLinks}
/>`;

const DEMO = {
  donateHref: "/donate/military",
  socialLinks: SOCIAL_LINKS,
} as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "donateHref",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "CTA «Допомогти війську».",
  },
  {
    property: "size",
    type: '"desktop" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Figma Size breakpoints.",
  },
  {
    property: "ctaTitle / ctaDescription",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "Figma defaults",
    description: "Заголовок H3 + текст CTA; \\n у description.",
  },
  {
    property: "navColumn1 / navColumn2",
    type: "FooterNavLink[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "footerDefaults",
    description: "Дві колонки навігації.",
  },
  {
    property: "socialLinks",
    type: "FooterSocialLink[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "6 соцмереж з aria-label.",
  },
  {
    property: "hotlineHref / emailHref",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "tel: / mailto:",
    description: "Контакти в dark card.",
  },
  {
    property: "logoLanguage / logoHref",
    type: "uk | en / string",
    typeKind: "VARIANT",
    optionsDefault: '"uk"',
    description: "Logo variant=inverse у dark card.",
  },
  {
    property: "poweredBySrc / poweredByAlt",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "default asset",
    description: "Powered by блок.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--bg-subtle-info" },
  { element: "Dark card", property: "background", token: "--accent-primary" },
  { element: "CTA button", property: "background", token: "--surface-action" },
  { element: "CTA button", property: "color", token: "--text-on-action" },
  { element: "Dark card", property: "color", token: "--text-on-inverse" },
  { element: "CTA title", property: "font-size", token: "--font-size-heading-h3" },
  { element: "Body", property: "font-size", token: "--font-size-body-medium" },
  { element: "Social chip", property: "background", token: "--surface-contact-subtle" },
  { element: "Social hover", property: "background", token: "--surface-contact-subtle-hover" },
  { element: "Dark card", property: "border-radius", token: "--radius-xlarge" },
] as const;

function FooterShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const footerSize = figmaComponentSizeForViewportWidth(previewWidth);

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Footer"
        description="Підвал сайту: CTA «Допомогти війську», темна картка з nav, контактами та соцмережами."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — перемикай у toolbar; Figma size підбирається автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${footerSize} · default nav + 6 social links.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <Footer {...DEMO} size={footerSize} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Logo — <code>variant=&quot;inverse&quot;</code> height 32px; не brand
            token у CSS, inline height у компоненті Logo.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Social chips — hover --surface-contact-subtle-hover.",
              "CTA button — hover --surface-action-hover.",
              "Nav links — underline on hover у dark card.",
              "Без controlled state props.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<footer> з семантичною структурою nav.",
              "socialLinks — aria-label + target=_blank rel=noopener.",
              "hotlineHref tel: · emailHref mailto:.",
              "Logo з alt за logoLanguage.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "donateHref — сторінка донату для CTA",
              "socialLinks — 6 мереж з label",
              "Імпортуй Footer з design-system на product pages",
            ]}
            dont={[
              "Не дублюйте розмітку footer вручну",
              "Не хардкодьте nav — передай navColumn* або defaults",
              "Не звичайний Logo — inverse на dark card",
            ]}
            alternatives={[{ label: "Menu", path: "menu", note: "header nav" }]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Logo", path: "logo" },
              { label: "Button", path: "button" },
              { label: "Menu", path: "menu" },
            ]}
            usedWith={[{ label: "Sub Page Hero", path: "sub-page-hero" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
