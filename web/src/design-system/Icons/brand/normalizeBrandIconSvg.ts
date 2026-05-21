/**
 * Brand icons: preserve Figma export colors and gradients; uniquify defs ids.
 */
export function normalizeBrandIconSvg(svg: string, idPrefix: string): string {
  let out = svg.trim();

  out = out.replace(/paint0_radial_[\w-]+/g, (match) => `${idPrefix}-${match}`);
  out = out.replace(/url\(#paint0_radial_[^)]+\)/g, (match) =>
    match.replace(/#paint0_radial_/, `#${idPrefix}-paint0_radial_`),
  );

  out = out.replace(/clip0_[\w-]+/g, (match) => `${idPrefix}-${match}`);
  out = out.replace(/url\(#clip0_[^)]+\)/g, (match) =>
    match.replace(/#clip0_/, `#${idPrefix}-clip0_`),
  );

  return out;
}
