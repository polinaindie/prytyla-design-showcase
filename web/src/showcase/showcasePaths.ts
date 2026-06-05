/** Home route for the design system docs (e.g. / or /prytyla-design-showcase/ on GitHub Pages). */
export function showcaseHomePath(): string {
  return "/";
}

/** Page route segment (e.g. "colors" → /colors). */
export function showcasePagePath(segment: string): string {
  return `/${segment}`;
}

/**
 * Active page segment from the URL, or null on the home route.
 * Supports legacy /showcase/* paths for bookmarks.
 */
export function getShowcasePathSegment(pathname: string): string | null {
  const legacyMatch = pathname.match(/\/showcase\/([^/]+)\/?$/);
  if (legacyMatch) return legacyMatch[1];

  const normalized = pathname.replace(/\/$/, "");
  if (!normalized || normalized === "/") return null;
  if (normalized.endsWith("/showcase")) return null;

  const segment = normalized.split("/").pop();
  return segment ?? null;
}

export function isShowcaseHomePath(pathname: string): boolean {
  return getShowcasePathSegment(pathname) === null;
}
