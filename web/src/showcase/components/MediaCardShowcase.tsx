import { useMemo, useState } from "react";
import { MediaCard } from "../../design-system/MediaCard";
import type { MediaCardSize } from "../../design-system/MediaCard";
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
  figmaComponentSizeBinaryForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import styles from "./MediaCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=292-6431";

const LOGO = publicAssetUrl("/showcase/media-times-logo.png");

const DEMO_TITLE =
  "“Ukraine Needs Armored Vehicles. This Ukrainian Charity Bought Dozens.”";

const LIVE_PREVIEW_CODE = `import { MediaCard } from "@/design-system/MediaCard";

<MediaCard
  href="https://www.thetimes.com/"
  logoSrc="${publicAssetUrl("/showcase/media-times-logo.png")}"
  logoAlt="The Times"
  title="…"
  size="desktop"
/>`;

const DEMO = {
  href: "https://www.thetimes.com/",
  logoSrc: LOGO,
  logoAlt: "The Times",
  title: DEMO_TITLE,
} as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "URL згадки в ЗМІ.",
  },
  {
    property: "logoSrc",
    type: "string",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "required",
    description: "Логотип видання.",
  },
  {
    property: "logoAlt",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Alt логотипу (compact — aria-hidden).",
  },
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Цитата / заголовок (expanded state).",
  },
  {
    property: "size",
    type: '"desktop" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Desktop hover/active · mobile OnClick.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-section-dark" },
  {
    element: "Hover",
    property: "background",
    token: "--surface-card-dark-elevated",
  },
  { element: "Root", property: "border", token: "--border-dark" },
  { element: "Hover", property: "border", token: "--border-muted" },
  { element: "Title", property: "color", token: "--text-on-inverse" },
  { element: "Desktop title", property: "font-size", token: "--pryt-brand-font-size-600" },
  { element: "Mobile title", property: "font-size", token: "--font-size-body-small" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function MediaCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewSize: MediaCardSize = figmaComponentSizeBinaryForViewportWidth(
    previewWidth,
  );

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
        title="Media Card"
        description="Картка згадки в ЗМІ на темному фоні: default — логотип; hover/active — цитата + стрілка."
        status="stable"
        version="1.0"
        updatedAt="2026-06-03"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — Wide desktop … Mobile; Figma size desktop|mobile підбирається автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${previewSize} · hover — наведи; mobile — :active на touch.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            <div className={styles.livePreviewSlot}>
              <MediaCard {...DEMO} size={previewSize} />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Desktop padding 25px — між --space-2xlarge і brand scale; TODO spacing
            token.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Desktop: hover — flip зліва направо (rotateY), зворот — цитата + IconArrowUpRight32.",
              "Touch: :active замість :hover; prefers-reduced-motion — без анімації.",
              "Mobile back: expanded на звороті; стрілка 10px.",
              "Без state props — лише CSS 3D flip.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<a href> з title або aria-label.",
              "Focus-visible: --border-focus.",
              "Логотип у compact — aria-hidden якщо title достатній.",
              "Зовнішні URL: target=_blank rel=noopener.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Темний контейнер --surface-section-dark",
              "logoSrc + title для expanded",
              "target=_blank для зовнішніх статей",
            ]}
            dont={[
              "Не на світлій сітці без темного wrapper",
              "Не текст замість logoSrc",
              "Не state prop для hover",
            ]}
            alternatives={[
              { label: "News Card", path: "news-card", note: "світла картка новини" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "News Card", path: "news-card" }]}
            usedWith={[{ label: "Partners", path: "partners" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
