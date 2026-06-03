import { useMemo, useState } from "react";
import {
  showcaseViewportName,
  showcaseViewportWidth,
  type ShowcaseViewportId,
} from "../ShowcaseViewportContext";
import { SubPageHero } from "../../design-system/SubPageHero";
import type {
  SubPageHeroAction,
  SubPageHeroBackground,
  SubPageHeroLink,
} from "../../design-system/SubPageHero";
import { Tabs } from "../../design-system/Tabs";
import type { TabItem } from "../../design-system/Tabs";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./SubPageHeroShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1634-40752";

const FIGMA_COMPONENT_SET_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=408-3881";

const FIGMA_MOBILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=817-13626";

const FIGMA_ACTIONS_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1162-37652";

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

const DEMO_ACTIONS: SubPageHeroAction[] = [
  {
    label: "Зразок офіційного запиту",
    href: "#sample-request",
    appearance: "secondary",
  },
  {
    label: "Заповнити форму з запитом",
    href: "#request-form",
    appearance: "primary",
  },
];

const DEMO_ACTIONS_COPY = {
  title: "Подача запиту на військову допомогу",
};

const VARIANT_TABS: TabItem[] = [
  { id: "links", label: "Links" },
  { id: "image", label: "Image" },
  { id: "actions", label: "Actions" },
];

const BACKGROUNDS: { id: SubPageHeroBackground; label: string; token: string }[] = [
  { id: "orange", label: "Orange", token: "--accent-secondary" },
  { id: "amber", label: "Amber", token: "--pryt-brand-orange-300" },
  { id: "sky", label: "Sky", token: "--surface-subtle-info" },
  { id: "blue", label: "Blue", token: "--surface-info" },
  { id: "gray", label: "Gray", token: "--bg-badge" },
  { id: "warm", label: "Warm", token: "--accent-highlight" },
];

const LIVE_PREVIEW_CODE = `import { SubPageHero } from "@/design-system/SubPageHero";

<SubPageHero
  variant="actions"
  background="sky"
  title="Подача запиту на військову допомогу"
  illustration="militaryTraining"
  actions={[
    { label: "Зразок офіційного запиту", href: "#sample", appearance: "secondary" },
    { label: "Заповнити форму з запитом", href: "#form", appearance: "primary" },
  ]}
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "variant",
    type: '"links" | "image" | "actions"',
    typeKind: "VARIANT",
    optionsDefault: "required",
    description: "LinkCard ×2, Illustration3D, або CTA-кнопки (1162:37652).",
  },
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "H0 заголовок.",
  },
  {
    property: "description",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Body large; <a> — accent link (817:13626).",
  },
  {
    property: "background",
    type: "SubPageHeroBackground",
    typeKind: "VARIANT",
    optionsDefault: '"orange"',
    description: "6 Figma fills → design tokens.",
  },
  {
    property: "links",
    type: "[SubPageHeroLink, SubPageHeroLink]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Рівно 2 LinkCard — variant=links.",
  },
  {
    property: "illustration",
    type: "Illustration3DVariant",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: '"humanitarianProjects"',
    description: "variant=image або actions.",
  },
  {
    property: "actions",
    type: "SubPageHeroAction[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description:
      "variant=actions — Button primary/secondary (theme dark); omit/[] для лише заголовка й опису.",
  },
  {
    property: "showTitle / showDescription",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "true",
    description: "Приховати H0 або опис.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "bg=orange", property: "background", token: "--accent-secondary" },
  { element: "bg=amber", property: "background", token: "--pryt-brand-orange-300" },
  { element: "bg=sky", property: "background", token: "--surface-subtle-info" },
  { element: "bg=blue", property: "background", token: "--surface-info" },
  { element: "bg=gray", property: "background", token: "--bg-badge" },
  { element: "bg=warm", property: "background", token: "--accent-highlight" },
  { element: "Title", property: "font-size", token: "--font-size-heading-h0" },
  { element: "Description", property: "font-size", token: "--font-size-body-large" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
] as const;

function SubPageHeroShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [variant, setVariant] = useState<"links" | "image" | "actions">("links");
  const [background, setBackground] = useState<SubPageHeroBackground>("amber");

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
        title="Sub-page Hero"
        description="Hero підсторінки: H0 + опис, два LinkCard, 3D-ілюстрація або CTA-кнопки; 6 фонів; responsive через container queries."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description={`Links desktop ${FIGMA_URL.split("node-id=")[1]} · actions ${FIGMA_ACTIONS_URL.split("node-id=")[1]} · set ${FIGMA_COMPONENT_SET_URL.split("node-id=")[1]} · mobile ${FIGMA_MOBILE_URL.split("node-id=")[1]}.`}
        >
          <div className={styles.controls}>
            <Tabs
              items={VARIANT_TABS}
              value={variant}
              onChange={(id) => setVariant(id as "links" | "image" | "actions")}
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
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · variant=${variant} · background=${background} · container breakpoints 768 / 1024.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={setPreviewViewportId}
            flush
          >
            {variant === "links" ? (
              <SubPageHero
                variant="links"
                background={background}
                links={DEMO_LINKS}
                {...DEMO_COPY}
              />
            ) : variant === "image" ? (
              <SubPageHero
                variant="image"
                background={background}
                illustration="humanitarianProjects"
                {...DEMO_COPY}
              />
            ) : (
              <SubPageHero
                variant="actions"
                background={background === "orange" ? "sky" : background}
                illustration="militaryTraining"
                actions={DEMO_ACTIONS}
                {...DEMO_ACTIONS_COPY}
              />
            )}
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="links · image · actions — Figma 1162:37652 для actions + sky."
        >
          <p className={styles.galleryCaption}>variant=links</p>
          <ShowcasePreview flush>
            <SubPageHero
              variant="links"
              background="orange"
              links={DEMO_LINKS}
              {...DEMO_COPY}
            />
          </ShowcasePreview>
          <p className={styles.galleryCaption}>variant=image</p>
          <ShowcasePreview flush>
            <SubPageHero
              variant="image"
              background="orange"
              illustration="humanitarianProjects"
              {...DEMO_COPY}
            />
          </ShowcasePreview>
          <p className={styles.galleryCaption}>variant=actions · title + buttons</p>
          <ShowcasePreview flush>
            <SubPageHero
              variant="actions"
              background="sky"
              illustration="militaryTraining"
              actions={DEMO_ACTIONS}
              {...DEMO_ACTIONS_COPY}
            />
          </ShowcasePreview>
          <p className={styles.galleryCaption}>variant=actions · title + description</p>
          <ShowcasePreview flush>
            <SubPageHero
              variant="actions"
              background="sky"
              illustration="militaryTraining"
              title="Проєкти"
              description={DEMO_DESCRIPTION}
            />
          </ShowcasePreview>
          <p className={styles.galleryCaption}>variant=actions · title + description + buttons</p>
          <ShowcasePreview flush>
            <SubPageHero
              variant="actions"
              background="sky"
              illustration="humanitarianProjects"
              actions={DEMO_ACTIONS}
              {...DEMO_COPY}
            />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            bg=amber — --pryt-brand-orange-300 (brand primitive у CSS модулі;
            TODO alias). LinkCard + Illustration3D — composite, не окремі
            token rows.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "LinkCard hover/active — стилі LinkCard.",
              "Description <a> — accent link underline.",
              "showTitle / showDescription — приховати блоки без unmount variant.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "<section> з <h1> title (H0).",
              "LinkCard — семантичні посилання з title.",
              "actions — <a> CTA з текстом кнопки.",
              "Illustration3D — decorative img alt=\"\".",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Рівно 2 елементи в links",
              "actions — Button primary/secondary theme dark на світлому фоні (sky)",
              "background з SubPageHeroBackground — без raw hex",
              "Container width задає breakpoint, не size prop",
            ]}
            dont={[
              "Не додавайте третю LinkCard без Figma",
              "Не raw стилі для CTA — лише Button tokens",
              "Не size prop — лише container queries",
              "Не raw hex для фону",
            ]}
            alternatives={[
              { label: "Button", path: "button" },
              { label: "Link Card", path: "link-card" },
              { label: "Illustration 3D", path: "illustration-3d" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Button", path: "button" },
              { label: "Link Card", path: "link-card" },
              { label: "Illustration 3D", path: "illustration-3d" },
              { label: "Tabs", path: "tabs" },
            ]}
            usedWith={[
              { label: "Footer", path: "footer" },
              { label: "Directions External Links", path: "directions-external-links" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
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
