import { PartnerLogo, type PartnerLogoVariant } from "../../design-system/PartnerLogo";
import { PARTNER_LOGO_ASSETS } from "../../design-system/PartnerLogo";
import {
  ShowcaseDocPage,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcasePreview,
  ShowcaseThemeProvider,
  useShowcaseTheme,
} from "../primitives";
import styles from "./PartnerLogoShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7114";

const VARIANTS = Object.keys(PARTNER_LOGO_ASSETS) as PartnerLogoVariant[];

const LIGHT_VARIANTS = VARIANTS.filter(
  (v) => v !== "fest-white" && v !== "easypay-white",
);

const DARK_VARIANTS: PartnerLogoVariant[] = [
  "fest-white",
  "easypay-white",
  "sich",
  "kran-resurs",
  "zavertailo",
];

function PartnerLogoGallery({ variants }: { variants: PartnerLogoVariant[] }) {
  return (
    <div className={styles.grid}>
      {variants.map((variant) => {
        const asset = PARTNER_LOGO_ASSETS[variant];
        return (
          <div key={variant} className={styles.label}>
            <PartnerLogo variant={variant} />
            <p className={styles.variantName}>{variant}</p>
            <p className={styles.assetPath}>{asset.src}</p>
            {asset.overlaySrc ? (
              <p className={styles.assetPath}>{asset.overlaySrc}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PartnerLogoShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Partner Logo"
        description="Довідник PNG-логотипів партнерів з /brand/partner-logos/ — для наглядності при верстці карток і блоків Partners."
        updatedAt="2026-06-03"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          description="16 файлів з Figma Logo Partners. У продукті — через компонент PartnerLogo (слот Partner Card)."
        >
          <p className={styles.galleryCaption}>На світлому фоні</p>
          <ShowcasePreview className={styles.preview}>
            <PartnerLogoGallery variants={LIGHT_VARIANTS} />
          </ShowcasePreview>

          <p className={styles.galleryCaption}>На темному фоні</p>
          <ShowcasePreview className={styles.previewDark}>
            <PartnerLogoGallery variants={DARK_VARIANTS} />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Partner Card", path: "partner-card" },
              { label: "Partners", path: "partners" },
              { label: "Memorandum Partner Card", path: "memorandum-partner-card" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function PartnerLogoShowcase() {
  return (
    <ShowcaseThemeProvider>
      <PartnerLogoShowcasePage />
    </ShowcaseThemeProvider>
  );
}
