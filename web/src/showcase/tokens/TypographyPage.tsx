import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseGrid,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseToolbar,
  useShowcaseTheme,
} from "../primitives";
import styles from "./TypographyPage.module.css";
import { useResolvedTokens } from "./useCssVarValues";

const FONT_SIZE_CANDIDATES = [
  "--pryt-brand-font-size-100",
  "--pryt-brand-font-size-200",
  "--pryt-brand-font-size-250",
  "--pryt-brand-font-size-300",
  "--pryt-brand-font-size-400",
  "--pryt-brand-font-size-450",
  "--pryt-brand-font-size-500",
  "--pryt-brand-font-size-600",
  "--pryt-brand-font-size-700",
  "--pryt-brand-font-size-800",
  "--pryt-brand-font-size-900",
  "--pryt-brand-font-size-1000",
  "--pryt-brand-font-size-1100",
  "--pryt-brand-font-size-1200",
] as const;

const QUICK_EXAMPLE = `.heading {
  font-family: var(--font-display);
  font-size: var(--pryt-brand-font-size-900);
  color: var(--text-default);
}

.body {
  font-size: var(--pryt-brand-font-size-400);
  color: var(--text-muted);
}`;

const SIZE_SAMPLE = "Допомога фронту і тилу";

function fontSizeStep(token: string): number {
  return Number(token.replace("--pryt-brand-font-size-", ""));
}

function usesDisplayFont(token: string): boolean {
  return fontSizeStep(token) >= 600;
}

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

async function copyTokenRef(token: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(tokenVarRef(token));
    return true;
  } catch {
    return false;
  }
}

type FontSizeRowProps = {
  token: string;
  value: string;
  onCopy: (token: string) => void;
};

function FontSizeRow({ token, value, onCopy }: FontSizeRowProps) {
  const display = usesDisplayFont(token);

  const handleClick = async () => {
    const ok = await copyTokenRef(token);
    if (ok) onCopy(token);
  };

  return (
    <button
      type="button"
      className={styles.sizeRow}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <p className={styles.sizeMeta}>
        {token} / {value}
      </p>
      <p
        className={`${styles.sizeSample} ${display ? styles.sizeSampleDisplay : styles.sizeSampleBody}`}
        style={{ fontSize: value }}
      >
        {SIZE_SAMPLE}
      </p>
    </button>
  );
}

type FamilyCopyProps = {
  token: string;
  label: string;
  onCopy: (token: string) => void;
  children: ReactNode;
};

function FamilyCopyBlock({ token, label, onCopy, children }: FamilyCopyProps) {
  const handleCopyMeta = async () => {
    const ok = await copyTokenRef(token);
    if (ok) onCopy(token);
  };

  return (
    <div className={styles.familyItem}>
      {children}
      <button
        type="button"
        className={styles.familyMetaButton}
        onClick={handleCopyMeta}
        title={`Копіювати ${tokenVarRef(token)}`}
      >
        {label}
      </button>
    </div>
  );
}

function TypographyPageContent() {
  const { theme } = useShowcaseTheme();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(() => FONT_SIZE_CANDIDATES, []);
  const { values, resolved: fontSizes } = useResolvedTokens(candidates);

  const sortedSizes = useMemo(
    () => [...fontSizes].sort((a, b) => fontSizeStep(b) - fontSizeStep(a)),
    [fontSizes],
  );

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Typography"
        description="Шрифти і шкала розмірів Prytula DS. --font-display — Mariupol Strong для заголовків; body — Mariupol / Inter."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Заголовок і body на токенах; тема сторінки керує кольором тексту."
        >
          <div className={styles.livePreview}>
            <h2 className={styles.previewHeading}>Подаруй спокій тим, хто захищає</h2>
            <p className={styles.previewBody}>
              Підтримка військових і цивільних — через прозорі проєкти фонду.
            </p>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Font families">
          <div className={styles.familyBlock}>
            <FamilyCopyBlock
              token="--font-display"
              label="Mariupol Strong — var(--font-display)"
              onCopy={handleCopy}
            >
              <p className={`${styles.familySample} ${styles.familyDisplay}`}>
                Подаруй спокій тим, хто захищає
              </p>
            </FamilyCopyBlock>

            <ShowcaseGrid columns={1}>
              <div className={styles.familyItem}>
                <p
                  className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightRegular}`}
                >
                  Підтримка військових — Regular
                </p>
                <p className={styles.familyMeta}>Mariupol — font-weight 400</p>
              </div>
              <div className={styles.familyItem}>
                <p
                  className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightMedium}`}
                >
                  Підтримка військових — Medium
                </p>
                <p className={styles.familyMeta}>Mariupol — font-weight 500</p>
              </div>
              <div className={styles.familyItem}>
                <p
                  className={`${styles.familySample} ${styles.familyMariupol} ${styles.weightBold}`}
                >
                  Підтримка військових — Bold
                </p>
                <p className={styles.familyMeta}>Mariupol — font-weight 700</p>
              </div>
            </ShowcaseGrid>

            <div className={styles.familyItem}>
              <p className={`${styles.familySample} ${styles.familyInter}`}>
                Body text uses Inter as fallback
              </p>
              <p className={styles.familyMeta}>Inter — Google Fonts CDN</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Font sizes"
          description="Шкала --pryt-brand-font-size-* від найбільшого до найменшого. 600+ — --font-display; до 500 — Mariupol. Клік — копіює var(--token)."
        >
          <div className={styles.sizeList}>
            {sortedSizes.map((token) => (
              <FontSizeRow
                key={token}
                token={token}
                value={values[token]!}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --font-display для заголовків H1–H4",
              "Бери шкалу --pryt-brand-font-size-* через CSS змінні",
            ]}
            dont={[
              "НЕ задавай font-size у px напряму",
              "НЕ змішуй Mariupol з Inter у одному заголовку",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function TypographyPage() {
  return (
    <ShowcaseThemeProvider>
      <TypographyPageContent />
    </ShowcaseThemeProvider>
  );
}
