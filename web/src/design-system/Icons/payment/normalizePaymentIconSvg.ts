/**
 * Payment icons: glyph → currentColor; drop gray tile (#F5F5F5) so tile+glyph
 * do not both inherit the same color (solid black square in showcase).
 * Preserves fill="white" in mask/clip defs only.
 */
export function normalizePaymentIconSvg(
  svg: string,
  idPrefix: string,
  options?: { glyphOnly?: boolean },
): string {
  let out = svg.trim();

  if (options?.glyphOnly) {
    out = out.replace(
      /<path d="M0 10C0 4\.47715[\s\S]*?<\/path>\s*/,
      "",
    );
    // Figma tile: 36×36 with 8px inset → glyph artboard 20×20. Without this crop,
    // size={20} still maps the full 36×36 viewBox and the glyph looks ~11px.
    out = out.replace(/viewBox="0 0 36 36"/, 'viewBox="8 8 20 20"');
  }

  out = out.replace(/fill="#F5F5F5"/gi, 'fill="none"');
  out = out.replace(/fill="#1F1F1F"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#001E61"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#FFA400"/gi, 'fill="currentColor"');
  out = out.replace(/fill="black"/gi, 'fill="currentColor"');
  out = out.replace(/stroke="#1F1F1F"/gi, 'stroke="currentColor"');
  out = out.replace(/stroke="#001E61"/gi, 'stroke="currentColor"');
  out = out.replace(/stroke="black"/gi, 'stroke="currentColor"');

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
