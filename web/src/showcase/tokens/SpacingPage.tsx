import { useMemo } from "react";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
import shared from "./tokensShared.module.css";
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

function SpacingBar({
  token,
  value,
}: {
  token: string;
  value: string;
}) {
  return (
    <div className={styles.barRow}>
      <div className={styles.barTrack}>
        <div className={styles.bar} style={{ width: value }} />
      </div>
      <p className={shared.tokenName}>{token}</p>
      <p className={shared.tokenValue}>{value}</p>
    </div>
  );
}

function SpacingBarList({
  tokens,
  values,
}: {
  tokens: readonly string[];
  values: Record<string, string>;
}) {
  const resolved = tokens.filter((token) => (values[token] ?? "").length > 0);

  if (resolved.length === 0) {
    return null;
  }

  return (
    <div className={styles.barList}>
      {resolved.map((token) => (
        <SpacingBar key={token} token={token} value={values[token]!} />
      ))}
    </div>
  );
}

export function SpacingPage() {
  const candidates = useMemo(() => [...ALIAS_SPACE, ...BRAND_SCALE], []);
  const { values } = useResolvedTokens(candidates);

  return (
    <ShowcasePageLayout
      title="Spacing"
      description="Відступи і шкала примітивів. Використовуй Alias spacing у компонентах."
    >
      <ShowcaseSection title="Alias spacing — public API">
        <SpacingBarList tokens={ALIAS_SPACE} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Brand scale primitives">
        <p className={shared.lowLevelNote}>
          ⚠ Low-level. Use --space-* aliases in components instead.
        </p>
        <SpacingBarList tokens={BRAND_SCALE} values={values} />
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
