import { useEffect, useMemo, useState } from "react";
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

type RadiusTileProps = {
  token: string;
  value: string;
  onCopy: (token: string) => void;
};

function RadiusTile({ token, value, onCopy }: RadiusTileProps) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(tokenVarRef(token));
      onCopy(token);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      className={styles.radiusCard}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <div className={styles.radiusTile} style={{ borderRadius: value }} />
      <span className={styles.tokenName}>{token}</span>
      <span className={styles.tokenValue}>{value}</span>
    </button>
  );
}

function RadiusGrid({
  tokens,
  values,
  onCopy,
}: {
  tokens: readonly string[];
  values: Record<string, string>;
  onCopy: (token: string) => void;
}) {
  const sorted = sortByValueDesc(tokens, values);

  if (sorted.length === 0) {
    return null;
  }

  return (
    <ShowcaseGrid columns={4}>
      {sorted.map((token) => (
        <RadiusTile key={token} token={token} value={values[token]!} onCopy={onCopy} />
      ))}
    </ShowcaseGrid>
  );
}

type BorderWidthRowProps = {
  token: string;
  value: string;
  onCopy: (token: string) => void;
};

function BorderWidthRow({ token, value, onCopy }: BorderWidthRowProps) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(tokenVarRef(token));
      onCopy(token);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      className={styles.borderWidthRow}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <div className={styles.borderWidthTrack}>
        <div className={styles.borderWidthLine} style={{ height: value }} />
      </div>
      <div className={styles.borderWidthMeta}>
        <span className={styles.tokenName}>{token}</span>
        <span className={styles.tokenValue}>{value}</span>
      </div>
    </button>
  );
}

function RadiusPageContent() {
  const { theme } = useShowcaseTheme();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(
    () => [...ALIAS_RADIUS, ...ALIAS_BORDER_WIDTH],
    [],
  );
  const { values } = useResolvedTokens(candidates);

  const sortedBorderWidths = useMemo(
    () => sortByValueDesc(ALIAS_BORDER_WIDTH, values),
    [values],
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
        title="Radius"
        description="Заокруглення та товщина рамок Prytula DS. У компонентах — лише --radius-* і --border-width-*."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Картка з --radius-medium і pill-кнопка з --radius-round."
        >
          <div className={styles.livePreview}>
            <div className={styles.previewCard}>
              <p className={styles.previewTitle}>Картка</p>
              <span className={styles.previewPill}>Дія</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Border radius"
          description="Від найбільшого до найменшого. Клік по клітинці — копіює var(--token)."
        >
          <RadiusGrid tokens={ALIAS_RADIUS} values={values} onCopy={handleCopy} />
        </ShowcaseSection>

        <ShowcaseSection
          title="Border width"
          description="Товщина лінії (computed value праворуч). Клік — копіює var(--token)."
        >
          <div className={styles.borderWidthList}>
            {sortedBorderWidths.map((token) => (
              <BorderWidthRow
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
