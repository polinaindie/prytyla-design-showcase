import type { ReactNode } from "react";
import { ShowcaseSection } from "./ShowcaseSection";
import {
  SHOWCASE_DOC_SECTION_TITLE,
  type ShowcaseDocSectionId,
} from "./showcaseDoc";

type ShowcaseDocSectionProps = {
  section: ShowcaseDocSectionId;
  title?: string;
  description?: string;
  children: ReactNode;
};

/** Section wrapper with canonical id + default title from the docs template. */
export function ShowcaseDocSection({
  section,
  title,
  description,
  children,
}: ShowcaseDocSectionProps) {
  return (
    <ShowcaseSection
      id={section}
      title={title ?? SHOWCASE_DOC_SECTION_TITLE[section]}
      description={description}
    >
      {children}
    </ShowcaseSection>
  );
}
