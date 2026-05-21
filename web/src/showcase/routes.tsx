import type { ComponentType } from "react";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { IconsShowcase } from "./components/IconsShowcase";
import { Illustration3DShowcase } from "./components/Illustration3DShowcase";
import { DropdownItemShowcase } from "./components/DropdownItemShowcase";
import { CurrencySelectShowcase } from "./components/CurrencySelectShowcase";
import { SortControlShowcase } from "./components/SortControlShowcase";
import { TabsShowcase } from "./components/TabsShowcase";
import { LinkCardShowcase } from "./components/LinkCardShowcase";
import { MenuShowcase } from "./components/MenuShowcase";
import { BadgeShowcase } from "./components/BadgeShowcase";
import { FilterChipShowcase } from "./components/FilterChipShowcase";
import { LogoShowcase } from "./components/LogoShowcase";
import { ColorsPage } from "./tokens/ColorsPage";
import { RadiusPage } from "./tokens/RadiusPage";
import { SpacingPage } from "./tokens/SpacingPage";
import { TypographyPage } from "./tokens/TypographyPage";

export type ShowcasePageConfig = {
  id: string;
  label: string;
  /** Path segment relative to /showcase (e.g. "colors" → /showcase/colors) */
  path: string;
  Component: ComponentType;
};

export type ShowcaseSubgroup = {
  id: string;
  label: string;
  pages: ShowcasePageConfig[];
};

export type ShowcaseGroup = {
  id: string;
  label: string;
  /** Nested nav groups (e.g. Foundations → Tokens) */
  groups?: ShowcaseSubgroup[];
  /** Leaf pages directly under this group */
  pages?: ShowcasePageConfig[];
  /** Empty group placeholder (e.g. Components before first component ships) */
  comingSoon?: boolean;
};

export const showcaseRoutes: ShowcaseGroup[] = [
  {
    id: "foundations",
    label: "Foundations",
    groups: [
      {
        id: "tokens",
        label: "Tokens",
        pages: [
          {
            id: "colors",
            label: "Colors",
            path: "colors",
            Component: ColorsPage,
          },
          {
            id: "typography",
            label: "Typography",
            path: "typography",
            Component: TypographyPage,
          },
          {
            id: "spacing",
            label: "Spacing",
            path: "spacing",
            Component: SpacingPage,
          },
          {
            id: "radius",
            label: "Radius",
            path: "radius",
            Component: RadiusPage,
          },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    groups: [
      {
        id: "building-blocks",
        label: "Building blocks",
        pages: [
          {
            id: "button",
            label: "Button",
            path: "button",
            Component: ButtonShowcase,
          },
          {
            id: "icons",
            label: "Icons",
            path: "icons",
            Component: IconsShowcase,
          },
          {
            id: "illustration-3d",
            label: "3D Illustrations",
            path: "illustration-3d",
            Component: Illustration3DShowcase,
          },
          {
            id: "logo",
            label: "Logo",
            path: "logo",
            Component: LogoShowcase,
          },
          {
            id: "filter-chip",
            label: "Filter Chip",
            path: "filter-chip",
            Component: FilterChipShowcase,
          },
          {
            id: "badge",
            label: "Badge",
            path: "badge",
            Component: BadgeShowcase,
          },
          {
            id: "dropdown-item",
            label: "Dropdown Item",
            path: "dropdown-item",
            Component: DropdownItemShowcase,
          },
          {
            id: "sort-control",
            label: "Sort Control",
            path: "sort-control",
            Component: SortControlShowcase,
          },
          {
            id: "currency-select",
            label: "Currency Select",
            path: "currency-select",
            Component: CurrencySelectShowcase,
          },
          {
            id: "tabs",
            label: "Tabs",
            path: "tabs",
            Component: TabsShowcase,
          },
          {
            id: "link-card",
            label: "Link Card",
            path: "link-card",
            Component: LinkCardShowcase,
          },
          {
            id: "menu",
            label: "Menu",
            path: "menu",
            Component: MenuShowcase,
          },
        ],
      },
    ],
  },
];

/** Flat list of routable token/component pages for <Routes> registration */
export function getShowcasePages(): ShowcasePageConfig[] {
  const pages: ShowcasePageConfig[] = [];

  for (const group of showcaseRoutes) {
    if (group.pages) {
      pages.push(...group.pages);
    }
    if (group.groups) {
      for (const subgroup of group.groups) {
        pages.push(...subgroup.pages);
      }
    }
  }

  return pages;
}
