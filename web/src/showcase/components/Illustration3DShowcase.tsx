import { useEffect, useMemo, useState } from "react";
import {
  ILLUSTRATION_3D_ASSETS,
  Illustration3D,
  type Illustration3DVariant,
} from "../../design-system/Illustration3D";
import {
  ShowcaseDocBulletList,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseTablesRow,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseSearch,
  useShowcaseTheme,
} from "../primitives";
import styles from "./Illustration3DShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=293-3871";

const LIVE_VARIANTS: Illustration3DVariant[] = [
  "humanitarianProjects",
  "drone",
  "annualReports",
];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "variant",
    type: "Illustration3DVariant",
    typeKind: "VARIANT",
    optionsDefault: "required",
    description: "17 Figma Property 1 — розмір small/large з assets.",
  },
  {
    property: "alt",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "figmaLabel",
    description: "Alt текст; за замовч. — Figma label.",
  },
  {
    property: "aria-hidden",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "true якщо декоративна поруч із видимим title.",
  },
  {
    property: "className",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Wrapper only — не масштабуй img через CSS.",
  },
];

const TOKEN_USAGE_ROWS = [
  {
    element: "Small artboard",
    property: "width × height",
    token: "7.25rem × 7.25rem",
    value: "116×116px (Figma) — no size token",
  },
  {
    element: "Large artboard",
    property: "width × height",
    token: "9.75rem × 9.75rem",
    value: "156×156px (Figma) — no size token",
  },
  {
    element: "Showcase cell",
    property: "background",
    token: "--surface-default",
    value: "preview chrome only",
  },
];

async function copyUsage(variant: Illustration3DVariant): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(
      `import { Illustration3D } from '@/design-system/Illustration3D';\n\n<Illustration3D variant="${variant}" />`,
    );
    return true;
  } catch {
    return false;
  }
}

function Illustration3DShowcasePage() {
  const { theme } = useShowcaseTheme();
  const { query } = useShowcaseSearch();
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedVariant) return undefined;
    const timer = window.setTimeout(() => setCopiedVariant(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedVariant]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ILLUSTRATION_3D_ASSETS.filter((entry) => {
      if (!q) return true;
      return (
        entry.variant.toLowerCase().includes(q) ||
        entry.figmaLabel.toLowerCase().includes(q) ||
        entry.figmaNodeId.includes(q)
      );
    });
  }, [query]);

  const searchActive = query.trim().length > 0;

  const handleCopy = async (variant: Illustration3DVariant) => {
    const ok = await copyUsage(variant);
    if (ok) setCopiedVariant(variant);
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedVariant ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcaseDocPage
        title="3D Illustrations"
        description="Білі 3D-ілюстрації з Figma 3d images (293:3871). variant = тема картки / напрямку."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Illustration catalog"
          description="17 варіантів Property 1 · клік — import + JSX. Large / Small artboard з Figma."
        >
          <p className={styles.galleryCaption}>Typical variants (small + large)</p>
          <ShowcasePreview>
            <div className={styles.livePreview}>
              {LIVE_VARIANTS.map((variant) => (
                <Illustration3D key={variant} variant={variant} />
              ))}
            </div>
          </ShowcasePreview>

          {searchActive ? (
            <p className={styles.searchCount} aria-live="polite">
              Знайдено {filtered.length} ілюстрацій
            </p>
          ) : null}

          <div className={styles.grid}>
            {filtered.map((entry) => (
              <button
                key={entry.variant}
                type="button"
                className={styles.cell}
                onClick={() => handleCopy(entry.variant)}
                title={`Figma: ${entry.figmaLabel} · node ${entry.figmaNodeId}`}
              >
                <Illustration3D variant={entry.variant} aria-hidden />
                <div className={styles.cellLabels}>
                  <span className={styles.name}>{entry.figmaLabel}</span>
                  <span className={styles.meta}>
                    {entry.size === "large" ? "Large" : "Small"}
                  </span>
                  <code className={styles.variantCode}>{entry.variant}</code>
                </div>
              </button>
            ))}
          </div>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Illustration3DProps + фіксовані artboard-розміри."
        >
          <ShowcaseTablesRow
            tables={[
              {
                key: "properties",
                caption: "Properties",
                children: <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />,
              },
              {
                key: "token-usage",
                caption: "Token usage",
                children: <ShowcaseDocTokenUsageTable rows={TOKEN_USAGE_ROWS} />,
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "alt за замовчуванням з figmaLabel — достатньо для LinkCard title поруч.",
              "aria-hidden коли title/link text несе зміст (Sub-page Hero, LinkCard).",
              "Декоративна у hero — alt=\"\" + aria-hidden.",
              "Не інтерактивна — pointer-events: none на img.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Тематичні тайли: проєкти, напрямки, звіти",
              "variant за Figma Property 1 — розмір автоматично",
              "Оновлення — export PNG → /public/illustrations/3d/",
            ]}
            dont={[
              "Не scale через CSS transform",
              "Не фільтри / recolor — assets монохромні з Figma",
              "Не підміняй іншим PNG без оновлення assets",
            ]}
            alternatives={[
              { label: "Icons", path: "icons", note: "24–100px UI glyphs" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components" description="Foundation + consumers.">
          <ShowcaseDocRelated
            related={[{ label: "Icons", path: "icons" }]}
            usedWith={[
              { label: "Link Card", path: "link-card" },
              { label: "Sub-page Hero", path: "sub-page-hero" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function Illustration3DShowcase() {
  return (
    <ShowcaseThemeProvider>
      <Illustration3DShowcasePage />
    </ShowcaseThemeProvider>
  );
}
