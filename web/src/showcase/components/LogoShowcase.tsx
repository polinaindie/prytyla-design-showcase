import { useState } from "react";
import { LOGO_ASSETS, Logo, type LogoLanguage } from "../../design-system/Logo";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseToolbar,
  useShowcaseTheme,
} from "../primitives";
import styles from "./LogoShowcase.module.css";

const QUICK_EXAMPLE = `import { Logo } from '@/design-system/Logo';

<Logo language="uk" />
<Logo language="en" height={40} />`;

function LogoShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (language: LogoLanguage) => {
    try {
      await navigator.clipboard.writeText(
        `import { Logo } from '@/design-system/Logo';\n\n<Logo language="${language}" />`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Logo"
        description="Повний логотип фонду — українська та англійська версії (SVG з Figma)."
      >
        <ShowcaseToolbar showThemeToggle />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <div className={styles.liveRow}>
            <Logo language="uk" />
            <Logo language="en" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Версії">
          <div className={styles.grid}>
            {LOGO_ASSETS.map((asset) => (
              <article key={asset.language} className={styles.row}>
                <p className={styles.rowLabel}>
                  {asset.language === "uk" ? "Українська" : "English"} (
                  {asset.language})
                </p>
                <p className={styles.rowMeta}>
                  {asset.figmaLabel} · {asset.src}
                </p>
                <div className={styles.preview}>
                  <Logo language={asset.language} />
                </div>
                <button type="button" onClick={() => handleCopy(asset.language)}>
                  Copy usage
                </button>
              </article>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Обирай language за мовою сторінки (uk / en).",
              "Передавай осмислений alt, якщо логотип не веде на головну.",
            ]}
            dont={[
              "Не розтягуй SVG — лише height (width auto).",
              "Не замінюй кольори в SVG; експортуй нову версію з Figma.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
