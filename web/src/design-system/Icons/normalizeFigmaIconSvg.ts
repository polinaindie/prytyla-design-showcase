/** Map Figma export fills/strokes (#1F1F1F) to themeable currentColor. */
export function normalizeFigmaIconSvg(svg: string, idPrefix: string): string {
  let out = svg.trim();

  out = out.replace(/fill="#1F1F1F"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#001E61"/gi, 'fill="currentColor"');
  out = out.replace(/stroke="#1F1F1F"/gi, 'stroke="currentColor"');
  out = out.replace(/fill="white"/gi, 'fill="currentColor"');

  out = out.replace(/clip0_[\w-]+/g, (match) => `${idPrefix}-${match}`);
  out = out.replace(/url\(#clip0_[^)]+\)/g, (match) =>
    match.replace(/#clip0_/, `#${idPrefix}-clip0_`),
  );

  return out;
}

/** Inject className and size on root <svg> for dangerouslySetInnerHTML wrapper. */
export function applyIconSvgAttrs(
  svg: string,
  className?: string,
  size = 24,
): string {
  return svg.replace(/<svg([^>]*)>/, (_match, attrs: string) => {
    const withoutSize = attrs
      .replace(/\s*width="[^"]*"/, "")
      .replace(/\s*height="[^"]*"/, "");
    const cls = className ? ` class="${className}"` : "";
    return `<svg${withoutSize} width="${size}" height="${size}"${cls}>`;
  });
}
