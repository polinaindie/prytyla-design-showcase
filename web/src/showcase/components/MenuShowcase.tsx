import { useMemo, useState } from "react";
import { Menu } from "../../design-system/Menu";
import { DEFAULT_NAV } from "../../design-system/Menu/menuDefaults";
import type { MenuNavConfig, MenuSize } from "../../design-system/Menu";
import type { LogoLanguage } from "../../design-system/Logo/Logo.types";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseThemeProvider,
  menuSizeForViewportWidth,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./MenuShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7160";

const LIVE_PREVIEW_CODE = `import { Menu } from "@/design-system/Menu";

<Menu
  size="desktop"
  navItems={navItems}
  otherDirectionsOpen={directionsOpen}
  onOtherDirectionsClick={toggleDirections}
  donateHref="/donate"
/>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "size",
    type: '"desktop" | "laptop" | "tablet" | "mobile"',
    typeKind: "VARIANT",
    optionsDefault: '"desktop"',
    description: "Bar + panels; tablet/mobile — drawer.",
  },
  {
    property: "navItems",
    type: "MenuNavConfig[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "DEFAULT_NAV",
    description: "Links; dropdown.open → About panel.",
  },
  {
    property: "otherDirectionsOpen",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Desktop «Інші напрями» mega row (3:7270).",
  },
  {
    property: "mobileMenuOpen",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Tablet/mobile drawer open.",
  },
  {
    property: "aboutPanelLinks / directionPanelLinks",
    type: "MenuPanelLink[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "menuDefaults",
    description: "LinkCard rows у панелях.",
  },
  {
    property: "donateHref / onDonateClick",
    type: "string / fn",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Donate CTA у bar / drawer.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Bar", property: "background", token: "rgba(255,255,255,0.8)" },
  { element: "Open shell", property: "background", token: "--surface-subtle-info" },
  { element: "Bar", property: "min-height", token: "--size-4xlarge" },
  { element: "Nav", property: "color", token: "--text-default" },
  { element: "Drawer link", property: "color", token: "--accent-primary" },
  { element: "Social", property: "border", token: "--border-contact" },
] as const;

function MenuShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLanguage, setLogoLanguage] = useState<LogoLanguage>("uk");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewSize: MenuSize = menuSizeForViewportWidth(previewWidth);
  const isWideBarPreview =
    previewSize === "desktop" || previewSize === "laptop";

  const navItems: MenuNavConfig[] = useMemo(
    () =>
      DEFAULT_NAV.map((item) =>
        item.type === "dropdown"
          ? {
              ...item,
              open: aboutOpen,
              onClick: () => {
                setDirectionsOpen(false);
                setAboutOpen((v) => !v);
              },
            }
          : item,
      ),
    [aboutOpen],
  );

  const toggleDirections = () => {
    setAboutOpen(false);
    setDirectionsOpen((v) => !v);
  };

  const handlePreviewViewportChange = (id: ShowcaseViewportId) => {
    setPreviewViewportId(id);
    const nextSize = menuSizeForViewportWidth(showcaseViewportWidth(id));
    if (nextSize === "desktop" || nextSize === "laptop") {
      setMobileMenuOpen(false);
    }
  };

  const tokenKeys = useMemo(
    () =>
      TOKEN_USAGE_SAMPLE.map((row) => row.token).filter((t) => t.startsWith("--")),
    [],
  );

  const usageValues = useCssVarValues(tokenKeys);

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: row.token.startsWith("--")
      ? (usageValues[row.token] ?? "—")
      : row.token,
  }));

  const panelCaption = isWideBarPreview
    ? ` · about=${aboutOpen ? "open" : "closed"} · directions=${directionsOpen ? "open" : "closed"}`
    : ` · drawer=${mobileMenuOpen ? "open" : "closed"}`;

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Menu"
        description="Хедер Prytula: glass bar, desktop mega-panels, tablet/mobile drawer."
        status="stable"
        version="1.0"
        updatedAt="2026-06-03"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ширина frame — Wide desktop … Mobile; Figma size і typography підбираються автоматично."
        >
          <ShowcaseDocLivePreview
            caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · size=${previewSize}${panelCaption} · glass bar.`}
            code={LIVE_PREVIEW_CODE}
            previewViewport
            previewViewportId={previewViewportId}
            onPreviewViewportChange={handlePreviewViewportChange}
            flush
          >
            <div className={styles.livePreviewSlot}>
              <Menu
                size={previewSize}
                logoLanguage={logoLanguage}
                onLanguageChange={setLogoLanguage}
                navItems={navItems}
                otherDirectionsOpen={directionsOpen}
                onOtherDirectionsClick={toggleDirections}
                donateHref="#donate"
                mobileMenuOpen={isWideBarPreview ? false : mobileMenuOpen}
                onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
              />
            </div>
          </ShowcaseDocLivePreview>
          {!isWideBarPreview ? (
            <button
              type="button"
              className={styles.toggleHint}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              Toggle drawer ({mobileMenuOpen ? "open" : "closed"})
            </button>
          ) : null}
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Bar glass rgba(255,255,255,0.8) — approved exception; open shell
            --surface-subtle-info.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="states-interactions">
          <ShowcaseDocBulletList
            items={[
              "Desktop: dropdown.open (About) і otherDirectionsOpen — взаємовиключні.",
              "Tablet/mobile: mobileMenuOpen + onMobileMenuToggle.",
              "Donate / language / social — Button + LinkCard всередині Menu.",
              "Escape / click outside — логіка в батьківській сторінці (не в Menu).",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Nav links — нативні <a> або button для dropdown.",
              "Drawer: focus trap — відповідальність layout/page.",
              "Icon menu/close — aria-label на кнопках toggle.",
              "Logo — alt / aria-hidden за контекстом home link.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Керуй open через navItems, otherDirectionsOpen, mobileMenuOpen",
              "Reuse LinkCard + Button у панелях",
              "menuDefaults для типових panel links",
            ]}
            dont={[
              "Не дублюй panel CSS поза Menu",
              "Не два open panel одночасно на desktop",
            ]}
            alternatives={[]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Logo", path: "logo" },
              { label: "Button", path: "button" },
              { label: "Link Card", path: "link-card" },
            ]}
            usedWith={[{ label: "Footer", path: "footer" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function MenuShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MenuShowcasePage />
    </ShowcaseThemeProvider>
  );
}
