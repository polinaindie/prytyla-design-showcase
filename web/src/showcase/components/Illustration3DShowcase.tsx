import { useEffect, useMemo, useState } from "react";
import {
  ILLUSTRATION_3D_ASSETS,
  Illustration3D,
  type Illustration3DVariant,
} from "../../design-system/Illustration3D";
import { IconSearch } from "../../design-system/Icons";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./Illustration3DShowcase.module.css";

const QUICK_EXAMPLE = `import { Illustration3D } from '@/design-system/Illustration3D';

<Illustration3D variant="drone" alt="FPV дрон" />`;

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Layout",
    name: "116×116 / 156×156 artboards",
    usedIn: "Фіксовані rem-розміри в Illustration3D.module.css (layout chrome)",
  },
  {
    category: "Surface",
    name: "--surface-default",
    usedIn: "Фон preview-клітинок у showcase",
  },
];

const LIVE_VARIANTS: Illustration3DVariant[] = [
  "humanitarianProjects",
  "drone",
  "annualReports",
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
  const [query, setQuery] = useState("");
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

      <ShowcasePageLayout
        title="3D Illustrations"
        description="Білі 3D-ілюстрації з Figma `3d images` (node 293:3871). Варіант = тема картки / напрямку."
      >
        <ShowcaseToolbar
          showSearch
          searchPlaceholder="Пошук варіанту…"
          searchValue={query}
          onSearch={setQuery}
          searchIcon={<IconSearch size={24} aria-hidden />}
        />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Три типові варіанти: humanitarian (small), drone (large), annual reports."
        >
          <div className={styles.livePreview}>
            {LIVE_VARIANTS.map((variant) => (
              <Illustration3D key={variant} variant={variant} />
            ))}
          </div>
        </ShowcaseSection>

        {searchActive ? (
          <p className={styles.searchCount} aria-live="polite">
            Знайдено {filtered.length} ілюстрацій
          </p>
        ) : null}

        <ShowcaseSection
          title="Variants"
          description="17 варіантів Property 1 · клік — копіює import + JSX. Large / Small artboard з Figma."
        >
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
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй для тематичних тайлів (проєкти, напрямки, звіти)",
              "Передавай змістовний alt, якщо ілюстрація несе сенс (не лише декор)",
              "Обирай variant за Figma Property 1 — розмір підставиться автоматично",
            ]}
            dont={[
              "НЕ масштабуй через CSS transform — є окремі artboard 116 / 156",
              "НЕ фарбуй і не накладай фільтри — assets монохромні з Figma",
              "НЕ підміняй іншим PNG — оновлюй через export з node 293:3871",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
