import { ShowcaseGrid } from "../primitives/ShowcaseGrid";
import styles from "./ColorsPage.module.css";

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

function tokenVarRef(token: string): string {
  return `var(${token})`;
}

type ColorSwatchProps = {
  token: string;
  value: string;
  onCopy: (token: string) => void;
};

export function ColorSwatch({ token, value, onCopy }: ColorSwatchProps) {
  const light = isLightColor(value);

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
      className={styles.swatchCard}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <div
        className={`${styles.swatch} ${light ? styles.swatchLight : ""}`}
        style={{ backgroundColor: value }}
        aria-hidden
      />
      <span className={styles.tokenName}>{token}</span>
      <span className={styles.tokenValue}>{value}</span>
    </button>
  );
}

type ColorSwatchSectionProps = {
  tokens: readonly string[];
  values: Record<string, string>;
  columns?: 1 | 2 | 3 | 4;
  onCopy: (token: string) => void;
};

export function ColorSwatchGrid({
  tokens,
  values,
  columns = 4,
  onCopy,
}: ColorSwatchSectionProps) {
  const resolved = tokens.filter((token) => (values[token] ?? "").length > 0);

  if (resolved.length === 0) {
    return null;
  }

  return (
    <ShowcaseGrid columns={columns}>
      {resolved.map((token) => (
        <ColorSwatch
          key={token}
          token={token}
          value={values[token]!}
          onCopy={onCopy}
        />
      ))}
    </ShowcaseGrid>
  );
}
