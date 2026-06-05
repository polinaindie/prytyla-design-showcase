import { useMemo, useState } from "react";
import { Breadcrumbs } from "../../design-system/Breadcrumbs";
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
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./BreadcrumbsShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=997-20030";

const DEMO_ITEMS = [
  { label: "Головна", href: "/" },
  { label: "Новини", href: "/news" },
  {
    label:
      "Фонд Сергія Притули представив звіт про ефективні підходи до знеболення поранених",
  },
] as const;

const LIVE_PREVIEW_CODE = `import { Breadcrumbs } from "@/design-system/Breadcrumbs";

<Breadcrumbs
  items={[
    { label: "Головна", href: "/" },
    { label: "Новини", href: "/news" },
    { label: "…поточна сторінка" },
  ]}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "items",
    type: "BreadcrumbItem[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description:
      "{ label, href? } — предки з href; останній без href (aria-current=page).",
  },
  {
    property: "ariaLabel",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Навігаційний шлях"',
    description: "Ім'я landmark для `<nav>`.",
  },
  {
    property: "className",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Додатковий клас на `<nav>`.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Link", property: "color", token: "--text-secondary" },
  { element: "Link (hover)", property: "color", token: "--text-default" },
  { element: "Current", property: "color", token: "--text-default" },
  { element: "Text", property: "font-size", token: "--font-size-body-small" },
  { element: "List", property: "gap", token: "--spacing-gap-tight" },
  { element: "Separator", property: "color", token: "--icon-muted" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function BreadcrumbsShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);

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
        title="Breadcrumbs"
        description="Навігаційний шлях над контентом сторінки: предки — посилання, поточна — текст."
        status="stable"
        version="1.0"
        updatedAt="2026-06-04"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — Wide desktop … Mobile; компонент fluid на 100% ширини контейнера."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · 3 items · Figma 997:20030.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
          >
            <div className={styles.previewSlot}>
              <Breadcrumbs items={[...DEMO_ITEMS]} />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "`<nav aria-label>` + `<ol>` — landmark і порядок кроків.",
              "Останній пункт: `aria-current=\"page\"`, без посилання; при ширині треку <768px — ellipsis + `title` з повним текстом.",
              "Сепаратор — декоративна іконка з `aria-hidden`.",
              "Focus-visible на посиланнях предків.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Один рівень на крок — короткі label для розділів",
              "Останній item — заголовок поточної сторінки (без href)",
              "href на всіх предках для keyboard/screen reader",
            ]}
            dont={[
              "Не роби поточну сторінку посиланням",
              "Не замінюй сепаратор текстом «/» — лише Figma Breadcrumb Arrow",
              "Не дублюй Tooltip categoryPath — інший UI pattern (Badge)",
            ]}
            alternatives={[
              {
                label: "SubPage Hero",
                path: "subpage-hero",
                note: "hero з заголовком, не trail",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Badge", path: "badge" }]}
            usedWith={[
              { label: "SubPage Hero", path: "subpage-hero" },
              { label: "News Card", path: "news-card" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function BreadcrumbsShowcase() {
  return (
    <ShowcaseThemeProvider>
      <BreadcrumbsShowcasePage />
    </ShowcaseThemeProvider>
  );
}
