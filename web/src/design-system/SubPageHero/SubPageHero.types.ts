import type { HTMLAttributes, ReactNode } from "react";
import type { Illustration3DVariant } from "../Illustration3D/Illustration3D.types";

/** Figma SubPageHero fills — mapped to design tokens (no raw hex in CSS). */
export type SubPageHeroBackground =
  | "orange"
  | "amber"
  | "sky"
  | "blue"
  | "gray"
  | "warm";

export type SubPageHeroLink = {
  title: string;
  href: string;
  illustration: Illustration3DVariant;
};

type SubPageHeroBaseProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  title: string;
  description?: ReactNode;
  showTitle?: boolean;
  showDescription?: boolean;
  /** @default "orange" — FFA400 */
  background?: SubPageHeroBackground;
};

export type SubPageHeroLinksProps = SubPageHeroBaseProps & {
  variant: "links";
  links: [SubPageHeroLink, SubPageHeroLink];
};

export type SubPageHeroImageProps = SubPageHeroBaseProps & {
  variant: "image";
  /** @default "humanitarianProjects" */
  illustration?: Illustration3DVariant;
};

export type SubPageHeroActionAppearance = "primary" | "secondary";

export type SubPageHeroAction = {
  label: string;
  href: string;
  appearance: SubPageHeroActionAppearance;
};

export type SubPageHeroActionsProps = SubPageHeroBaseProps & {
  variant: "actions";
  /** @default "humanitarianProjects" */
  illustration?: Illustration3DVariant;
  /** CTA row; omit or `[]` for title/description only (Figma 1162:37652). */
  actions?: SubPageHeroAction[];
};

export type SubPageHeroProps =
  | SubPageHeroLinksProps
  | SubPageHeroImageProps
  | SubPageHeroActionsProps;
