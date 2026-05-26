import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  semanticFontSizeMeta,
  typographyBreakpoints,
} from "../../../../design-tokens/dist/tokens";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseGrid,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokenTable,
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

const QUICK_EXAMPLE = `/* Prefer semantic tokens (responsive) */
.pageTitle {
  font-family: var(--font-display);
  font-size: var(--font-size-heading-h1);
  color: var(--text-default);
}

.body {
  font-size: var(--font-size-body-medium);
  color: var(--text-muted);
}`;

const SIZE_SAMPLE = "Допомога фронту і тилу";

function fontSizeStep(token: string): number {
  return Number(token.replace("--pryt-brand-font-size-", ""));
}

function usesDisplayFont(token: string): boolean {
  if (token.startsWith("--font-size-heading-") || token === "--font-size-tab-label") {
    return true;
  }
  if (token.startsWith("--font-size-numbers-")) {
    return true;
  }
  return fontSizeStep(token) >= 600;
}

function useTypographyBreakpoint(): "Mobile" | "Tablet" | "Desktop" {
  const [breakpoint, setBreakpoint] = useState<"Mobile" | "Tablet" | "Desktop">(
    "Mobile",
  );

  useEffect(() => {
    const mqTablet = window.matchMedia(
      `(min-width: ${typographyBreakpoints.tabletMin})`,
    );
    const mqDesktop = window.matchMedia(
      `(min-width: ${typographyBreakpoints.desktopMin})`,
    );
    const update = () => {
      if (mqDesktop.matches) setBreakpoint("Desktop");
      else if (mqTablet.matches) setBreakpoint("Tablet");
      else setBreakpoint("Mobile");
    };
    update();
    mqTablet.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);
    return () => {
      mqTablet.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}

function semanticUsesDisplay(figmaName: string): boolean {
  return (
    figmaName.startsWith("font-size/heading-") ||
    figmaName === "font-size/tab-label" ||
    figmaName.startsWith("font-size/numbers-")
  );
}

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function TypeSample({
  fontSize,
  display,
}: {
  fontSize: string;
  display: boolean;
}) {
  return (
    <p
      className={`${styles.sizeSample} ${display ? styles.sizeSampleDisplay : styles.sizeSampleBody}`}
      style={{ fontSize }}
    >
      {SIZE_SAMPLE}
    </p>
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
    try {
      await navigator.clipboard.writeText(tokenVarRef(token));
      onCopy(token);
    } catch {
      /* ignore */
    }
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
  const activeBreakpoint = useTypographyBreakpoint();

  const semanticCandidates = useMemo(
    () => semanticFontSizeMeta.map((row) => row.cssVar),
    [],
  );
  const { values: semanticValues } = useResolvedTokens(semanticCandidates);

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

  const semanticRows = useMemo(
    () =>
      semanticFontSizeMeta.map((row) => {
        const computed = semanticValues[row.cssVar] ?? "—";
        const valueLabel = row.responsive
          ? `${row.mobile}px · ${row.tablet}px · ${row.desktop}px (${activeBreakpoint}: ${computed})`
          : `${row.mobile}px (${computed})`;

        return {
          token: row.cssVar,
          value: valueLabel,
          preview: (
            <TypeSample
              fontSize={computed}
              display={semanticUsesDisplay(row.figma)}
            />
          ),
          onCopy: () => {
            void navigator.clipboard.writeText(tokenVarRef(row.cssVar)).then(
              () => handleCopy(row.cssVar),
              () => undefined,
            );
          },
          copyTitle: `${row.figma} → ${row.cssVar}`,
        };
      }),
    [semanticValues, activeBreakpoint],
  );

  const brandRows = useMemo(
    () =>
      sortedSizes.map((token) => ({
        token,
        value: values[token]!,
        preview: (
          <TypeSample fontSize={values[token]!} display={usesDisplayFont(token)} />
        ),
        onCopy: () => {
          void navigator.clipboard.writeText(tokenVarRef(token)).then(
            () => handleCopy(token),
            () => undefined,
          );
        },
      })),
    [sortedSizes, values],
  );

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Typography"
        description="Шрифти Prytula DS. Семантичні --font-size-* (Figma Semantic, responsive). Примітиви --pryt-brand-font-size-* — legacy шкала."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Заголовок і body на токенах; тема сторінки керує кольором тексту."
        >
          <ShowcasePreview>
            <h2 className={styles.previewHeading}>Подаруй спокій тим, хто захищає</h2>
            <p className={styles.previewCaption}>
              Breakpoint: {activeBreakpoint} ({typographyBreakpoints.tabletMin} /{" "}
              {typographyBreakpoints.desktopMin})
            </p>
            <p className={styles.previewBody}>
              Підтримка військових і цивільних — через прозорі проєкти фонду.
            </p>
          </ShowcasePreview>
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
          title="Semantic font sizes (responsive)"
          description={`Figma Semantic · Mobile &lt; ${typographyBreakpoints.tabletMin} · Tablet · Desktop ${typographyBreakpoints.desktopMin}+. Клік — копіює var(--token).`}
        >
          <p className={styles.breakpointHint}>
            Активний режим: <strong>{activeBreakpoint}</strong> — змініть ширину вікна.
          </p>
          <ShowcaseTokenTable rows={semanticRows} />
        </ShowcaseSection>

        <ShowcaseSection
          title="Brand font sizes (primitives)"
          description="Legacy шкала --pryt-brand-font-size-* (Figma Primitives / старий Brand). Для нових екранів — semantic токени вище."
        >
          <ShowcaseTokenTable rows={brandRows} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --font-size-heading-h* / --font-size-body-* для UI тексту",
              "Використовуй --font-display для display-заголовків",
              "Довіряй responsive — не дублюй @media з іншими px без потреби",
            ]}
            dont={[
              "НЕ задавай font-size у px напряму",
              "НЕ підбирай --pryt-brand-font-size-* для нових компонентів, якщо є semantic",
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
