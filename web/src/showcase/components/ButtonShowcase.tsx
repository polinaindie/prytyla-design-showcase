import { useMemo } from "react";
import { Button } from "../../design-system/Button";
import {
  ShowcaseDocAnatomy,
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseMatrix,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./ButtonShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const LIVE_PREVIEW_CODE = `import { Button } from "@/design-system/Button";

<Button variant="primary" theme="light">
  Підтримати
</Button>`;

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
    optionsDefault: "true",
    description: "Слоти іконок для primary/secondary/special.",
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

function OnDark({ children }: { children: React.ReactNode }) {
  return <div className={styles.onDark}>{children}</div>;
}

function ButtonShowcasePage() {
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
        description="Найчастіший випадок — primary на світлій поверхні."
      >
        <ShowcaseDocLivePreview
          caption="variant=primary · theme=light · default state (hover — CSS)."
          code={LIVE_PREVIEW_CODE}
        >
          <Button variant="primary" theme="light">
            Підтримати
          </Button>
        </ShowcaseDocLivePreview>
      </ShowcaseDocSection>

      <ShowcaseDocSection
        section="variants-gallery"
        description="Усі variant × theme; hover — наведи курсор."
      >
        <p className={styles.galleryCaption}>
          Property: variant · Rows=primary|secondary · Cols=theme light|dark
        </p>
        <ShowcaseMatrix
          columns={["Light", "Dark"]}
          rows={[
            {
              rowLabel: "Primary",
              cells: [
                <Button key="pl" variant="primary" theme="light">
                  Підтримати
                </Button>,
                <Button key="pd" variant="primary" theme="dark">
                  Підтримати
                </Button>,
              ],
            },
            {
              rowLabel: "Secondary",
              cells: [
                <Button key="sd" variant="secondary" theme="dark">
                  Дізнатись більше
                </Button>,
                <OnDark key="sl">
                  <Button variant="secondary" theme="light">
                    Дізнатись більше
                  </Button>
                </OnDark>,
              ],
            },
          ]}
        />

        <p className={styles.galleryCaption}>
          variant=primary · theme=special · Cols=default|disabled
        </p>
        <ShowcaseMatrix
          columns={["Default", "Disabled"]}
          rows={[
            {
              cells: [
                <Button
                  key="s0"
                  variant="primary"
                  theme="special"
                >
                  Долучитись
                </Button>,
                <Button
                  key="s1"
                  variant="primary"
                  theme="special"
                  disabled
                >
                  Долучитись
                </Button>,
              ],
            },
          ]}
        />

        <p className={styles.galleryCaption}>
          variant=contact · Rows=theme · Cols=email|phone
        </p>
        <ShowcaseMatrix
          columns={["Email", "Phone"]}
          rows={[
            {
              rowLabel: "Dark",
              cells: [
                <Button
                  key="ce"
                  variant="contact"
                  theme="dark"
                  contactType="email"
                  href="mailto:info@prytula.org"
                >
                  info@prytula.org
                </Button>,
                <Button
                  key="cp"
                  variant="contact"
                  theme="dark"
                  contactType="phone"
                  contactLabel="Гаряча лінія:"
                  href="tel:+380000000000"
                >
                  0 800 000 000
                </Button>,
              ],
            },
            {
              rowLabel: "Light",
              cells: [
                <OnDark key="cle">
                  <Button
                    variant="contact"
                    theme="light"
                    contactType="email"
                    href="mailto:info@prytula.org"
                  >
                    info@prytula.org
                  </Button>
                </OnDark>,
                <OnDark key="clp">
                  <Button
                    variant="contact"
                    theme="light"
                    contactType="phone"
                    contactLabel="Гаряча лінія:"
                    href="tel:+380000000000"
                  >
                    0 800 000 000
                  </Button>
                </OnDark>,
              ],
            },
          ]}
        />

        <p className={styles.galleryCaption}>
          variant=social · socialNetwork=facebook · 44×44 icon-only
        </p>
        <ShowcaseMatrix
          columns={["Dark", "Light"]}
          rows={[
            {
              cells: [
                <Button
                  key="soc-d"
                  variant="social"
                  theme="dark"
                  socialNetwork="facebook"
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                />,
                <OnDark key="soc-l">
                  <Button
                    variant="social"
                    theme="light"
                    socialNetwork="facebook"
                    href="https://www.facebook.com/"
                    aria-label="Facebook"
                  />
                </OnDark>,
              ],
            },
          ]}
        />

        <p className={styles.galleryCaption}>
          variant=nav · Rows=outline|ghost · Cols=default|hover|disabled|active
        </p>
        <ShowcaseMatrix
          columns={["Default", "Hover", "Disabled", "Active"]}
          rows={[
            {
              rowLabel: "Outline",
              cells: [
                <Button key="no0" variant="nav" navAppearance="outline">
                  попередня
                </Button>,
                <Button key="no1" variant="nav" navAppearance="outline">
                  попередня
                </Button>,
                <Button key="no2" variant="nav" navAppearance="outline" disabled>
                  попередня
                </Button>,
                <Button key="no3" variant="nav" navAppearance="outline" active>
                  попередня
                </Button>,
              ],
            },
            {
              rowLabel: "Ghost",
              cells: [
                <Button key="ng0" variant="nav" navAppearance="ghost">
                  попередня
                </Button>,
                <Button key="ng1" variant="nav" navAppearance="ghost">
                  попередня
                </Button>,
                <Button key="ng2" variant="nav" navAppearance="ghost" disabled>
                  попередня
                </Button>,
                <Button key="ng3" variant="nav" navAppearance="ghost" active>
                  попередня
                </Button>,
              ],
            },
          ]}
        />

        <p className={styles.galleryCaption}>
          Icons · variant=primary · theme=light
        </p>
        <ShowcaseMatrix
          columns={["Ліва", "Права", "Обидві", "Без іконок"]}
          rows={[
            {
              cells: [
                <Button
                  key="il"
                  variant="primary"
                  theme="light"
                  showLeftIcon
                  showRightIcon={false}
                >
                  Ліва іконка
                </Button>,
                <Button
                  key="ir"
                  variant="primary"
                  theme="light"
                  showLeftIcon={false}
                  showRightIcon
                >
                  Права іконка
                </Button>,
                <Button key="ib" variant="primary" theme="light">
                  Обидві
                </Button>,
                <Button
                  key="in"
                  variant="primary"
                  theme="light"
                  showLeftIcon={false}
                  showRightIcon={false}
                >
                  Без іконок
                </Button>,
              ],
            },
          ]}
        />
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
          caption="Contact / nav / social мають іншу внутрішню структуру (див. variants gallery)."
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
        description="Disabled; hover/focus/pressed — CSS :hover та :focus-visible."
      >
        <p className={styles.galleryCaption}>disabled=true · primary & secondary</p>
        <ShowcaseMatrix
          columns={[
            "Primary light",
            "Primary dark",
            "Secondary dark",
            "Secondary light",
          ]}
          rows={[
            {
              cells: [
                <Button key="dpl" variant="primary" theme="light" disabled>
                  Підтримати
                </Button>,
                <Button key="dpd" variant="primary" theme="dark" disabled>
                  Підтримати
                </Button>,
                <Button key="dsd" variant="secondary" theme="dark" disabled>
                  Дізнатись більше
                </Button>,
                <OnDark key="dsl">
                  <Button variant="secondary" theme="light" disabled>
                    Дізнатись більше
                  </Button>
                </OnDark>,
              ],
            },
          ]}
        />
        <ShowcaseDocBulletList
          items={[
            "Hover не окремий проп — наведи курсор на live preview або matrix.",
            "Nav: active=data-active на root; disabled зберігає outline border.",
            "Contact/Social: рендер <a>; disabled через aria-disabled.",
          ]}
        />
      </ShowcaseDocSection>

      <ShowcaseDocSection
        section="sizes"
        description="Висота через size-токени; окремих S/M/L пропів немає."
      >
        <ShowcasePreview className={styles.sizeRow}>
          <div className={styles.sizeCell}>
            <Button variant="primary" theme="light">
              Primary
            </Button>
            <span className={styles.sizeCaption}>--size-4xlarge (44px)</span>
          </div>
          <div className={styles.sizeCell}>
            <Button variant="nav" navAppearance="outline">
              Nav
            </Button>
            <span className={styles.sizeCaption}>--size-2xlarge (36px)</span>
          </div>
          <div className={styles.sizeCell}>
            <Button
              variant="social"
              theme="dark"
              socialNetwork="facebook"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            />
            <span className={styles.sizeCaption}>44×44 (--size-4xlarge)</span>
          </div>
        </ShowcasePreview>
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

      <ShowcaseDocSection
        section="examples"
        description="Типові рецепти в продукті."
      >
        <p className={styles.galleryCaption}>Donate hero</p>
        <ShowcasePreview className={styles.preview}>
          <Button variant="primary" theme="special">
            Долучитись
          </Button>
        </ShowcasePreview>

        <p className={styles.galleryCaption}>Footer contact row</p>
        <ShowcasePreview className={styles.preview}>
          <div className={styles.row}>
            <Button
              variant="contact"
              theme="dark"
              contactType="email"
              href="mailto:info@prytula.org"
            >
              info@prytula.org
            </Button>
            <Button
              variant="social"
              theme="dark"
              socialNetwork="facebook"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            />
          </div>
        </ShowcasePreview>
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
