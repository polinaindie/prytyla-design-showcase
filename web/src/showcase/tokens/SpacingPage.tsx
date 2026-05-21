import { useEffect, useMemo, useState } from "react";
import { IconSearch } from "../../design-system/Icons";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseToolbar,
  useShowcaseTheme,
} from "../primitives";
import styles from "./SpacingPage.module.css";
import { useResolvedTokens } from "./useCssVarValues";

const ALIAS_SPACE = [
  "--space-none",
  "--space-3xsmall",
  "--space-2xsmall",
  "--space-xsmall",
  "--space-small",
  "--space-medium",
  "--space-large",
  "--space-xlarge",
  "--space-2xlarge",
  "--space-3xlarge",
  "--space-4xlarge",
  "--space-5xlarge",
  "--space-6xlarge",
  "--space-7xlarge",
  "--space-8xlarge",
] as const;

const BRAND_SCALE = [
  "--pryt-brand-scale-0",
  "--pryt-brand-scale-25",
  "--pryt-brand-scale-50",
  "--pryt-brand-scale-100",
  "--pryt-brand-scale-200",
  "--pryt-brand-scale-300",
  "--pryt-brand-scale-400",
  "--pryt-brand-scale-500",
  "--pryt-brand-scale-600",
  "--pryt-brand-scale-700",
  "--pryt-brand-scale-800",
  "--pryt-brand-scale-900",
  "--pryt-brand-scale-1000",
  "--pryt-brand-scale-1200",
  "--pryt-brand-scale-1400",
  "--pryt-brand-scale-1600",
  "--pryt-brand-scale-2000",
  "--pryt-brand-scale-2400",
  "--pryt-brand-scale-3200",
] as const;

const QUICK_EXAMPLE = `.card {
  padding: var(--space-large);
  gap: var(--space-medium);
}

.page {
  padding-inline: var(--space-large);
}

.scrollRegion {
  padding: var(--space-medium) var(--space-large);
}`;

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

function spacingPx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
}

function filterTokens(tokens: readonly string[], query: string): readonly string[] {
  const q = query.trim().toLowerCase();
  if (!q) return tokens;
  return tokens.filter((token) => token.toLowerCase().includes(q));
}

function sortByValueDesc(
  tokens: readonly string[],
  values: Record<string, string>,
): string[] {
  return [...tokens]
    .filter((token) => (values[token] ?? "").length > 0)
    .sort((a, b) => spacingPx(values[b]!) - spacingPx(values[a]!));
}

type SpacingBarProps = {
  token: string;
  value: string;
  onCopy: (token: string) => void;
};

function SpacingBar({ token, value, onCopy }: SpacingBarProps) {
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
      className={styles.barRow}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <div className={styles.barTrack}>
        <div className={styles.bar} style={{ width: value }} />
      </div>
      <div className={styles.barMeta}>
        <span className={styles.tokenName}>{token}</span>
        <span className={styles.tokenValue}>{value}</span>
      </div>
    </button>
  );
}

function SpacingBarList({
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
    <div className={styles.barList}>
      {sorted.map((token) => (
        <SpacingBar key={token} token={token} value={values[token]!} onCopy={onCopy} />
      ))}
    </div>
  );
}

function SpacingPageContent() {
  const { theme } = useShowcaseTheme();
  const [query, setQuery] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const candidates = useMemo(() => [...ALIAS_SPACE, ...BRAND_SCALE], []);
  const { values } = useResolvedTokens(candidates);

  useEffect(() => {
    if (!copiedToken) return undefined;
    const timer = window.setTimeout(() => setCopiedToken(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedToken]);

  const handleCopy = (token: string) => {
    setCopiedToken(token);
  };

  const searchActive = query.trim().length > 0;

  const filteredCount = useMemo(() => {
    const all = [...ALIAS_SPACE, ...BRAND_SCALE];
    if (!searchActive) return all.length;
    const q = query.trim().toLowerCase();
    return all.filter((token) => token.toLowerCase().includes(q)).length;
  }, [query, searchActive]);

  const aliasVisible = filterTokens(ALIAS_SPACE, query);
  const brandVisible = filterTokens(BRAND_SCALE, query);

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedToken ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Spacing"
        description="Відступи Prytula DS. У компонентах — Alias --space-*; Brand scale лише для збірки токенів."
      >
        <ShowcaseToolbar
          showSearch
          searchPlaceholder="Пошук токена…"
          searchValue={query}
          onSearch={setQuery}
          searchIcon={<IconSearch size={24} aria-hidden />}
        />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="css" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Padding картки та сторінки на --space-large / --space-medium."
        >
          <div className={styles.livePreview}>
            <div className={styles.previewPage}>
              <div className={styles.previewCard}>
                <p className={styles.previewTitle}>Картка проєкту</p>
                <p className={styles.previewText}>Внутрішні відступи на spacing-токенах.</p>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {searchActive ? (
          <p className={styles.searchCount} aria-live="polite">
            Знайдено {filteredCount} токенів
          </p>
        ) : null}

        {aliasVisible.length > 0 ? (
          <ShowcaseSection
            id="alias-spacing"
            title="Alias spacing — public API"
            description="Від найбільшого до найменшого. Клік — копіює var(--token); поруч — computed value."
          >
            <SpacingBarList tokens={aliasVisible} values={values} onCopy={handleCopy} />
          </ShowcaseSection>
        ) : null}

        {brandVisible.length > 0 ? (
          <ShowcaseSection
            id="brand-scale"
            title="Brand scale primitives"
            description="Low-level. Клік — копіює var(--token). У компонентах — --space-*."
          >
            <p className={styles.lowLevelNote}>
              Low-level. Не використовуй --pryt-brand-scale-* у компонентах — лише
              --space-*.
            </p>
            <SpacingBarList tokens={brandVisible} values={values} onCopy={handleCopy} />
          </ShowcaseSection>
        ) : null}

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Використовуй --space-* tokens для margin і padding",
              "Для scroll-областей padding узгоджуй з page padding (--space-large)",
            ]}
            dont={[
              "НЕ задавай margin/padding у px",
              "НЕ використовуй --pryt-brand-scale-* напряму",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function SpacingPage() {
  return (
    <ShowcaseThemeProvider>
      <SpacingPageContent />
    </ShowcaseThemeProvider>
  );
}
