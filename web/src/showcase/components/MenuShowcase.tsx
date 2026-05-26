import { useState } from "react";
import { Menu } from "../../design-system/Menu";
import type { MenuNavConfig } from "../../design-system/Menu";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./MenuShowcase.module.css";

const NAV: MenuNavConfig[] = [
  { label: "Проєкти", href: "#projects" },
  { label: "Звітність", href: "#reports" },
  { type: "dropdown", label: "Про фонд" },
  { label: "Новини", href: "#news" },
  { label: "Партнерства", href: "#partnerships" },
];

const QUICK_EXAMPLE = `import { Menu } from '@/design-system/Menu';

<Menu
  size="desktop"
  navItems={[
    { type: 'dropdown', label: 'Про фонд', open: aboutOpen, onClick: toggleAbout },
  ]}
  otherDirectionsOpen={directionsOpen}
  onOtherDirectionsClick={() => setDirectionsOpen((v) => !v)}
  mobileMenuOpen={menuOpen}
  onMobileMenuToggle={() => setMenuOpen((v) => !v)}
/>`;

const PROPS = [
  {
    name: "size",
    type: '"desktop" | "tablet" | "mobile"',
    default: '"desktop"',
    description: "Desktop/tablet — bar + panels; mobile/tablet drawer when menu open.",
  },
  {
    name: "navItems",
    type: "MenuNavConfig[]",
    description: "NavItem links; dropdown.open → About panel (desktop).",
  },
  {
    name: "otherDirectionsOpen",
    type: "boolean",
    description: "Desktop/tablet — «Інші напрями» mega row (Figma 3:7270).",
  },
  {
    name: "mobileMenuOpen",
    type: "boolean",
    description: "Mobile/tablet drawer (Figma 1149:24142 / 1150:24953).",
  },
  {
    name: "aboutPanelLinks / directionPanelLinks",
    type: "MenuPanelLink[]",
    description: "LinkCard rows inside open panels.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "rgba(255,255,255,0.8), --surface-subtle-info",
    usedIn: "Glass bar (default); єдиний open shell + drawer (Figma section-cool)",
  },
  { category: "Surface", name: "--surface-page", usedIn: "Showcase preview bg" },
  {
    category: "Layout",
    name: "--size-4xlarge, --space-large, --space-3xlarge",
    usedIn: "Bar, panels, gaps",
  },
  {
    category: "Color",
    name: "--text-default, --accent-primary, --border-contact",
    usedIn: "Nav, drawer links, social outline",
  },
];

function MenuShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const navItems: MenuNavConfig[] = NAV.map((item) =>
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
  );

  const toggleDirections = () => {
    setAboutOpen(false);
    setDirectionsOpen((v) => !v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Menu"
        description="Хедер Prytula (Figma Menu 3:7160, Prytula-Responsive): glass bar; open desktop — один shell #e9f7ff; tablet/mobile drawer."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Desktop — open states"
          description="Клік «Про фонд» або «Інші напрями»; панелі взаємовиключні."
        >
          <ShowcaseMatrix
            rows={[
              {
                rowLabel: "Default",
                cells: [
                  <ShowcasePreview className={styles.preview}>
                    <Menu
                      size="desktop"
                      navItems={navItems.map((item) =>
                        item.type === "dropdown" ? { ...item, open: false } : item,
                      )}
                      otherDirectionsOpen={directionsOpen}
                      onOtherDirectionsClick={toggleDirections}
                      donateHref="#donate"
                      onLanguageClick={() => {}}
                    />
                  </ShowcasePreview>,
                ],
              },
              {
                rowLabel: "About Open (3:7188)",
                cells: [
                  <ShowcasePreview className={styles.preview}>
                    <Menu
                      size="desktop"
                      navItems={navItems.map((item) =>
                        item.type === "dropdown" ? { ...item, open: true } : item,
                      )}
                      otherDirectionsOpen={false}
                      onOtherDirectionsClick={toggleDirections}
                      donateHref="#donate"
                    />
                  </ShowcasePreview>,
                ],
              },
              {
                rowLabel: "Other directions Open (3:7270)",
                cells: [
                  <ShowcasePreview className={styles.preview}>
                    <Menu
                      size="desktop"
                      navItems={navItems}
                      otherDirectionsOpen
                      onOtherDirectionsClick={toggleDirections}
                      donateHref="#donate"
                    />
                  </ShowcasePreview>,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tablet / Mobile">
          <ShowcaseMatrix
            rows={[
              {
                rowLabel: "Tablet — Default (127:9886)",
                cells: [
                  <ShowcasePreview className={`${styles.preview} ${styles.previewTablet}`}>
                    <Menu size="tablet" donateHref="#donate" onLanguageClick={() => {}} />
                  </ShowcasePreview>,
                ],
              },
              {
                rowLabel: "Mobile — Default (125:7776)",
                cells: [
                  <ShowcasePreview className={`${styles.preview} ${styles.previewMobile}`}>
                    <Menu size="mobile" onMobileMenuToggle={() => {}} />
                  </ShowcasePreview>,
                ],
              },
              {
                rowLabel: "Tablet — Menu Open (1150:24953)",
                cells: [
                  <>
                    <ShowcasePreview className={`${styles.preview} ${styles.previewTablet}`}>
                      <Menu
                        size="tablet"
                        mobileMenuOpen={tabletOpen}
                        onMobileMenuToggle={() => setTabletOpen((v) => !v)}
                        donateHref="#donate"
                      />
                    </ShowcasePreview>
                    <button
                      type="button"
                      className={styles.toggleHint}
                      onClick={() => setTabletOpen((v) => !v)}
                    >
                      Toggle drawer ({tabletOpen ? "open" : "closed"})
                    </button>
                  </>,
                ],
              },
              {
                rowLabel: "Mobile — Menu Open (1149:24142)",
                cells: [
                  <>
                    <ShowcasePreview className={`${styles.preview} ${styles.previewMobile}`}>
                      <Menu
                        size="mobile"
                        mobileMenuOpen={mobileOpen}
                        onMobileMenuToggle={() => setMobileOpen((v) => !v)}
                        donateHref="#donate"
                      />
                    </ShowcasePreview>
                    <button
                      type="button"
                      className={styles.toggleHint}
                      onClick={() => setMobileOpen((v) => !v)}
                    >
                      Toggle drawer ({mobileOpen ? "open" : "closed"})
                    </button>
                  </>,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Керуй open через navItems dropdown.open, otherDirectionsOpen, mobileMenuOpen.",
              "Reuse LinkCard + Button contact/social у панелях.",
            ]}
            dont={[
              "Не дублюй panel CSS поза Menu — розширюй MenuPanelLink props.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
