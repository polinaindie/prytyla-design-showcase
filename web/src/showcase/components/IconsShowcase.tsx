import type { ComponentType } from "react";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconCalendar,
  IconChevronDown,
  IconClose,
  IconDocumentView,
  IconDropdown,
  IconError,
  IconFilter,
  IconMenu,
  IconMoreHorizontal,
  IconSearch,
  type IconProps,
} from "../../design-system/Icons";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
import styles from "./IconsShowcase.module.css";

type IconEntry = {
  name: string;
  figmaPath: string;
  nodeId: string;
  Component: ComponentType<IconProps>;
};

const ICONS_MVP: IconEntry[] = [
  { name: "Menu", figmaPath: "Icon/24/Menu", nodeId: "1115:23555", Component: IconMenu },
  { name: "Search", figmaPath: "Icon/24/Search", nodeId: "1185:31237", Component: IconSearch },
  { name: "Filter", figmaPath: "Icon/24/Filter", nodeId: "1305:32931", Component: IconFilter },
  { name: "Close", figmaPath: "Icon/24/Close", nodeId: "3:8004", Component: IconClose },
  {
    name: "Calendar",
    figmaPath: "Icon/24/Calendar",
    nodeId: "1185:31219",
    Component: IconCalendar,
  },
  {
    name: "Dropdown",
    figmaPath: "Icon/24/Dropdown",
    nodeId: "1185:31193",
    Component: IconDropdown,
  },
  {
    name: "More-Horizontal",
    figmaPath: "Icon/24/More-Horizontal",
    nodeId: "3:7776",
    Component: IconMoreHorizontal,
  },
  {
    name: "Chevron-Down",
    figmaPath: "Icon/24/Chevron-Down",
    nodeId: "1026:24646",
    Component: IconChevronDown,
  },
  {
    name: "Arrow-Left",
    figmaPath: "Icon/24/Arrow-Left",
    nodeId: "5:8884",
    Component: IconArrowLeft,
  },
  {
    name: "Arrow-Up-Right",
    figmaPath: "Icon/24/Arrow-Up-Right",
    nodeId: "5:8891",
    Component: IconArrowUpRight,
  },
  { name: "Error", figmaPath: "Icon/24/Error", nodeId: "1256:29906", Component: IconError },
  {
    name: "Document_view",
    figmaPath: "Icon/24/Document_view",
    nodeId: "1261:29096",
    Component: IconDocumentView,
  },
];

function IconGrid({ icons, iconSize = 24 }: { icons: IconEntry[]; iconSize?: number }) {
  return (
    <div className={styles.grid}>
      {icons.map(({ name, figmaPath, nodeId, Component }) => (
        <div key={name} className={styles.cell}>
          <div className={styles.cellIcon}>
            <Component size={iconSize} />
          </div>
          <span className={styles.name}>{name}</span>
          <span className={styles.meta}>{figmaPath}</span>
          <span className={styles.meta}>{nodeId}</span>
        </div>
      ))}
    </div>
  );
}

export function IconsShowcase() {
  return (
    <ShowcasePageLayout
      title="Icons"
      description="MVP UI pack — 12× Icon/24 з Figma (exportAsync SVG_STRING). Колір через currentColor."
    >
      <ShowcaseSection
        title="UI icons (24px)"
        description="Експорт з Prytula-Responsive → iconFigmaSources.ts. Порівняй з Figma Icons frame (3:7823)."
      >
        <IconGrid icons={ICONS_MVP} />
      </ShowcaseSection>

      <ShowcaseSection
        title="On dark surface"
        description="Той самий набір на --surface-primary — перевір контраст inverse."
      >
        <div className={styles.onDark}>
          <IconGrid icons={ICONS_MVP} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Source">
        <ul className={styles.tokenList}>
          <li>
            {`Export: Figma Plugin API node.exportAsync({ format: 'SVG_STRING' })`}
          </li>
          <li>Package: web/src/design-system/Icons/</li>
          <li>Color: #1F1F1F → currentColor at render (Token approximation rule)</li>
          <li>Size default: 24px (--size-large width/height via IconProps.size)</li>
        </ul>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
