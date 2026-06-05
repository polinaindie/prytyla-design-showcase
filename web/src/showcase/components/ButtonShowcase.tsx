import { useEffect, useMemo, useState } from "react";
import { Button } from "../../design-system/Button";
import {
  ShowcaseDocAnatomy,
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocSizeSwitch,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  type DocPropertyRow,
  type ShowcaseViewportId,
} from "../primitives";
import { buttonShowcaseGridColumnsForViewportWidth } from "../showcaseTypography";
import { useCssVarValues } from "../tokens/useCssVarValues";
import {
  BUTTON_SECTION_OPTIONS,
  BUTTON_STATE_NAV_OPTIONS,
  BUTTON_STATE_STANDARD_OPTIONS,
  ButtonShowcaseCatalog,
  buttonShowcaseSupportsStateFilter,
  type ButtonShowcaseSection,
  type ButtonShowcaseStateView,
} from "./ButtonShowcaseCatalog";
import styles from "./ButtonShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const LIVE_PREVIEW_CODE = `import { Button } from "@/design-system/Button";

<Button variant="primary" theme="light">Підтримати</Button>
<Button variant="primary" theme="special">Долучитись</Button>
<Button variant="nav" navAppearance="outline">попередня</Button>`;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "variant",
    type: "ButtonVariant",
    typeKind: "VARIANT",
    optionsDefault:
      "primary · secondary · contact · nav · social",
    description: "Figma `type` — візуальний тип кнопки.",
  },
  {
    property: "theme",
    type: "ButtonTheme",
    typeKind: "VARIANT",
    optionsDefault: "light · dark · special",
    description:
      "Контекст поверхні; `special` лише з variant=primary (donate CTA).",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Disabled fill + --text-disabled (крім nav-специфіки).",
  },
  {
    property: "showLeftIcon / showRightIcon",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false / true",
    description:
      "Лише один слот: ліва або права іконка (не обидва). Special — лише `leftIcon` + showLeftIcon.",
  },
  {
    property: "linkTarget",
    type: "internal | external",
    typeKind: "VARIANT",
    optionsDefault: "internal",
    description:
      "Дефолтна стрілка primary/secondary: internal → Arrow-Right (горизонтальна анімація), external → Arrow-Up-Right (діагональ).",
  },
  {
    property: "contactType",
    type: "email | phone",
    typeKind: "VARIANT",
    optionsDefault: "—",
    description: "variant=contact; рендер <a> з href.",
  },
  {
    property: "navAppearance",
    type: "outline | ghost",
    typeKind: "VARIANT",
    optionsDefault: "outline",
    description: "variant=nav — Figma NavBatton.",
  },
  {
    property: "active",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "variant=nav — активна сторінка каруселі.",
  },
  {
    property: "socialNetwork",
    type: "facebook",
    typeKind: "VARIANT",
    optionsDefault: "—",
    description: "variant=social; icon-only, aria-label обов’язковий.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Standard", property: "height", token: "--size-4xlarge" },
  { element: "Standard", property: "padding-x", token: "--space-2xlarge" },
  { element: "Standard", property: "border-radius", token: "--radius-round" },
  { element: "Primary light", property: "background", token: "--surface-action" },
  {
    element: "Primary light",
    property: "background (hover)",
    token: "--surface-action-hover",
  },
  { element: "Primary light", property: "color", token: "--text-on-action" },
  { element: "Primary dark", property: "background", token: "--surface-primary" },
  { element: "Primary dark", property: "color", token: "--text-on-primary" },
  { element: "Secondary dark", property: "border", token: "--border-strong" },
  { element: "Secondary light", property: "border", token: "--border-inverse" },
  { element: "Disabled", property: "background", token: "--surface-disabled" },
  { element: "Disabled", property: "color", token: "--text-disabled" },
  { element: "Special", property: "gradient end", token: "--accent-secondary" },
  { element: "Nav", property: "height", token: "--size-2xlarge" },
  { element: "Contact light", property: "background", token: "--surface-contact-subtle" },
] as const;

function ButtonShowcasePage() {
  const [section, setSection] = useState<ButtonShowcaseSection>("primary-secondary");
  const [stateView, setStateView] =
    useState<ButtonShowcaseStateView>("default");
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const previewGridColumns =
    buttonShowcaseGridColumnsForViewportWidth(previewWidth);

  const showStateFilter = buttonShowcaseSupportsStateFilter(section);
  const stateOptions =
    section === "nav" ? BUTTON_STATE_NAV_OPTIONS : BUTTON_STATE_STANDARD_OPTIONS;

  useEffect(() => {
    setStateView("default");
  }, [section]);

  const sectionLabel =
    BUTTON_SECTION_OPTIONS.find((o) => o.value === section)?.label ?? section;

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <ShowcaseDocPage
      title="Button"
      description="Кнопки та link-chips DS: primary, secondary, donate special, contact, nav, social."
      status="stable"
      version="1.0"
      updatedAt="2026-05-22"
      figmaUrl={FIGMA_URL}
      showViewportBar={false}
    >
      <ShowcaseDocSection
        section="live-preview"
        description="Перемикачі зверху — тип і стан; у frame лише обрана група."
      >
        <ShowcaseDocLivePreview
          caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · grid=${previewGridColumns} col · section=${sectionLabel}${showStateFilter ? ` · state=${stateView}` : ""} · hover — CSS.`}
          code={LIVE_PREVIEW_CODE}
          previewViewport
          previewViewportId={previewViewportId}
          onPreviewViewportChange={setPreviewViewportId}
          previewFrameWidth={previewWidth}
          toolbarSwitchesExtra={
            <ShowcaseDocSizeSwitch
              value={section}
              onChange={setSection}
              labeledOptions={BUTTON_SECTION_OPTIONS}
              aria-label="Тип кнопки"
            />
          }
          previewActions={
            showStateFilter ? (
              <ShowcaseDocSizeSwitch
                value={stateView}
                onChange={setStateView}
                labeledOptions={stateOptions}
                aria-label="Стан кнопки"
              />
            ) : null
          }
        >
          <ButtonShowcaseCatalog
            section={section}
            stateView={stateView}
            previewGridColumns={previewGridColumns}
          />
        </ShowcaseDocLivePreview>
      </ShowcaseDocSection>

      <ShowcaseDocSection
        section="anatomy"
        description="Стандартна primary кнопка — слоти та контейнер."
      >
        <ShowcaseDocAnatomy
          diagram={
            <ShowcasePreview className={styles.preview}>
              <Button variant="primary" theme="light">
                Підтримати
              </Button>
            </ShowcasePreview>
          }
          labels={[
            {
              id: "root",
              title: "Root (.root)",
              description: "44px pill, padding, radius-round, focus/hover CSS.",
            },
            {
              id: "label",
              title: "Label (.label)",
              description: "Текст дії; font-size-body-small, weight 600.",
            },
            {
              id: "icons",
              title: "Icons (.icon)",
              description: "Special — gradient label + Icon/Vprytyl; hover → black.",
            },
          ]}
          caption="Contact / nav / social мають іншу внутрішню структуру (див. live preview)."
        />
      </ShowcaseDocSection>

      <ShowcaseDocSection section="properties">
        <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
      </ShowcaseDocSection>

      <ShowcaseDocSection section="token-usage">
        <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        <p className={styles.note}>
          Special variant: gradient exceptions (#fdd07f, rgba white) — див.
          prytula-design-system.mdc «Approved exceptions».
        </p>
      </ShowcaseDocSection>

      <ShowcaseDocSection
        section="states-interactions"
        description="Hover, focus-visible, pressed — CSS; disabled — prop."
      >
        <ShowcaseDocBulletList
          items={[
            "Hover і :active — CSS; окремого пропа немає (див. live preview).",
            "Primary/secondary: internal — Arrow-Right (горизонтально); external — Arrow-Up-Right (діагонально).",
            "Nav: active=data-active на root; disabled зберігає outline border.",
            "Contact/Social: рендер <a>; disabled через aria-disabled.",
          ]}
        />
      </ShowcaseDocSection>

      <ShowcaseDocSection section="accessibility">
        <ShowcaseDocBulletList
          items={[
            "Primary/secondary/nav: <button>; contact/social: <a> з href.",
            "Social icon-only — обов’язковий aria-label.",
            "Keyboard: Tab, Enter/Space для button; Enter для links.",
            "Focus-visible: outline на nav/contact dismiss paths у CSS.",
            "Не покладайтесь лише на колір — label завжди видимий (крім social).",
          ]}
        />
      </ShowcaseDocSection>

      <ShowcaseDocSection section="usage-guidelines">
        <ShowcaseDocUsageGuidelines
          do={[
            "Primary Light — головна дія на світлому фоні",
            "Primary Dark — головна дія на темному / inverse",
            "Special — лише donate CTA «Долучитись»",
            "Contact — mailto:/tel: у футері; Nav — карусель; Social — з aria-label",
          ]}
          dont={[
            "Два Primary поруч на одному екрані",
            "Special для звичайних форм",
            "Contact як submit у формі",
            "Зміна height/padding без нового токена в Figma",
          ]}
          alternatives={[
            {
              label: "Link Card",
              path: "link-card",
              note: "картка-лінк замість CTA pill",
            },
            {
              label: "Quick Amount",
              path: "quick-amount",
              note: "preset суми донату",
            },
          ]}
        />
      </ShowcaseDocSection>

      <ShowcaseDocSection section="related-components">
        <ShowcaseDocRelated
          related={[
            { label: "Quick Amount", path: "quick-amount" },
            { label: "Chip Payment Type", path: "chip-payment-type" },
          ]}
          usedWith={[
            { label: "Menu", path: "menu" },
            { label: "Footer", path: "footer" },
            { label: "General Widget", path: "general-widget" },
          ]}
        />
      </ShowcaseDocSection>
    </ShowcaseDocPage>
  );
}

export function ButtonShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ButtonShowcasePage />
    </ShowcaseThemeProvider>
  );
}
