import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokenTable,
  useShowcaseTheme,
} from "../primitives";
import styles from "./RadiusPage.module.css";
import { useResolvedTokens } from "./useCssVarValues";

const ALIAS_RADIUS = [
  "--radius-small",
  "--radius-medium",
  "--radius-large",
  "--radius-xlarge",
  "--radius-2xlarge",
  "--radius-round",
] as const;

const ALIAS_BORDER_WIDTH = [
  "--border-width-small",
  "--border-width-medium",
] as const;

const QUICK_EXAMPLE = `.card {
  border-radius: var(--radius-medium);
  border: var(--border-width-small) solid var(--border-default);
}

.pillButton {
  border-radius: var(--radius-round);
}`;

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function sizePx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
}

function sortByValueDesc(
  tokens: readonly string[],
  values: Record<string, string>,
): string[] {
  return [...tokens]
    .filter((token) => (values[token] ?? "").length > 0)
    .sort((a, b) => sizePx(values[b]!) - sizePx(values[a]!));
}

function RadiusPreview({ value }: { value: string }) {
  return <div className={styles.radiusTile} style={{ borderRadius: value }} />;
}

function BorderWidthPreview({ value }: { value: string }) {
  return (
    <div className={styles.borderWidthTrack}>
      <div className={styles.borderWidthLine} style={{ height: value }} />
    </div>
  );
}

function buildTokenRows(
  tokens: readonly string[],
  values: Record<string, string>,
  onCopy: (token: string) => void,
  renderPreview: (value: string) => ReactNode,
) {
  return sortByValueDesc(tokens, values).map((token) => ({
    token,
    value: values[token]!,
    preview: renderPreview(values[token]!),
    onCopy: () => {
      void navigator.clipboard.writeText(tokenVarRef(token)).then(
        () => onCopy(token),
        () => undefined,
      );
    },
  }));
}

function RadiusPageContent() {
  const { theme } = useShowcaseTheme();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(
    () => [...ALIAS_RADIUS, ...ALIAS_BORDER_WIDTH],
    [],
  );
  const { values } = useResolvedTokens(candidates);

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  const radiusRows = useMemo(
    () => buildTokenRows(ALIAS_RADIUS, values, handleCopy, (value) => <RadiusPreview value={value} />),
    [values],
  );

  const borderWidthRows = useMemo(
    () =>
      buildTokenRows(ALIAS_BORDER_WIDTH, values, handleCopy, (value) => (
        <BorderWidthPreview value={value} />
      )),
    [values],
  );

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Radius"
        description="Заокруглення та товщина рамок Prytula DS. У компонентах — лише --radius-* і --border-width-*."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Картка з --radius-medium і pill-кнопка з --radius-round."
        >
          <ShowcasePreview>
            <div className={styles.previewCard}>
              <p className={styles.previewTitle}>Картка</p>
              <span className={styles.previewPill}>Дія</span>
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Border radius"
          description="Від найбільшого до найменшого. Клік по токену — копіює var(--token)."
        >
          <ShowcaseTokenTable rows={radiusRows} />
        </ShowcaseSection>

        <ShowcaseSection
          title="Border width"
          description="Товщина лінії. Клік по токену — копіює var(--token)."
        >
          <ShowcaseTokenTable rows={borderWidthRows} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "--radius-medium для карток",
              "--radius-round для pill-кнопок",
            ]}
            dont={[
              "НЕ задавай border-radius у px напряму",
              "НЕ змішуй довільні px для border-width — лише --border-width-*",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function RadiusPage() {
  return (
    <ShowcaseThemeProvider>
      <RadiusPageContent />
    </ShowcaseThemeProvider>
  );
}
