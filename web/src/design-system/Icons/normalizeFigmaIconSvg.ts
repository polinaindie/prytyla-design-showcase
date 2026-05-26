/** Map Figma export fills/strokes (#1F1F1F) to themeable currentColor. */
export function normalizeFigmaIconSvg(svg: string, idPrefix: string): string {
  let out = svg.trim();

  out = out.replace(/fill="#1F1F1F"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#757575"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#FFA400"/gi, 'fill="currentColor"');
  out = out.replace(/fill="#001E61"/gi, 'fill="currentColor"');
  out = out.replace(/stroke="#1F1F1F"/gi, 'stroke="currentColor"');
  out = out.replace(/stroke="#001E61"/gi, 'stroke="currentColor"');
  out = out.replace(/stroke="black"/gi, 'stroke="currentColor"');
  out = out.replace(/fill="white"/gi, 'fill="currentColor"');
  out = out.replace(/fill="black"/gi, 'fill="currentColor"');
  out = out.replace(/fill="var\(--fill-0,\s*black\)"/gi, 'fill="currentColor"');

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
  width = 24,
  height?: number,
): string {
  const resolvedHeight = height ?? width;
  return svg.replace(/<svg([^>]*)>/, (_match, attrs: string) => {
    const withoutSize = attrs
      .replace(/\s*width="[^"]*"/, "")
      .replace(/\s*height="[^"]*"/, "");
    const cls = className ? ` class="${className}"` : "";
    return `<svg${withoutSize} width="${width}" height="${resolvedHeight}"${cls}>`;
  });
}
