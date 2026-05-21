import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
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
  IconBrandMono,
  IconBrandVprytyl,
  IconCalendar,
  IconChevronDown,
  IconChevronDown10,
  IconClose,
  IconClose20,
  IconDocumentView,
  IconDropdown,
  IconEmail20,
  IconError,
  IconFilter,
  IconGlobe20,
  IconIllustrationDataError,
  IconIllustrationNoData,
  IconMenu,
  IconMoreHorizontal,
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
  IconPhone20,
  IconSearch,
  IconSocialFacebook,
  IconSocialInstagram,
  IconSocialLinkedIn,
  IconSocialTelegram,
  IconSocialX,
  IconSocialYouTube,
  type IconBrandMonoProps,
  type IconBrandVprytylProps,
  type IconProps,
} from "../../design-system/Icons";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type ShowcaseToolbarFilter,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./IconsShowcase.module.css";

type IconCategory =
  | "ui"
  | "small"
  | "tiny"
  | "large"
  | "social"
  | "payment"
  | "illustration"
  | "brand";

type IconCatalogEntry = {
  name: string;
  exportName: string;
  figmaPath: string;
  nodeId: string;
  category: IconCategory;
  nativeSize: number;
  nativeWidth?: number;
  nativeHeight?: number;
  Component: ComponentType<IconProps | IconBrandVprytylProps | IconBrandMonoProps>;
  /** Illustration uses fixed black fill — light patch on dark theme */
  illustration?: boolean;
};

const CATEGORY_FILTERS: ShowcaseToolbarFilter[] = [
  { id: "ui", label: "UI" },
  { id: "small", label: "Small" },
  { id: "tiny", label: "Tiny" },
  { id: "large", label: "Large" },
  { id: "social", label: "Social" },
  { id: "payment", label: "Payment" },
  { id: "illustration", label: "Illustration" },
  { id: "brand", label: "Brand" },
];

const CATEGORY_ORDER: IconCategory[] = [
  "ui",
  "small",
  "tiny",
  "large",
  "social",
  "payment",
  "illustration",
  "brand",
];

const CATEGORY_GRID_CLASS: Record<IconCategory, string> = {
  ui: styles.gridUi,
  small: styles.gridSmall,
  tiny: styles.gridTiny,
  large: styles.gridLarge,
  social: styles.gridSocial,
  payment: styles.gridPayment,
  illustration: styles.gridIllustration,
  brand: styles.gridBrand,
};

const CATEGORY_SECTION_TITLE: Record<IconCategory, string> = {
  ui: "UI (24px)",
  small: "Small (20px)",
  tiny: "Tiny (10px)",
  large: "Large (32–64px)",
  social: "Social (24px)",
  payment: "Payment (36px)",
  illustration: "Illustration (100px)",
  brand: "Brand",
};

const ICON_CATALOG: IconCatalogEntry[] = [
  { name: "Menu", exportName: "IconMenu", figmaPath: "Icon/24/Menu", nodeId: "1115:23555", category: "ui", nativeSize: 24, Component: IconMenu },
  { name: "Search", exportName: "IconSearch", figmaPath: "Icon/24/Search", nodeId: "1185:31237", category: "ui", nativeSize: 24, Component: IconSearch },
  { name: "Filter", exportName: "IconFilter", figmaPath: "Icon/24/Filter", nodeId: "1305:32931", category: "ui", nativeSize: 24, Component: IconFilter },
  { name: "Close", exportName: "IconClose", figmaPath: "Icon/24/Close", nodeId: "3:8004", category: "ui", nativeSize: 24, Component: IconClose },
  { name: "Calendar", exportName: "IconCalendar", figmaPath: "Icon/24/Calendar", nodeId: "1185:31219", category: "ui", nativeSize: 24, Component: IconCalendar },
  { name: "Dropdown", exportName: "IconDropdown", figmaPath: "Icon/24/Dropdown", nodeId: "1185:31193", category: "ui", nativeSize: 24, Component: IconDropdown },
  { name: "More-Horizontal", exportName: "IconMoreHorizontal", figmaPath: "Icon/24/More-Horizontal", nodeId: "3:7776", category: "ui", nativeSize: 24, Component: IconMoreHorizontal },
  { name: "Chevron-Down", exportName: "IconChevronDown", figmaPath: "Icon/24/Chevron-Down", nodeId: "1026:24646", category: "ui", nativeSize: 24, Component: IconChevronDown },
  { name: "Arrow-Left", exportName: "IconArrowLeft", figmaPath: "Icon/24/Arrow-Left", nodeId: "5:8884", category: "ui", nativeSize: 24, Component: IconArrowLeft },
  { name: "Arrow-Up-Right", exportName: "IconArrowUpRight", figmaPath: "Icon/24/Arrow-Up-Right", nodeId: "5:8891", category: "ui", nativeSize: 24, Component: IconArrowUpRight },
  { name: "Error", exportName: "IconError", figmaPath: "Icon/24/Error", nodeId: "1256:29906", category: "ui", nativeSize: 24, Component: IconError },
  { name: "Document_view", exportName: "IconDocumentView", figmaPath: "Icon/24/Document_view", nodeId: "1261:29096", category: "ui", nativeSize: 24, Component: IconDocumentView },

  { name: "Globe", exportName: "IconGlobe20", figmaPath: "Icon/20/Globe", nodeId: "3:7945", category: "small", nativeSize: 20, Component: IconGlobe20 },
  { name: "Phone", exportName: "IconPhone20", figmaPath: "Icon/20/Phone", nodeId: "5:8742", category: "small", nativeSize: 20, Component: IconPhone20 },
  { name: "Email", exportName: "IconEmail20", figmaPath: "Icon/20/Email", nodeId: "5:8743", category: "small", nativeSize: 20, Component: IconEmail20 },
  { name: "Arrow Down", exportName: "IconArrowDown20", figmaPath: "Icon/20/Arrow Down", nodeId: "1261:29064", category: "small", nativeSize: 20, Component: IconArrowDown20 },
  { name: "Close", exportName: "IconClose20", figmaPath: "Icon/20/Close", nodeId: "1318:53976", category: "small", nativeSize: 20, Component: IconClose20 },

  { name: "Chevron-Down", exportName: "IconChevronDown10", figmaPath: "Icon/10/Chevron-Down", nodeId: "3:7824", category: "tiny", nativeSize: 10, Component: IconChevronDown10 },
  { name: "Arrow-Left", exportName: "IconArrowLeft10", figmaPath: "Icon/10/Arrow-Left", nodeId: "1319:35979", category: "tiny", nativeSize: 10, Component: IconArrowLeft10 },
  { name: "Arrow-Right", exportName: "IconArrowRight10", figmaPath: "Icon/10/Arrow-Right", nodeId: "1319:35980", category: "tiny", nativeSize: 10, Component: IconArrowRight10 },
  { name: "Arrow-Left-Double", exportName: "IconArrowLeftDouble10", figmaPath: "Icon/10/Arrow-Left-Double", nodeId: "1319:36158", category: "tiny", nativeSize: 10, Component: IconArrowLeftDouble10 },
  { name: "Arrow-Right-Double", exportName: "IconArrowRightDouble10", figmaPath: "Icon/10/Arrow-Right-Double", nodeId: "1319:36159", category: "tiny", nativeSize: 10, Component: IconArrowRightDouble10 },
  { name: "Arrow-Up-Right", exportName: "IconArrowUpRight10", figmaPath: "Icon/10/Arrow-Up-Right", nodeId: "817:15808", category: "tiny", nativeSize: 10, Component: IconArrowUpRight10 },

  { name: "Arrow-Up-Right 32", exportName: "IconArrowUpRight32", figmaPath: "Icon/32/Arrow-Up-Right", nodeId: "1163:26966", category: "large", nativeSize: 32, Component: IconArrowUpRight32 },
  { name: "Arrow-Left 40", exportName: "IconArrowLeft40", figmaPath: "Icon/40/Arrow-Left", nodeId: "307:3917", category: "large", nativeSize: 40, Component: IconArrowLeft40 },
  { name: "Arrow-Up-Right 40", exportName: "IconArrowUpRight40", figmaPath: "Icon/40/Arrow-Up-Right", nodeId: "307:3959", category: "large", nativeSize: 40, Component: IconArrowUpRight40 },
  { name: "Arrow-Up-Right 64", exportName: "IconArrowUpRight64", figmaPath: "Icon/64/Arrow-Up-Right", nodeId: "103:6345", category: "large", nativeSize: 64, Component: IconArrowUpRight64 },

  { name: "Facebook", exportName: "IconSocialFacebook", figmaPath: "Icon/Social/Facebook", nodeId: "3:8051", category: "social", nativeSize: 24, Component: IconSocialFacebook },
  { name: "Instagram", exportName: "IconSocialInstagram", figmaPath: "Icon/Social/Instagram", nodeId: "3:8052", category: "social", nativeSize: 24, Component: IconSocialInstagram },
  { name: "Telegram", exportName: "IconSocialTelegram", figmaPath: "Icon/Social/Telegram", nodeId: "3:8053", category: "social", nativeSize: 24, Component: IconSocialTelegram },
  { name: "X", exportName: "IconSocialX", figmaPath: "Icon/Social/X", nodeId: "3:8054", category: "social", nativeSize: 24, Component: IconSocialX },
  { name: "LinkedIn", exportName: "IconSocialLinkedIn", figmaPath: "Icon/Social/LinkedIn", nodeId: "3:8055", category: "social", nativeSize: 24, Component: IconSocialLinkedIn },
  { name: "YouTube", exportName: "IconSocialYouTube", figmaPath: "Icon/Social/YouTube", nodeId: "3:8056", category: "social", nativeSize: 24, Component: IconSocialYouTube },

  { name: "Card", exportName: "IconPaymentCard", figmaPath: "Icons/Card", nodeId: "1411:38047", category: "payment", nativeSize: 36, Component: IconPaymentCard },
  { name: "Paypal", exportName: "IconPaymentPaypal", figmaPath: "Icons/Paypal", nodeId: "1411:38051", category: "payment", nativeSize: 36, Component: IconPaymentPaypal },
  { name: "Crypto", exportName: "IconPaymentCrypto", figmaPath: "Icons/Crypto", nodeId: "1411:38054", category: "payment", nativeSize: 36, Component: IconPaymentCrypto },
  { name: "Swift", exportName: "IconPaymentSwift", figmaPath: "Icons/Swift", nodeId: "1411:38057", category: "payment", nativeSize: 36, Component: IconPaymentSwift },
  { name: "Bank", exportName: "IconPaymentBank", figmaPath: "Icons/Bank", nodeId: "1411:38062", category: "payment", nativeSize: 36, Component: IconPaymentBank },
  { name: "HeartEmpty", exportName: "IconPaymentHeartEmpty", figmaPath: "Icons/HeartEmpty", nodeId: "1411:38067", category: "payment", nativeSize: 36, Component: IconPaymentHeartEmpty },
  { name: "HeartFilled", exportName: "IconPaymentHeartFilled", figmaPath: "Icons/HeartFilled", nodeId: "1411:38070", category: "payment", nativeSize: 36, Component: IconPaymentHeartFilled },
  { name: "Receipt", exportName: "IconPaymentReceipt", figmaPath: "Icons/Receipt", nodeId: "1411:38073", category: "payment", nativeSize: 36, Component: IconPaymentReceipt },
  { name: "Globe", exportName: "IconPaymentGlobe", figmaPath: "Icons/Globe", nodeId: "1411:38091", category: "payment", nativeSize: 36, Component: IconPaymentGlobe },
  { name: "Repeat", exportName: "IconPaymentRepeat", figmaPath: "Icons/Repeat", nodeId: "1411:38080", category: "payment", nativeSize: 36, Component: IconPaymentRepeat },

  { name: "DataError", exportName: "IconIllustrationDataError", figmaPath: "Icon/100×100/DataError", nodeId: "1317:38911", category: "illustration", nativeSize: 100, illustration: true, Component: IconIllustrationDataError },
  { name: "NoData", exportName: "IconIllustrationNoData", figmaPath: "Icon/100×100/NoData", nodeId: "1318:53781", category: "illustration", nativeSize: 100, illustration: true, Component: IconIllustrationNoData },

  { name: "Vprytyl", exportName: "IconBrandVprytyl", figmaPath: "Icon/Vprytyl", nodeId: "1363:36149", category: "brand", nativeSize: 13, nativeWidth: 99, nativeHeight: 13, Component: IconBrandVprytyl },
  { name: "Mono", exportName: "IconBrandMono", figmaPath: "Icon/24/Mono", nodeId: "760:2510", category: "brand", nativeSize: 24, nativeWidth: 58, nativeHeight: 24, Component: IconBrandMono },
];

const ICON_TOKENS: TokenUsage[] = [
  {
    category: "Color",
    name: "--text-default",
    usedIn: "Колір монохромних іконок через currentColor на світлому фоні",
  },
  {
    category: "Color",
    name: "--text-inverse",
    usedIn: "Колір іконок на темному фоні (theme Dark)",
  },
];

const ALL_FILTER_IDS = CATEGORY_FILTERS.map((f) => f.id);

function formatNativeSize(entry: IconCatalogEntry): string {
  if (entry.nativeWidth && entry.nativeHeight) {
    return `${entry.nativeWidth}×${entry.nativeHeight}px`;
  }
  return `${entry.nativeSize}×${entry.nativeSize}px`;
}

function renderIcon(entry: IconCatalogEntry): ReactNode {
  const { Component, nativeSize, nativeWidth, nativeHeight } = entry;
  if (nativeWidth !== undefined && nativeHeight !== undefined) {
    const Brand = Component as ComponentType<IconBrandVprytylProps | IconBrandMonoProps>;
    return <Brand width={nativeWidth} height={nativeHeight} />;
  }
  const Icon = Component as ComponentType<IconProps>;
  return <Icon size={nativeSize} />;
}

async function copyImportLine(exportName: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(
      `import { ${exportName} } from '@/design-system/Icons';`,
    );
    return true;
  } catch {
    return false;
  }
}

function IconsShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [query, setQuery] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>(ALL_FILTER_IDS);
  const [copiedExport, setCopiedExport] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedExport) return undefined;
    const timer = window.setTimeout(() => setCopiedExport(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedExport]);

  const filteredIcons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICON_CATALOG.filter((entry) => {
      if (!activeFilterIds.includes(entry.category)) return false;
      if (!q) return true;
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.exportName.toLowerCase().includes(q) ||
        entry.figmaPath.toLowerCase().includes(q) ||
        entry.nodeId.toLowerCase().includes(q)
      );
    });
  }, [query, activeFilterIds]);

  const iconsByCategory = useMemo(() => {
    const map = new Map<IconCategory, IconCatalogEntry[]>();
    for (const category of CATEGORY_ORDER) {
      map.set(category, []);
    }
    for (const entry of filteredIcons) {
      map.get(entry.category)?.push(entry);
    }
    return map;
  }, [filteredIcons]);

  const handleToggleFilter = (id: string) => {
    setActiveFilterIds((current) => {
      if (current.includes(id)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== id);
      }
      return [...current, id];
    });
  };

  const handleCopyIcon = async (exportName: string) => {
    const ok = await copyImportLine(exportName);
    if (ok) setCopiedExport(exportName);
  };

  const searchActive = query.trim().length > 0;

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copiedExport ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Icons"
        description="Повний набір іконок Prytula DS з Figma SVG export. Prytula-Responsive → Icons frame."
      >
        <ShowcaseToolbar
          showSearch
          searchPlaceholder="Пошук іконки…"
          searchValue={query}
          onSearch={setQuery}
          searchIcon={<IconSearch size={24} aria-hidden />}
          filters={CATEGORY_FILTERS}
          activeFilterIds={activeFilterIds}
          onToggleFilter={handleToggleFilter}
        />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock
            code={`import { IconArrowUpRight } from '@/design-system/Icons';

<IconArrowUpRight aria-label="Open in new tab" />`}
          />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Типовий UI-іконка; тема сторінки керує кольором currentColor."
        >
          <div className={styles.livePreview}>
            <IconArrowUpRight size={24} aria-label="Open in new tab" />
          </div>
        </ShowcaseSection>

        {searchActive ? (
          <p className={styles.searchCount} aria-live="polite">
            Знайдено {filteredIcons.length} іконок
          </p>
        ) : null}

        {CATEGORY_ORDER.map((category) => {
          const icons = iconsByCategory.get(category) ?? [];
          if (icons.length === 0) return null;

          return (
            <ShowcaseSection
              key={category}
              id={`icons-${category}`}
              title={CATEGORY_SECTION_TITLE[category]}
              description={`${icons.length} іконок · клік по клітинці — копіює import`}
            >
              <div className={`${styles.gridBase} ${CATEGORY_GRID_CLASS[category]}`}>
                {icons.map((entry) => (
                  <button
                    key={`${entry.category}-${entry.exportName}`}
                    type="button"
                    className={styles.cell}
                    onClick={() => handleCopyIcon(entry.exportName)}
                    title={`Figma: ${entry.figmaPath} • node ${entry.nodeId} • Click to copy`}
                  >
                    <div className={styles.cellInner}>
                      <div
                        className={`${styles.previewBox} ${entry.illustration ? styles.previewBoxIllustration : ""}`}
                      >
                        {renderIcon(entry)}
                      </div>
                      <div className={styles.cellLabels}>
                        {category === "large" ? (
                          <span className={styles.meta}>{formatNativeSize(entry)}</span>
                        ) : null}
                        <span className={styles.name}>{entry.name}</span>
                        <span className={styles.exportName} title={entry.exportName}>
                          {entry.exportName}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ShowcaseSection>
          );
        })}

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={ICON_TOKENS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines" description="Коли і як використовувати іконки">
          <ShowcaseDoDont
            do={[
              "Використовуй aria-label для інтерактивних іконок",
              "Бери розмір що відповідає контексту (10px у тексті, 24px у toolbar)",
            ]}
            dont={[
              "Не змінюй розмір через CSS scale — бери правильний компонент",
              "Не хардкодуй кольори у style — використовуй CSS color / currentColor",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function IconsShowcase() {
  return (
    <ShowcaseThemeProvider>
      <IconsShowcasePage />
    </ShowcaseThemeProvider>
  );
}
