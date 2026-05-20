import { ShowcaseGrid } from "../primitives/ShowcaseGrid";
import styles from "./ColorsPage.module.css";
import shared from "./tokensShared.module.css";

function isLightColor(value: string): boolean {
  const match = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (!match) {
    return true;
  }
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  return (r + g + b) / 3 >= 220;
}

type ColorSwatchProps = {
  token: string;
  value: string;
};

export function ColorSwatch({ token, value }: ColorSwatchProps) {
  const light = isLightColor(value);

  return (
    <figure className={styles.swatchCard}>
      <div
        className={`${styles.swatch} ${light ? styles.swatchLight : ""}`}
        style={{ backgroundColor: value }}
        aria-hidden
      />
      <figcaption>
        <p className={shared.tokenName}>{token}</p>
        <p className={shared.tokenValue}>{value}</p>
      </figcaption>
    </figure>
  );
}

type ColorSwatchSectionProps = {
  tokens: readonly string[];
  values: Record<string, string>;
  columns?: 1 | 2 | 3 | 4;
};

export function ColorSwatchGrid({
  tokens,
  values,
  columns = 4,
}: ColorSwatchSectionProps) {
  const resolved = tokens.filter((token) => (values[token] ?? "").length > 0);

  if (resolved.length === 0) {
    return null;
  }

  return (
    <ShowcaseGrid columns={columns}>
      {resolved.map((token) => (
        <ColorSwatch key={token} token={token} value={values[token]!} />
      ))}
    </ShowcaseGrid>
  );
}
