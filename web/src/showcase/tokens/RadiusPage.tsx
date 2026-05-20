import { useMemo } from "react";
import { ShowcaseGrid } from "../primitives/ShowcaseGrid";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
import shared from "./tokensShared.module.css";
import styles from "./RadiusPage.module.css";
import { useResolvedTokens } from "./useCssVarValues";

const ALIAS_RADIUS = [
  "--radius-none",
  "--radius-small",
  "--radius-medium",
  "--radius-large",
  "--radius-xlarge",
  "--radius-2xlarge",
  "--radius-round",
] as const;

const ALIAS_BORDER_WIDTH = [
  "--border-width-none",
  "--border-width-small",
  "--border-width-medium",
] as const;

function RadiusTile({ token, value }: { token: string; value: string }) {
  return (
    <figure className={styles.radiusCard}>
      <div className={styles.radiusTile} style={{ borderRadius: value }} />
      <figcaption>
        <p className={shared.tokenName}>{token}</p>
        <p className={shared.tokenValue}>{value}</p>
      </figcaption>
    </figure>
  );
}

function RadiusGrid({
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
    <ShowcaseGrid columns={4}>
      {resolved.map((token) => (
        <RadiusTile key={token} token={token} value={values[token]!} />
      ))}
    </ShowcaseGrid>
  );
}

function BorderWidthRow({ token, value }: { token: string; value: string }) {
  return (
    <div className={styles.borderWidthRow}>
      <div className={styles.borderWidthLine} style={{ height: value }} />
      <p className={shared.tokenName}>{token}</p>
      <p className={shared.tokenValue}>{value}</p>
    </div>
  );
}

export function RadiusPage() {
  const candidates = useMemo(
    () => [...ALIAS_RADIUS, ...ALIAS_BORDER_WIDTH],
    [],
  );
  const { values } = useResolvedTokens(candidates);

  const resolvedBorderWidths = ALIAS_BORDER_WIDTH.filter(
    (token) => (values[token] ?? "").length > 0,
  );

  return (
    <ShowcasePageLayout
      title="Radius"
      description="Заокруглення та товщина рамок."
    >
      <ShowcaseSection title="Border radius">
        <RadiusGrid tokens={ALIAS_RADIUS} values={values} />
      </ShowcaseSection>

      <ShowcaseSection title="Border width">
        <div className={styles.borderWidthList}>
          {resolvedBorderWidths.map((token) => (
            <BorderWidthRow
              key={token}
              token={token}
              value={values[token]!}
            />
          ))}
        </div>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
