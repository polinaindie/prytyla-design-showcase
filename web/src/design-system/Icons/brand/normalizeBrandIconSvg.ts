/**
 * Brand icons: preserve Figma export colors and gradients; uniquify ALL defs ids
 * (paint0…paintN radial/linear gradients, clip paths) — інакше копії іконки на сторінці
 * ділять id, і градієнти, визначені в прихованому (display:none) клоні, не малюються у видимому.
 */
export function normalizeBrandIconSvg(svg: string, idPrefix: string): string {
  return svg
    .trim()
    .replace(
      /paint\d+_(?:radial|linear)_[\w-]+|clip\d+_[\w-]+/g,
      (match) => `${idPrefix}-${match}`,
    );
}
