import { Link } from "react-router-dom";
import { ShowcasePageLayout } from "./primitives";
import styles from "./ShowcaseHomePage.module.css";
import { showcasePagePath } from "./showcasePaths";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

type QuickLink = {
  label: string;
  path: string;
  hint: string;
};

const FOUNDATION_LINKS: QuickLink[] = [
  {
    label: "Colors",
    path: "colors",
    hint: "Палітра, mapped та alias токени",
  },
  {
    label: "Typography",
    path: "typography",
    hint: "Семантичні розміри та стилі тексту",
  },
  {
    label: "Spacing",
    path: "spacing",
    hint: "Шкала відступів і semantic spacing",
  },
  {
    label: "Grid",
    path: "grid",
    hint: "Сітка, контейнер і breakpoints",
  },
];

const COMPONENT_LINKS: QuickLink[] = [
  {
    label: "Button",
    path: "button",
    hint: "Primary, secondary, donate та інші варіанти",
  },
  {
    label: "Icons",
    path: "icons",
    hint: "Каталог іконок усіх розмірів",
  },
  {
    label: "Table",
    path: "table",
    hint: "Таблиці з сортуванням і станами",
  },
  {
    label: "Menu",
    path: "menu",
    hint: "Навігація сайту та header",
  },
];

function QuickLinkGrid({ links }: { links: QuickLink[] }) {
  return (
    <ul className={styles.cardGrid}>
      {links.map((item) => (
        <li key={item.path}>
          <Link className={styles.cardLink} to={showcasePagePath(item.path)}>
            <span className={styles.cardLabel}>{item.label}</span>
            <span className={styles.cardHint}>{item.hint}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ShowcaseHomePage() {
  return (
    <ShowcasePageLayout
      title="Prytula Design System"
      description="Документація компонентів, токенів і патернів фонду «Повернись живим»."
      showViewportBar={false}
    >
      <div className={styles.hero}>
        <p className={styles.lead}>
          Оберіть розділ у боковому меню або скористайтесь швидкими посиланнями
          нижче. Тут зібрано foundations, компоненти, cards і composite-блоки з
          Figma Prytula-Responsive.
        </p>

        <h2 className={styles.sectionTitle}>Foundations</h2>
        <QuickLinkGrid links={FOUNDATION_LINKS} />

        <h2 className={styles.sectionTitle}>Components</h2>
        <QuickLinkGrid links={COMPONENT_LINKS} />

        <a
          className={styles.figmaLink}
          href={FIGMA_FILE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Відкрити Figma Prytula-Responsive ↗
        </a>
      </div>
    </ShowcasePageLayout>
  );
}
