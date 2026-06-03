import type { ReactNode } from "react";
import swatchStyles from "./ColorSwatch.module.css";

const GRID_TRACKS = 4;

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

function tokenMatchesSearch(token: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return token.toLowerCase().includes(q);
}

type ColorSwatchProps = {
  token: string;
  value: string;
  copied?: boolean;
  size?: "default" | "large";
  onCopy: (token: string) => void;
};

export function ColorSwatch({
  token,
  value,
  copied = false,
  size = "default",
  onCopy,
}: ColorSwatchProps) {
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
      className={[
        swatchStyles.card,
        size === "large" ? swatchStyles.cardFeatured : "",
        copied ? swatchStyles.cardCopied : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      title={`Копіювати ${tokenVarRef(token)}`}
    >
      <div className={swatchStyles.swatchWrap}>
        <div
          className={[
            swatchStyles.swatch,
            light ? swatchStyles.swatchLight : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ backgroundColor: value }}
          aria-hidden
        />
      </div>
      <span className={swatchStyles.meta}>
        <span className={swatchStyles.tokenName}>{token}</span>
        <span className={swatchStyles.tokenValue}>{value}</span>
      </span>
    </button>
  );
}

export type ColorSwatchPair = readonly [string, string];

type ColorSwatchGridProps = {
  tokens: readonly string[];
  values: Record<string, string>;
  /** Скільки колонок заповнюємо в рядку (4-та доріжка лишається порожньою при 3) */
  columns?: 2 | 3 | 4;
  /** Пари: кол. 1 і кол. 4, кол. 2–3 порожні */
  pairs?: readonly ColorSwatchPair[];
  query?: string;
  copiedToken?: string | null;
  onCopy: (token: string) => void;
};

function GridCell({
  column,
  children,
}: {
  column: number;
  children: ReactNode;
}) {
  return (
    <div className={swatchStyles.gridCell} style={{ gridColumn: column }}>
      {children}
    </div>
  );
}

function GridPad({ column }: { column: number }) {
  return (
    <div
      className={swatchStyles.gridPad}
      style={{ gridColumn: column }}
      aria-hidden
    />
  );
}

export function ColorSwatchGrid({
  tokens,
  values,
  columns = 4,
  pairs,
  query = "",
  copiedToken = null,
  onCopy,
}: ColorSwatchGridProps) {
  const activeColumns = Math.min(columns, GRID_TRACKS);

  const resolved = tokens.filter(
    (token) =>
      (values[token] ?? "").length > 0 && tokenMatchesSearch(token, query),
  );

  const nodes: ReactNode[] = [];

  const pushSwatch = (token: string, column: number) => {
    nodes.push(
      <GridCell key={token} column={column}>
        <ColorSwatch
          token={token}
          value={values[token]!}
          copied={copiedToken === token}
          size="default"
          onCopy={onCopy}
        />
      </GridCell>,
    );
  };

  for (const [left, right] of pairs ?? []) {
    const leftOk =
      (values[left] ?? "").length > 0 && tokenMatchesSearch(left, query);
    const rightOk =
      (values[right] ?? "").length > 0 && tokenMatchesSearch(right, query);
    if (!leftOk && !rightOk) continue;

    const rowKey = `${left}-${right}`;
    if (leftOk) pushSwatch(left, 1);
    else nodes.push(<GridPad key={`${rowKey}-p1`} column={1} />);

    nodes.push(<GridPad key={`${rowKey}-p2`} column={2} />);
    nodes.push(<GridPad key={`${rowKey}-p3`} column={3} />);

    if (rightOk) pushSwatch(right, 4);
    else nodes.push(<GridPad key={`${rowKey}-p4`} column={4} />);
  }

  let col = 1;
  for (const token of resolved) {
    pushSwatch(token, col);
    col += 1;
    if (col > activeColumns) {
      if (activeColumns === 3) {
        nodes.push(<GridPad key={`pad-after-${token}`} column={4} />);
      }
      col = 1;
    }
  }

  if (activeColumns === 3 && col !== 1) {
    nodes.push(<GridPad key="pad-tail" column={4} />);
  }

  if (nodes.length === 0) {
    return null;
  }

  return (
    <div className={swatchStyles.gridTracks} role="list">
      {nodes}
    </div>
  );
}
