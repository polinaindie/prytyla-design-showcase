import { useState } from "react";
import { LOGO_ASSETS, Logo, type LogoLanguage } from "../../design-system/Logo";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcaseSection,
  ShowcaseThemeProvider,
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

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <ShowcasePreview>
            <div className={styles.liveRow}>
              <Logo language="uk" />
              <Logo language="en" />
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Версії">
          <ShowcaseMatrix
            columns={["Preview", "Мета", "Дія"]}
            rows={LOGO_ASSETS.map((asset) => ({
              rowLabel:
                asset.language === "uk"
                  ? `Українська (${asset.language})`
                  : `English (${asset.language})`,
              cells: [
                <Logo language={asset.language} />,
                <p className={styles.rowMeta}>
                  {asset.figmaLabel} · {asset.src}
                </p>,
                <button type="button" onClick={() => handleCopy(asset.language)}>
                  Copy usage
                </button>,
              ],
            }))}
          />
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
