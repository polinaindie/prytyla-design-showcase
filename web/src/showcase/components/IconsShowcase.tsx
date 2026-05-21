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
  IconSocialFacebook,
  IconSocialInstagram,
  IconSocialLinkedIn,
  IconSocialTelegram,
  IconSocialX,
  IconSocialYouTube,
  IconPaymentBank,
  IconPaymentCard,
  IconPaymentCrypto,
  IconPaymentGlobe,
  IconPaymentHeartEmpty,
  IconPaymentHeartFilled,
  IconPaymentPaypal,
  IconPaymentReceipt,
  IconPaymentRepeat,
  IconPaymentSwift,
  IconIllustrationDataError,
  IconIllustrationNoData,
  IconBrandVprytyl,
  IconBrandMono,
  type IconProps,
  type IconBrandVprytylProps,
  type IconBrandMonoProps,
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

const ICONS_PAYMENT: LargeIconEntry[] = [
  { name: "Card", figmaPath: "Icons/Card", nodeId: "1411:38047", Component: IconPaymentCard, nativeSize: 36 },
  { name: "Paypal", figmaPath: "Icons/Paypal", nodeId: "1411:38051", Component: IconPaymentPaypal, nativeSize: 36 },
  { name: "Crypto", figmaPath: "Icons/Crypto", nodeId: "1411:38054", Component: IconPaymentCrypto, nativeSize: 36 },
  { name: "Swift", figmaPath: "Icons/Swift", nodeId: "1411:38057", Component: IconPaymentSwift, nativeSize: 36 },
  { name: "Bank", figmaPath: "Icons/Bank", nodeId: "1411:38062", Component: IconPaymentBank, nativeSize: 36 },
  {
    name: "HeartEmpty",
    figmaPath: "Icons/HeartEmpty",
    nodeId: "1411:38067",
    Component: IconPaymentHeartEmpty,
    nativeSize: 36,
  },
  {
    name: "HeartFilled",
    figmaPath: "Icons/HeartFilled",
    nodeId: "1411:38070",
    Component: IconPaymentHeartFilled,
    nativeSize: 36,
  },
  { name: "Receipt", figmaPath: "Icons/Receipt", nodeId: "1411:38073", Component: IconPaymentReceipt, nativeSize: 36 },
  { name: "Globe", figmaPath: "Icons/Globe", nodeId: "1411:38091", Component: IconPaymentGlobe, nativeSize: 36 },
  { name: "Repeat", figmaPath: "Icons/Repeat", nodeId: "1411:38080", Component: IconPaymentRepeat, nativeSize: 36 },
];

const ICONS_SOCIAL: IconEntry[] = [
  {
    name: "Facebook",
    figmaPath: "Icon/Social/Facebook",
    nodeId: "3:8051",
    Component: IconSocialFacebook,
  },
  {
    name: "Instagram",
    figmaPath: "Icon/Social/Instagram",
    nodeId: "3:8052",
    Component: IconSocialInstagram,
  },
  {
    name: "Telegram",
    figmaPath: "Icon/Social/Telegram",
    nodeId: "3:8053",
    Component: IconSocialTelegram,
  },
  { name: "X", figmaPath: "Icon/Social/X", nodeId: "3:8054", Component: IconSocialX },
  {
    name: "LinkedIn",
    figmaPath: "Icon/Social/LinkedIn",
    nodeId: "3:8055",
    Component: IconSocialLinkedIn,
  },
  {
    name: "YouTube",
    figmaPath: "Icon/Social/YouTube",
    nodeId: "3:8056",
    Component: IconSocialYouTube,
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

const ICONS_ILLUSTRATION: IconEntry[] = [
  {
    name: "DataError",
    figmaPath: "Icon/100×100/DataError",
    nodeId: "1317:38911",
    Component: IconIllustrationDataError,
  },
  {
    name: "NoData",
    figmaPath: "Icon/100×100/NoData",
    nodeId: "1318:53781",
    Component: IconIllustrationNoData,
  },
];

type BrandIconEntry = {
  name: string;
  figmaPath: string;
  nodeId: string;
  Component: ComponentType<IconBrandVprytylProps | IconBrandMonoProps>;
  width: number;
  height: number;
};

const ICONS_BRAND: BrandIconEntry[] = [
  {
    name: "Vprytyl",
    figmaPath: "Icon/Vprytyl",
    nodeId: "1363:36149",
    Component: IconBrandVprytyl,
    width: 99,
    height: 13,
  },
  {
    name: "Mono",
    figmaPath: "Icon/24/Mono",
    nodeId: "760:2510",
    Component: IconBrandMono,
    width: 58,
    height: 24,
  },
];

function IconGridIllustration({ icons }: { icons: IconEntry[] }) {
  return (
    <div className={styles.gridIllustration}>
      {icons.map(({ name, figmaPath, nodeId, Component }) => (
        <div key={name} className={styles.cell}>
          <div className={styles.cellIconIllustration}>
            <Component size={100} />
          </div>
          <span className={styles.meta}>100×100px</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.meta}>{figmaPath}</span>
          <span className={styles.meta}>{nodeId}</span>
        </div>
      ))}
    </div>
  );
}

function IconGridBrand({ icons }: { icons: BrandIconEntry[] }) {
  return (
    <div className={styles.gridBrand}>
      {icons.map(({ name, figmaPath, nodeId, Component, width, height }) => (
        <div key={name} className={styles.cell}>
          <div className={styles.cellIconBrand}>
            <Component width={width} height={height} />
          </div>
          <span className={styles.meta}>{`${width}×${height}px`}</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.meta}>{figmaPath}</span>
          <span className={styles.meta}>{nodeId}</span>
        </div>
      ))}
    </div>
  );
}

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
      description="Brand + Illustration + Payment + Social + UI + Large + Small + Tiny з Figma SVG export."
    >
      <nav className={styles.jumpNav} aria-label="Icon size sections">
        <a href="#icons-brand">Brand</a>
        <a href="#icons-illustration">Illustration (100)</a>
        <a href="#icons-payment">Payment (36)</a>
        <a href="#icons-social">Social (24)</a>
        <a href="#icons-large">Large (32–64)</a>
        <a href="#icons-small">Small (20)</a>
        <a href="#icons-tiny">Tiny (10)</a>
        <a href="#icons-ui-24">UI (24)</a>
      </nav>

      <ShowcaseSection
        id="icons-brand"
        title="Brand"
        description="Icon/Vprytyl (1363:36149) — radial gradient #FDD07F → #FEB93B → #FFA400 (Button Special exception). Icon/24/Mono (760:2510) — white fill, для темного фону."
      >
        <IconGridBrand icons={ICONS_BRAND} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Brand on dark surface"
        description="Mono на --surface-primary; Vprytyl gradient без змін."
      >
        <div className={styles.onDark}>
          <IconGridBrand icons={ICONS_BRAND} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-illustration"
        title="Illustration (100px)"
        description="Icon/100×100 (1317:38911, 1318:53781). Figma export: fill black (monochrome silhouette, не multi-color)."
      >
        <IconGridIllustration icons={ICONS_ILLUSTRATION} />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-payment"
        title="Payment (36px)"
        description="Icons frame (1411:38046). Нативний 36×36. Сіра плитка #F5F5F5 → none; гліф (#1F1F1F / black / #FFA400) → currentColor."
      >
        <IconGridLarge icons={ICONS_PAYMENT} />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-social"
        title="Social (24px)"
        description="Icon/Social (96:4664). Figma export: одноколірні силуети #001E61 → currentColor (не multi-color brand)."
      >
        <IconGrid icons={ICONS_SOCIAL} iconSize={24} />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-large"
        title="Large (32, 40, 64px)"
        description="Icon/32–64 з Figma. Сітка показує нативний розмір (не зменшено до 24px)."
      >
        <IconGridLarge icons={ICONS_LARGE} />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-small"
        title="Small (20px)"
        description="Icon/20 з Figma (3:7945 …). viewBox 0 0 20 20, default size 20."
      >
        <IconGrid icons={ICONS_SMALL} iconSize={20} />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-tiny"
        title="Tiny (10px)"
        description="Icon/10 з Figma (3:7824 …). viewBox 0 0 10 10, default size 10 (--size-2xsmall)."
      >
        <IconGrid icons={ICONS_TINY} iconSize={10} tiny />
      </ShowcaseSection>

      <ShowcaseSection
        id="icons-ui-24"
        title="UI icons (24px)"
        description="Експорт з Prytula-Responsive → iconFigmaSources.ts. Порівняй з Figma Icons frame (3:7823)."
      >
        <IconGrid icons={ICONS_MVP} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Social on dark surface"
        description="Social на --surface-primary — currentColor = --text-inverse."
      >
        <div className={styles.onDark}>
          <IconGrid icons={ICONS_SOCIAL} iconSize={24} />
        </div>
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
          <li>Package: Icons/ + brand/ + illustration/ + payment/ + social/ + large/ + small/ + tiny/</li>
          <li>UI/Tiny/Small/Large/Social: currentColor where noted</li>
          <li>Payment: tile #F5F5F5 → none; glyph → currentColor</li>
          <li>Illustration: black fill as exported</li>
          <li>Brand Vprytyl: radial gradient #FDD07F / #FEB93B / #FFA400 (approved exception)</li>
          <li>Brand Mono: white fill — use on dark surface</li>
          <li>
            Size default: 36 (Payment) / 24 (UI, Social) / 32–64 (Large) / 20 (Small) / 10
            (Tiny)
          </li>
        </ul>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
