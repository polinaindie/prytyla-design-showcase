import { Button } from "../../design-system/Button";
import {
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseTokensList,
} from "../primitives";
import type { TokenUsage } from "../primitives";
import styles from "./ButtonShowcase.module.css";

const TOKENS_USED: TokenUsage[] = [
  { category: "Layout", name: "--size-4xlarge, --space-small, --radius-round", usedIn: "Sizes" },
  { category: "Surface", name: "--surface-action, --surface-primary", usedIn: "Primary fills" },
  { category: "Text", name: "--text-on-action, --text-on-primary", usedIn: "Primary labels" },
  { category: "Border", name: "--border-inverse, --border-strong", usedIn: "Secondary" },
  { category: "Surface", name: "--surface-disabled", usedIn: "Disabled" },
  { category: "Accent", name: "--accent-secondary + gradient exceptions", usedIn: "Special variant" },
  { category: "Surface", name: "--surface-contact-subtle", usedIn: "Contact / Social" },
];

export function ButtonShowcase() {
  return (
    <ShowcasePageLayout
      title="Button"
      description="Кнопка дизайн-системи Prytula. Hover — наведи курсор; окремих hover-swatch немає."
    >
      <ShowcaseSection
        title="Variants"
        description="Чотири базові комбінації variant × theme у стані default (наведи для hover)."
      >
        <ShowcaseMatrix
          columns={["Light", "Dark"]}
          rows={[
            {
              rowLabel: "Primary",
              cells: [
                <Button variant="primary" theme="light">
                  Підтримати
                </Button>,
                <Button variant="primary" theme="dark">
                  Підтримати
                </Button>,
              ],
            },
            {
              rowLabel: "Secondary",
              cells: [
                <Button variant="secondary" theme="dark">
                  Дізнатись більше
                </Button>,
                <div className={styles.onDark}>
                  <Button variant="secondary" theme="light">
                    Дізнатись більше
                  </Button>
                </div>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Special"
        description="primary + special — градієнт на stroke, текст і іконки (default); radial hover з Figma."
      >
        <ShowcaseMatrix
          columns={["Default", "Disabled"]}
          rows={[
            {
              cells: [
                <Button variant="primary" theme="special" showLeftIcon={false}>
                  Долучитись » ВПРИТУЛ «
                </Button>,
                <Button
                  variant="primary"
                  theme="special"
                  showLeftIcon={false}
                  disabled
                >
                  Долучитись » ВПРИТУЛ «
                </Button>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Contact"
        description="variant=contact — email/phone chips (Figma ContactLink), fluid width, renders as &lt;a&gt;."
      >
        <ShowcaseMatrix
          columns={["Email", "Phone"]}
          rows={[
            {
              rowLabel: "Dark",
              cells: [
                <Button
                  variant="contact"
                  theme="dark"
                  contactType="email"
                  href="mailto:info@prytula.org"
                >
                  info@prytula.org
                </Button>,
                <Button
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
                <div className={styles.onDark}>
                  <Button
                    variant="contact"
                    theme="light"
                    contactType="email"
                    href="mailto:info@prytula.org"
                  >
                    info@prytula.org
                  </Button>
                </div>,
                <div className={styles.onDark}>
                  <Button
                    variant="contact"
                    theme="light"
                    contactType="phone"
                    contactLabel="Гаряча лінія:"
                    href="tel:+380000000000"
                  >
                    0 800 000 000
                  </Button>
                </div>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Social"
        description="variant=social — Figma SocialLink, 44px icon-only (Facebook). Hover — наведи курсор."
      >
        <ShowcaseMatrix
          columns={["Dark", "Light"]}
          rows={[
            {
              cells: [
                <Button
                  variant="social"
                  theme="dark"
                  socialNetwork="facebook"
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                />,
                <div className={styles.onDark}>
                  <Button
                    variant="social"
                    theme="light"
                    socialNetwork="facebook"
                    href="https://www.facebook.com/"
                    aria-label="Facebook"
                  />
                </div>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Nav"
        description="variant=nav — Figma NavBatton (state=Disabled). Hover — наведи курсор."
      >
        <ShowcaseMatrix
          columns={["Default", "Hover", "Disabled", "Active"]}
          rows={[
            {
              rowLabel: "Outline",
              cells: [
                <Button variant="nav" navAppearance="outline">
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="outline">
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="outline" disabled>
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="outline" active>
                  попередня
                </Button>,
              ],
            },
            {
              rowLabel: "Ghost",
              cells: [
                <Button variant="nav" navAppearance="ghost">
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="ghost">
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="ghost" disabled>
                  попередня
                </Button>,
                <Button variant="nav" navAppearance="ghost" active>
                  попередня
                </Button>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Disabled">
        <ShowcaseMatrix
          columns={["Primary light", "Primary dark", "Secondary dark", "Secondary light"]}
          rows={[
            {
              cells: [
                <Button variant="primary" theme="light" disabled>
                  Підтримати
                </Button>,
                <Button variant="primary" theme="dark" disabled>
                  Підтримати
                </Button>,
                <Button variant="secondary" theme="dark" disabled>
                  Дізнатись більше
                </Button>,
                <div className={styles.onDark}>
                  <Button variant="secondary" theme="light" disabled>
                    Дізнатись більше
                  </Button>
                </div>,
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="With icons">
        <ShowcaseMatrix
          columns={["Ліва", "Права", "Обидві", "Без іконок"]}
          rows={[
            {
              cells: [
                <Button variant="primary" theme="light" showLeftIcon showRightIcon={false}>
                  Ліва іконка
                </Button>,
                <Button variant="primary" theme="light" showLeftIcon={false} showRightIcon>
                  Права іконка
                </Button>,
                <Button variant="primary" theme="light">
                  Обидві
                </Button>,
                <Button
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
      </ShowcaseSection>

      <ShowcaseSection title="Tokens used">
        <ShowcaseTokensList tokens={TOKENS_USED} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Guidelines"
        description="Коли і як використовувати Button"
      >
        <ShowcaseDoDont
          do={[
            "Primary Light — для основної дії на світлому фоні (Заповнити форму, Підтримати)",
            "Primary Dark — для основної дії на темному фоні",
            "Secondary — другорядні дії поряд з primary",
            "Special — лише для головного donate CTA",
            "Contact — email/phone на футері (mailto: / tel:)",
            "Nav — пагінація каруселі; Social — icon-only з aria-label",
          ]}
          dont={[
            "Не використовуй два Primary поруч",
            "Не використовуй Special для будь-чого крім donate",
            "Не використовуй Contact як звичайну action-кнопку",
            "Не змінюй padding/height без нового токена в Figma",
            "Не клади текст довший за 30 символів",
          ]}
        />
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
