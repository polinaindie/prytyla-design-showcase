/**
 * Illustration icons: preserve Figma export colors; uniquify clip/mask ids.
 */
export function normalizeIllustrationIconSvg(svg: string, idPrefix: string): string {
  let out = svg.trim();

  out = out.replace(/clip0_[\w-]+/g, (match) => `${idPrefix}-${match}`);
  out = out.replace(/url\(#clip0_[^)]+\)/g, (match) =>
    match.replace(/#clip0_/, `#${idPrefix}-clip0_`),
  );

  out = out.replace(/mask0_[\w-]+/g, (match) => `${idPrefix}-${match}`);
  out = out.replace(/url\(#mask0_[^)]+\)/g, (match) =>
    match.replace(/#mask0_/, `#${idPrefix}-mask0_`),
  );

  return out;
}
