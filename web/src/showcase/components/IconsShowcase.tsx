import type { ComponentType } from "react";
import {
  IconArrowDown20,
  IconArrowLeft,
  IconArrowLeft10,
  IconArrowLeft40,
  IconArrowLeftDouble10,
  IconArrowRight10,
  IconArrowRightDouble10,
  IconArrowUpRight,
  IconArrowUpRight10,
  IconArrowUpRight32,
  IconArrowUpRight40,
  IconArrowUpRight64,
  IconCalendar,
  IconChevronDown,
  IconChevronDown10,
  IconClose,
  IconClose20,
  IconEmail20,
  IconGlobe20,
  IconPhone20,
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

type LargeIconEntry = IconEntry & {
  /** Native render size in showcase (matches Figma artboard). */
  nativeSize: number;
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

const ICONS_TINY: IconEntry[] = [
  {
    name: "Chevron-Down",
    figmaPath: "Icon/10/Chevron-Down",
    nodeId: "3:7824",
    Component: IconChevronDown10,
  },
  {
    name: "Arrow-Left",
    figmaPath: "Icon/10/Arrow-Left",
    nodeId: "1319:35979",
    Component: IconArrowLeft10,
  },
  {
    name: "Arrow-Right",
    figmaPath: "Icon/10/Arrow-Right",
    nodeId: "1319:35980",
    Component: IconArrowRight10,
  },
  {
    name: "Arrow-Left-Double",
    figmaPath: "Icon/10/Arrow-Left-Double",
    nodeId: "1319:36158",
    Component: IconArrowLeftDouble10,
  },
  {
    name: "Arrow-Right-Double",
    figmaPath: "Icon/10/Arrow-Right-Double",
    nodeId: "1319:36159",
    Component: IconArrowRightDouble10,
  },
  {
    name: "Arrow-Up-Right",
    figmaPath: "Icon/10/Arrow-Up-Right",
    nodeId: "817:15808",
    Component: IconArrowUpRight10,
  },
];

const ICONS_LARGE: LargeIconEntry[] = [
  {
    name: "Arrow-Up-Right 32",
    figmaPath: "Icon/32/Arrow-Up-Right",
    nodeId: "1163:26966",
    Component: IconArrowUpRight32,
    nativeSize: 32,
  },
  {
    name: "Arrow-Left 40",
    figmaPath: "Icon/40/Arrow-Left",
    nodeId: "307:3917",
    Component: IconArrowLeft40,
    nativeSize: 40,
  },
  {
    name: "Arrow-Up-Right 40",
    figmaPath: "Icon/40/Arrow-Up-Right",
    nodeId: "307:3959",
    Component: IconArrowUpRight40,
    nativeSize: 40,
  },
  {
    name: "Arrow-Up-Right 64",
    figmaPath: "Icon/64/Arrow-Up-Right",
    nodeId: "103:6345",
    Component: IconArrowUpRight64,
    nativeSize: 64,
  },
];

const ICONS_SMALL: IconEntry[] = [
  { name: "Globe", figmaPath: "Icon/20/Globe", nodeId: "3:7945", Component: IconGlobe20 },
  { name: "Phone", figmaPath: "Icon/20/Phone", nodeId: "5:8742", Component: IconPhone20 },
  { name: "Email", figmaPath: "Icon/20/Email", nodeId: "5:8743", Component: IconEmail20 },
  {
    name: "Arrow Down",
    figmaPath: "Icon/20/Arrow Down",
    nodeId: "1261:29064",
    Component: IconArrowDown20,
  },
  { name: "Close", figmaPath: "Icon/20/Close", nodeId: "1318:53976", Component: IconClose20 },
];

function IconGridLarge({ icons }: { icons: LargeIconEntry[] }) {
  return (
    <div className={styles.gridLarge}>
      {icons.map(({ name, figmaPath, nodeId, Component, nativeSize }) => (
        <div key={`${nodeId}-${name}`} className={styles.cell}>
          <div
            className={styles.cellIconNative}
            style={{ width: nativeSize, height: nativeSize }}
          >
            <Component size={nativeSize} />
          </div>
          <span className={styles.meta}>{`${nativeSize}×${nativeSize}px`}</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.meta}>{figmaPath}</span>
          <span className={styles.meta}>{nodeId}</span>
        </div>
      ))}
    </div>
  );
}

function IconGrid({
  icons,
  iconSize = 24,
  tiny = false,
}: {
  icons: IconEntry[];
  iconSize?: number;
  tiny?: boolean;
}) {
  return (
    <div className={styles.grid}>
      {icons.map(({ name, figmaPath, nodeId, Component }) => (
        <div key={name} className={styles.cell}>
          {tiny ? (
            <>
              <div className={styles.cellIconTiny}>
                <Component size={iconSize} />
              </div>
              <span className={styles.meta}>native 10px</span>
              <div className={styles.cellIconTinyScaled}>
                <Component size={iconSize} />
              </div>
              <span className={styles.meta}>preview ×2.4</span>
            </>
          ) : (
            <div className={styles.cellIcon}>
              <Component size={iconSize} />
            </div>
          )}
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
      description="Icon/24 + Large/32–64 + Small/20 + Tiny/10 з Figma SVG export. Колір через currentColor."
    >
      <ShowcaseSection
        title="UI icons (24px)"
        description="Експорт з Prytula-Responsive → iconFigmaSources.ts. Порівняй з Figma Icons frame (3:7823)."
      >
        <IconGrid icons={ICONS_MVP} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Large (32, 40, 64px)"
        description="Icon/32–64 з Figma. Сітка показує нативний розмір (не зменшено до 24px)."
      >
        <IconGridLarge icons={ICONS_LARGE} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Small (20px)"
        description="Icon/20 з Figma (3:7945 …). viewBox 0 0 20 20, default size 20."
      >
        <IconGrid icons={ICONS_SMALL} iconSize={20} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Tiny (10px)"
        description="Icon/10 з Figma (3:7824 …). viewBox 0 0 10 10, default size 10 (--size-2xsmall)."
      >
        <IconGrid icons={ICONS_TINY} iconSize={10} tiny />
      </ShowcaseSection>

      <ShowcaseSection
        title="On dark surface"
        description="Той самий набір на --surface-primary — перевір контраст inverse."
      >
        <div className={styles.onDark}>
          <IconGrid icons={ICONS_MVP} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Small on dark surface"
        description="Icon/20 на --surface-primary."
      >
        <div className={styles.onDark}>
          <IconGrid icons={ICONS_SMALL} iconSize={20} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tiny on dark surface"
        description="Icon/10 на --surface-primary."
      >
        <div className={styles.onDark}>
          <IconGrid icons={ICONS_TINY} iconSize={10} tiny />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Source">
        <ul className={styles.tokenList}>
          <li>
            {`Export 24px: node.exportAsync({ format: 'SVG_STRING' })`}
          </li>
          <li>
            {`Export 10px / 20px: node.exportAsync({ format: 'SVG' })`}
          </li>
          <li>Package: Icons/ + Icons/large/ + Icons/small/ + Icons/tiny/</li>
          <li>Color: #1F1F1F, #001E61 → currentColor (Token approximation rule)</li>
          <li>
            Size default: 24 (UI) / 32–64 (Large, native in showcase) / 20 (Small) /
            10 (Tiny)
          </li>
        </ul>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
