import { useEffect, useMemo, useState } from "react";
import type { TokenUsage } from "./showcase.types";
import styles from "./ShowcaseTokensList.module.css";

type ShowcaseTokensListProps = {
  tokens: TokenUsage[];
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function groupTokens(tokens: TokenUsage[]): Map<string, TokenUsage[]> {
  const map = new Map<string, TokenUsage[]>();
  for (const token of tokens) {
    const key = token.category ?? "Інше";
    const list = map.get(key) ?? [];
    list.push(token);
    map.set(key, list);
  }
  return map;
}

export function ShowcaseTokensList({ tokens }: ShowcaseTokensListProps) {
  const grouped = useMemo(() => groupTokens(tokens), [tokens]);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedName) return undefined;
    const timer = window.setTimeout(() => setCopiedName(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedName]);

  const handleCopy = async (name: string) => {
    const ok = await copyText(name);
    if (ok) setCopiedName(name);
  };

  return (
    <div className={styles.list}>
      {copiedName ? (
        <p className={styles.feedback} aria-live="polite">
          Copied {copiedName}
        </p>
      ) : null}
      {[...grouped.entries()].map(([category, items]) => (
        <section key={category} className={styles.category}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          <div className={styles.items}>
            {items.map((token) => (
              <button
                key={`${category}-${token.name}`}
                type="button"
                className={styles.item}
                onClick={() => handleCopy(token.name)}
                title={`Копіювати ${token.name}`}
              >
                <span className={styles.token}>{token.name}</span>
                <span className={styles.value}>{token.value ?? "—"}</span>
                <span className={styles.usedIn}>{token.usedIn}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
