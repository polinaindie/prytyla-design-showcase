import { IconFigmaSvg } from "./IconFigmaSvg";
import { FIGMA_SVG_DOCUMENT_VIEW } from "./iconFigmaSources";
import type { IconProps } from "./Icon.types";

/** Figma `Icon/24/Document_view` — node `1261:29096` */
export function IconDocumentView(props: IconProps) {
  return (
    <IconFigmaSvg
      figmaSvg={FIGMA_SVG_DOCUMENT_VIEW}
      idPrefix="icon-document-view"
      {...props}
    />
  );
}
