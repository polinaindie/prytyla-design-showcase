import { useMemo } from "react";
import { ShowcaseGrid } from "../primitives/ShowcaseGrid";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
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

const SIZE_SAMPLE = "Допомога фронту і тилу";

function fontSizeStep(token: string): number {
  return Number(token.replace("--pryt-brand-font-size-", ""));
}

function usesDisplayFont(token: string): boolean {
  return fontSizeStep(token) >= 600;
}

type FontSizeRowProps = {
  token: string;
  value: string;
};

function FontSizeRow({ token, value }: FontSizeRowProps) {
  const display = usesDisplayFont(token);

  return (
    <div className={styles.sizeRow}>
      <p className={styles.sizeMeta}>
        {token} / {value}
      </p>
      <p
        className={`${styles.sizeSample} ${display ? styles.sizeSampleDisplay : styles.sizeSampleBody}`}
        style={{ fontSize: value }}
      >
        {SIZE_SAMPLE}
      </p>
    </div>
  );
}

export function TypographyPage() {
  const candidates = useMemo(() => FONT_SIZE_CANDIDATES, []);
  const { values, resolved: fontSizes } = useResolvedTokens(candidates);

  const sortedSizes = useMemo(
    () => [...fontSizes].sort((a, b) => fontSizeStep(a) - fontSizeStep(b)),
    [fontSizes],
  );

  return (
    <ShowcasePageLayout
      title="Typography"
      description="Шрифти і шкала розмірів. --font-display резолвиться у Mariupol Strong для заголовків."
    >
      <ShowcaseSection title="Font families">
        <div className={styles.familyBlock}>
          <div>
            <p className={`${styles.familySample} ${styles.familyDisplay}`}>
              Подаруй спокій тим, хто захищає
            </p>
            <p className={styles.familyMeta}>
              Mariupol Strong — var(--font-display)
            </p>
          </div>

          <ShowcaseGrid columns={1}>
            <div>
              <p
                className={`${styles.familySample} ${styles.familyMariupol}`}
                style={{ fontWeight: 400 }}
              >
                Підтримка військових — Regular
              </p>
              <p className={styles.familyMeta}>Mariupol — font-weight 400</p>
            </div>
            <div>
              <p
                className={`${styles.familySample} ${styles.familyMariupol}`}
                style={{ fontWeight: 500 }}
              >
                Підтримка військових — Medium
              </p>
              <p className={styles.familyMeta}>Mariupol — font-weight 500</p>
            </div>
            <div>
              <p
                className={`${styles.familySample} ${styles.familyMariupol}`}
                style={{ fontWeight: 700 }}
              >
                Підтримка військових — Bold
              </p>
              <p className={styles.familyMeta}>Mariupol — font-weight 700</p>
            </div>
          </ShowcaseGrid>

          <div>
            <p className={`${styles.familySample} ${styles.familyInter}`}>
              Body text uses Inter as fallback
            </p>
            <p className={styles.familyMeta}>Inter — Google Fonts CDN</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Font sizes"
        description="Шкала --pryt-brand-font-size-* (лише токени, що є у tokens.css). 600+ — --font-display; до 500 — Mariupol."
      >
        <div className={styles.sizeList}>
          {sortedSizes.map((token) => (
            <FontSizeRow key={token} token={token} value={values[token]!} />
          ))}
        </div>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
