/**
 * Resolve a file from `web/public/` for the current Vite `base`
 * (e.g. `/prytyla-design-showcase/` on GitHub Pages).
 */
export function publicAssetUrl(path: string): string {
  const clean = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;

  if (!base || base === "/") {
    return `/${clean}`;
  }

  return `${base}${clean}`;
}
