import { useLayoutEffect, useMemo, useState } from "react";

export function readCssVar(token: string): string {
  if (typeof document === "undefined") {
    return "";
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
}

/** Batch-read resolved CSS custom properties from :root (client-only). */
export function useCssVarValues(tokens: readonly string[]): Record<string, string> {
  const key = useMemo(() => tokens.join("\0"), [tokens]);

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(tokens.map((token) => [token, ""])),
  );

  useLayoutEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const token of tokens) {
      next[token] = style.getPropertyValue(token).trim();
    }
    setValues(next);
  }, [key, tokens]);

  return values;
}

/** Tokens that resolve to a non-empty computed value (skip missing silently). */
export function useResolvedTokens(candidates: readonly string[]) {
  const values = useCssVarValues(candidates);

  const resolved = useMemo(
    () => candidates.filter((token) => (values[token] ?? "").length > 0),
    [candidates, values],
  );

  return { values, resolved };
}
