import { Button } from "../../design-system/Button";
import { ShowcaseGrid } from "../primitives/ShowcaseGrid";
import { ShowcasePageLayout } from "../primitives/ShowcasePageLayout";
import { ShowcaseSection } from "../primitives/ShowcaseSection";
import styles from "./ButtonShowcase.module.css";

const TOKENS_USED = [
  "Layout: --size-4xlarge, --space-small, --space-2xlarge, --radius-round",
  "Primary light: --surface-action, --surface-action-hover, --text-on-action",
  "Primary dark: --surface-primary, --text-on-primary",
  "Secondary: --border-inverse, --border-strong, --border-width-small",
  "Disabled: --surface-disabled, --text-disabled",
  "Special default: --surface-primary + linear gradient #FDD07F → --accent-secondary (border, text, icons)",
  "Special hover: radial gradient rgba(255,255,255,0.68) → --accent-secondary; --text-default",
  "Contact light: --surface-contact-subtle, --surface-contact-subtle-hover, --text-inverse",
  "Contact dark: --border-contact, --text-link, hover --surface-default",
  "Contact layout: --space-medium/large/2xlarge, --radius-round, --size-medium (icon)",
  "Nav: --size-2xlarge height, Icon/10 Arrow-Left/Right (Figma export), --border-default, --text-default",
  "Nav outline hover: --surface-subtle-neutral; active: --border-strong, --border-width-medium",
  "Nav ghost hover: underline on label; disabled: --text-disabled",
  "Social light: --surface-contact-subtle/hover; Social dark: --border-contact, hover --surface-default",
  "Social: --size-4xlarge circle, --size-large icon, --radius-round",
  "Typography: --pryt-brand-font-size-300, Inter",
  "Button icons: IconMenu, IconArrowUpRight from design-system/Icons (Figma export)",
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
        <ShowcaseGrid columns={2}>
          <div className={styles.row}>
            <Button variant="primary" theme="light">
              Підтримати
            </Button>
            <Button variant="primary" theme="dark">
              Підтримати
            </Button>
          </div>
          <div className={styles.row}>
            <Button variant="secondary" theme="dark">
              Дізнатись більше
            </Button>
            <div className={styles.onDark}>
              <Button variant="secondary" theme="light">
                Дізнатись більше
              </Button>
            </div>
          </div>
        </ShowcaseGrid>
      </ShowcaseSection>

      <ShowcaseSection
        title="Special"
        description="primary + special — градієнт на stroke, текст і іконки (default); radial hover з Figma."
      >
        <div className={styles.row}>
          <Button variant="primary" theme="special" showLeftIcon={false}>
            Долучитись » ВПРИТУЛ «
          </Button>
          <Button variant="primary" theme="special" showLeftIcon={false} disabled>
            Долучитись » ВПРИТУЛ «
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Contact"
        description="variant=contact — email/phone chips (Figma ContactLink), fluid width, renders as &lt;a&gt;."
      >
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
            variant="contact"
            theme="dark"
            contactType="phone"
            contactLabel="Гаряча лінія:"
            href="tel:+380000000000"
          >
            0 800 000 000
          </Button>
        </div>
        <div className={styles.onDark}>
          <div className={styles.row}>
            <Button
              variant="contact"
              theme="light"
              contactType="email"
              href="mailto:info@prytula.org"
            >
              info@prytula.org
            </Button>
            <Button
              variant="contact"
              theme="light"
              contactType="phone"
              contactLabel="Гаряча лінія:"
              href="tel:+380000000000"
            >
              0 800 000 000
            </Button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Social"
        description="variant=social — Figma SocialLink, 44px icon-only (Facebook). Hover — наведи курсор."
      >
        <div className={styles.row}>
          <div className={styles.navCell}>
            <span className={styles.navCaption}>Dark · Default</span>
            <Button
              variant="social"
              theme="dark"
              socialNetwork="facebook"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            />
          </div>
        </div>
        <div className={styles.onDark}>
          <div className={styles.row}>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Light · Default</span>
              <Button
                variant="social"
                theme="light"
                socialNetwork="facebook"
                href="https://www.facebook.com/"
                aria-label="Facebook"
              />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Nav"
        description="variant=nav — Figma NavBatton (state=Disabled). Hover — наведи курсор."
      >
        <div className={styles.navMatrix}>
          <div className={styles.navRow}>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Outline · Default</span>
              <Button variant="nav" navAppearance="outline">
                попередня
              </Button>
            </div>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Outline · Hover</span>
              <Button variant="nav" navAppearance="outline">
                попередня
              </Button>
            </div>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Outline · Disabled</span>
              <Button variant="nav" navAppearance="outline" disabled>
                попередня
              </Button>
            </div>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Outline · Active</span>
              <Button variant="nav" navAppearance="outline" active>
                попередня
              </Button>
            </div>
          </div>
          <div className={styles.navRow}>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Ghost · Default</span>
              <Button variant="nav" navAppearance="ghost">
                попередня
              </Button>
            </div>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Ghost · Hover</span>
              <Button variant="nav" navAppearance="ghost">
                попередня
              </Button>
            </div>
            <div className={styles.navCell}>
              <span className={styles.navCaption}>Ghost · Disabled</span>
              <Button variant="nav" navAppearance="ghost" disabled>
                попередня
              </Button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Disabled">
        <div className={styles.row}>
          <Button variant="primary" theme="light" disabled>
            Підтримати
          </Button>
          <Button variant="primary" theme="dark" disabled>
            Підтримати
          </Button>
          <Button variant="secondary" theme="dark" disabled>
            Дізнатись більше
          </Button>
          <div className={styles.onDark}>
            <Button variant="secondary" theme="light" disabled>
              Дізнатись більше
            </Button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With icons">
        <div className={styles.row}>
          <Button variant="primary" theme="light" showLeftIcon showRightIcon={false}>
            Ліва іконка
          </Button>
          <Button variant="primary" theme="light" showLeftIcon={false} showRightIcon>
            Права іконка
          </Button>
          <Button variant="primary" theme="light">
            Обидві
          </Button>
          <Button
            variant="primary"
            theme="light"
            showLeftIcon={false}
            showRightIcon={false}
          >
            Без іконок
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tokens used">
        <ul className={styles.tokenList}>
          {TOKENS_USED.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </ShowcaseSection>

      <ShowcaseSection
        title="Guidelines"
        description="Коли і як використовувати Button"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-large)",
          }}
        >
          <div
            style={{
              padding: "var(--space-large)",
              background: "var(--surface-subtle-info)",
              borderRadius: "var(--radius-large)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                marginBottom: "var(--space-small)",
              }}
            >
              ✓ Do
            </p>
            <ul>
              <li>
                Primary Light — для основної дії на світлому фоні (Заповнити
                форму, Підтримати)
              </li>
              <li>Primary Dark — для основної дії на темному фоні</li>
              <li>Secondary — другорядні дії поряд з primary</li>
              <li>
                Special — лише для головного donate CTA (унікальний візуальний
                акцент)
              </li>
              <li>
                Contact — email/phone на футері та темних секціях (mailto: /
                tel:)
              </li>
              <li>
                Nav — «попередня» / «наступна» у каруселях (outline на світлому
                фоні, ghost без рамки)
              </li>
              <li>
                Social — іконка соцмережі у футері (theme=dark на світлому фоні,
                theme=light на темному)
              </li>
            </ul>
          </div>

          <div
            style={{
              padding: "var(--space-large)",
              background: "var(--surface-subtle-accent)",
              borderRadius: "var(--radius-large)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                marginBottom: "var(--space-small)",
              }}
            >
              ✗ Don't
            </p>
            <ul>
              <li>
                Не використовуй два Primary поруч — оберіть один primary +
                secondary
              </li>
              <li>
                Не використовуй Special для будь-чого крім donate — це
                особлива форма
              </li>
              <li>
                Не використовуй Contact як звичайну action-кнопку — це лінк-чіп,
                не primary CTA
              </li>
              <li>
                Не використовуй Nav для основних CTA — лише пагінація /
                навігація слайдера
              </li>
              <li>
                Не використовуй Social як текстову кнопку — лише icon-only з
                aria-label
              </li>
              <li>
                Не змінюй padding/height — вони фіксовані за дизайн-системою
              </li>
              <li>
                Не клади текст довший за 30 символів — використай інший
                компонент
              </li>
            </ul>
          </div>
        </div>
      </ShowcaseSection>
    </ShowcasePageLayout>
  );
}
