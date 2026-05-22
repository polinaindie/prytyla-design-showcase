import type { ComponentType } from "react";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { IconsShowcase } from "./components/IconsShowcase";
import { Illustration3DShowcase } from "./components/Illustration3DShowcase";
import { DropdownItemShowcase } from "./components/DropdownItemShowcase";
import { CurrencySelectShowcase } from "./components/CurrencySelectShowcase";
import { SortControlShowcase } from "./components/SortControlShowcase";
import { TabsShowcase } from "./components/TabsShowcase";
import { AccordionShowcase } from "./components/AccordionShowcase";
import { PaymentInfoShowcase } from "./components/PaymentInfoShowcase";
import { ChipPaymentTypeShowcase } from "./components/ChipPaymentTypeShowcase";
import { QuickAmountShowcase } from "./components/QuickAmountShowcase";
import { DirectionsExternalLinksShowcase } from "./components/DirectionsExternalLinksShowcase";
import { LinkCardShowcase } from "./components/LinkCardShowcase";
import { VacancyCardShowcase } from "./components/VacancyCardShowcase";
import { SubPageHeroShowcase } from "./components/SubPageHeroShowcase";
import { MenuShowcase } from "./components/MenuShowcase";
import { BadgeShowcase } from "./components/BadgeShowcase";
import { ProgressBarShowcase } from "./components/ProgressBarShowcase";
import { TagShowcase } from "./components/TagShowcase";
import { FilterChipShowcase } from "./components/FilterChipShowcase";
import { LogoShowcase } from "./components/LogoShowcase";
import { ColorsPage } from "./tokens/ColorsPage";
import { RadiusPage } from "./tokens/RadiusPage";
import { SpacingPage } from "./tokens/SpacingPage";
import { TypographyPage } from "./tokens/TypographyPage";
import { GridPage } from "./foundations/GridPage";

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
  /** Empty subgroup placeholder */
  comingSoon?: boolean;
};

export type ShowcaseGroup = {
  id: string;
  label: string;
  /** Nested nav groups (e.g. Foundations → Tokens) */
  groups?: ShowcaseSubgroup[];
  /** Leaf pages directly under this group */
  pages?: ShowcasePageConfig[];
  /** Empty group placeholder */
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
      {
        id: "layout",
        label: "Layout",
        pages: [
          {
            id: "grid",
            label: "Grid",
            path: "grid",
            Component: GridPage,
          },
        ],
      },
      {
        id: "iconography",
        label: "Iconography",
        pages: [
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
        label: "Building Blocks",
        pages: [
          {
            id: "badge",
            label: "Badge",
            path: "badge",
            Component: BadgeShowcase,
          },
          {
            id: "button",
            label: "Button",
            path: "button",
            Component: ButtonShowcase,
          },
          {
            id: "chip-payment-type",
            label: "Chip Payment Type",
            path: "chip-payment-type",
            Component: ChipPaymentTypeShowcase,
          },
          {
            id: "currency-select",
            label: "Currency Select",
            path: "currency-select",
            Component: CurrencySelectShowcase,
          },
          {
            id: "dropdown-item",
            label: "Dropdown Item",
            path: "dropdown-item",
            Component: DropdownItemShowcase,
          },
          {
            id: "filter-chip",
            label: "Filter Chip",
            path: "filter-chip",
            Component: FilterChipShowcase,
          },
          {
            id: "logo",
            label: "Logo",
            path: "logo",
            Component: LogoShowcase,
          },
          {
            id: "progress-bar",
            label: "Progress Bar",
            path: "progress-bar",
            Component: ProgressBarShowcase,
          },
          {
            id: "quick-amount",
            label: "Quick Amount",
            path: "quick-amount",
            Component: QuickAmountShowcase,
          },
          {
            id: "sort-control",
            label: "Sort Control",
            path: "sort-control",
            Component: SortControlShowcase,
          },
          {
            id: "tag",
            label: "Tag",
            path: "tag",
            Component: TagShowcase,
          },
        ],
      },
      {
        id: "components",
        label: "Components",
        pages: [
          {
            id: "accordion",
            label: "Accordion",
            path: "accordion",
            Component: AccordionShowcase,
          },
          {
            id: "directions-external-links",
            label: "Directions External Links",
            path: "directions-external-links",
            Component: DirectionsExternalLinksShowcase,
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
          {
            id: "payment-info",
            label: "Payment Info",
            path: "payment-info",
            Component: PaymentInfoShowcase,
          },
          {
            id: "tabs",
            label: "Tabs",
            path: "tabs",
            Component: TabsShowcase,
          },
        ],
      },
      {
        id: "cards",
        label: "Cards",
        pages: [
          {
            id: "vacancy-card",
            label: "Vacancy Card",
            path: "vacancy-card",
            Component: VacancyCardShowcase,
          },
        ],
      },
      {
        id: "composite",
        label: "Composite",
        comingSoon: true,
        pages: [],
      },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    groups: [
      {
        id: "page-sections",
        label: "Page Sections",
        pages: [
          {
            id: "sub-page-hero",
            label: "Sub-page Hero",
            path: "sub-page-hero",
            Component: SubPageHeroShowcase,
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
