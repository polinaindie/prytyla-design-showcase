/**
 * Social brand icons: single-color silhouettes from Figma (#001E61).
 * Maps to currentColor; keeps mask fill="white" intact (luminance masks).
 */
export function normalizeSocialIconSvg(svg: string, idPrefix: string): string {
  let out = svg.trim();

  out = out.replace(/fill="#1F1F1F"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#001E61"/gi, 'fill="currentColor"');
  out = out.replace(/stroke="#1F1F1F"/gi, 'stroke="currentColor"');
  out = out.replace(/stroke="#001E61"/gi, 'stroke="currentColor"');

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
