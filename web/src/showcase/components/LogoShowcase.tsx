import { LOGO_ASSETS, Logo } from "../../design-system/Logo";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseMatrix,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import styles from "./LogoShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const LIVE_PREVIEW_CODE = `import { Logo } from "@/design-system/Logo";

<Logo language="uk" />`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "language",
    type: '"uk" | "en"',
    typeKind: "VARIANT",
    optionsDefault: "required",
    description: "Мова логотипу; SVG з /brand/logo-{uk,en}.svg.",
  },
  {
    property: "variant",
    type: '"default" | "inverse"',
    typeKind: "VARIANT",
    optionsDefault: '"default"',
    description: "inverse — білий через CSS filter на темній поверхні.",
  },
  {
    property: "height",
    type: "number",
    typeKind: "TEXT",
    optionsDefault: "46",
    description: "Висота в px; ширина — auto (aspect ratio SVG).",
  },
  {
    property: "alt",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "per language",
    description: "Доступна назва; default з logoAssets.",
  },
  {
    property: "aria-hidden",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "true якщо декоративний (alt=\"\").",
  },
];

const TOKEN_USAGE_ROWS = [
  {
    element: "Image",
    property: "height",
    token: "--logo-height (inline)",
    value: "46px default",
  },
  {
    element: "Inverse",
    property: "filter",
    token: "CSS filter",
    value: "brightness/invert — no DS token",
  },
];

function LogoShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Logo"
        description="Повний логотип фонду — українська та англійська версії (SVG з Figma)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Українська версія — типова для uk-сторінок."
        >
          <ShowcaseDocLivePreview
            caption="language=uk · variant=default · height=46."
            code={LIVE_PREVIEW_CODE}
          >
            <Logo language="uk" />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Property: language · variant default|inverse."
        >
          <p className={styles.galleryCaption}>language · variant=default</p>
          <ShowcaseMatrix
            columns={["Preview", "Asset"]}
            rows={LOGO_ASSETS.map((asset) => ({
              rowLabel:
                asset.language === "uk"
                  ? `Українська (${asset.language})`
                  : `English (${asset.language})`,
              cells: [
                <Logo key={asset.language} language={asset.language} />,
                <p key={`meta-${asset.language}`} className={styles.rowMeta}>
                  {asset.figmaLabel} · {asset.src}
                </p>,
              ],
            }))}
          />

          <p className={styles.galleryCaption}>
            variant=inverse · на темній поверхні (footer)
          </p>
          <ShowcasePreview className={styles.onDark}>
            <div className={styles.liveRow}>
              <Logo language="uk" variant="inverse" />
              <Logo language="en" variant="inverse" />
            </div>
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={TOKEN_USAGE_ROWS} />
          <p className={styles.note}>
            Логотип — brand SVG, не color tokens. Висота через prop / CSS
            --logo-height; кольори зашиті в SVG (не перефарбовувати в CSS).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "За замовчуванням — осмислений alt з logoAssets.",
              "Декоративний у header з посиланням на головну — alt на <a>, Logo aria-hidden.",
              "height не змінює aspect ratio — width: auto на img.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "language за мовою сторінки (uk / en)",
              "variant=inverse на --surface-primary / inverse blocks",
              "Один логотип на viewport у header",
            ]}
            dont={[
              "Не розтягуй SVG — лише height",
              "Не замінюй кольори filterом (крім inverse variant)",
              "Не експортуй растр замість SVG без погодження",
            ]}
            alternatives={[
              {
                label: "Partner Logo",
                path: "partner-logo",
                note: "логотипи партнерів",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Partner Logo", path: "partner-logo" }]}
            usedWith={[
              { label: "Menu", path: "menu" },
              { label: "Footer", path: "footer" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function LogoShowcase() {
  return (
    <ShowcaseThemeProvider>
      <LogoShowcasePage />
    </ShowcaseThemeProvider>
  );
}
