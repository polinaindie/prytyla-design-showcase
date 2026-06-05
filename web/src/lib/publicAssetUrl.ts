/**
 * Resolve a file from `web/public/` for the current Vite `base`
 * (e.g. `/prytyla-design-showcase/` on GitHub Pages).
 */
export function publicAssetUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/.test(path)) return path;

  const base = import.meta.env.BASE_URL;
  if (base && base !== "/" && path.startsWith(base)) return path;

  const clean = path.replace(/^\//, "");
  if (!base || base === "/") return `/${clean}`;
  return `${base}${clean}`;
}
