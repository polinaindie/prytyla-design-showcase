import { useState } from "react";
import styles from "./ProjectsPage.module.css";
import { assets } from "../../figmaAssets";

type ProjectItem = {
  title: string;
  description: string;
  images: string[];
  raised: string;
  goal: string;
  percent: number;
};

const PROJECTS: ProjectItem[] = [
  {
    title: "Щелепи",
    description:
      "Смерть приходить з неба і в неї гострі зуби. Наша ціль — зібрати 500 млн. грн на БПЛА Shark-M та високоточні українські баражуючі боєприпаси.",
    images: [assets.rect89],
    raised: "48 388 780 ₴",
    goal: "20 000 000 ₴",
    percent: 69,
  },
  {
    title: "Чисте небо",
    description:
      "Збір на літаки-перехоплювачі, що нищать ворожі розвідувальні та ударні дрони в прифронтових містах та на лінії бойового зіткнення.",
    images: [assets.rect89, assets.rect90],
    raised: "48 388 780 ₴",
    goal: "20 000 000 ₴",
    percent: 69,
  },
  {
    title: "Запали ворога",
    description:
      "21 млн на різні види дронів, РЕБи, пікапи і не тільки. Для підрозділу First Line ГУР МО України, які знищують російських окупантів як на фронті так і в їх тилу.",
    images: [assets.rect89, assets.rect91],
    raised: "48 388 780 ₴",
    goal: "20 000 000 ₴",
    percent: 69,
  },
  {
    title: "Підсвіти ворога",
    description:
      "Мета проєкту зібрати кошти на 65 відстежувально-навідних комплексів, які допоможуть мобільним вогневим групам оперативно виявляти та знищувати ворожі повітряні цілі.",
    images: [assets.rect89, assets.rect92],
    raised: "48 388 780 ₴",
    goal: "30 000 000 ₴",
    percent: 69,
  },
];

const FILTER_TAGS = [
  "Всі проєкти",
  "Зв’язок",
  "Дрони",
  "Такмед",
  "Навчання",
  "Забезпечення",
];

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        {project.images.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
      <div className={styles.cardBody}>
        <div>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <p className={styles.cardDesc}>{project.description}</p>
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${project.percent}%` }}
              />
            </div>
            <span className={styles.progressBadge}>{project.percent}%</span>
            <div className={styles.stats}>
              <div>
                <p className={styles.statLabel}>Зібрано</p>
                <p className={styles.statValue}>{project.raised}</p>
              </div>
              <div className={styles.statColRight}>
                <p className={styles.statLabel}>Ціль</p>
                <p className={styles.statValue}>{project.goal}</p>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className={styles.btnOrange}>
          Підтримати проєкт
        </button>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const [activeTag, setActiveTag] = useState(0);
  const gridItems = Array.from({ length: 9 }, (_, i) => PROJECTS[i % PROJECTS.length]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.menuBar}>
            <span className={styles.logo}>БФ Сергія Притули</span>
            <nav className={styles.nav} aria-label="Головна навігація">
              <a href="#projects">Проєкти</a>
              <a href="#reporting">Звітність</a>
              <a href="#about">Про фонд</a>
              <a href="#news">Новини</a>
              <a href="#partnership">Партнерства</a>
            </nav>
            <div className={styles.headerActions}>
              <div className={styles.lang}>
                <img src={assets.langFlag} alt="" width={20} height={20} />
                <span>Eng</span>
              </div>
              <div className={styles.ctaRow}>
                <button type="button" className={styles.btnOutline}>
                  <span className={styles.menuIcon} aria-hidden />
                  Інші напрями
                </button>
                <button type="button" className={styles.btnSolidDark}>
                  Допомогти війську
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.shell}>
          <section className={styles.hero} aria-labelledby="hero-title">
            <div>
              <h1 id="hero-title" className={styles.heroTitle}>
                Проєкти
              </h1>
              <p className={styles.heroBody}>
                Ми реалізуємо проєкти для Сил оборони та цивільних на деокупованих і
                прифронтових територіях. Фонд працює без комісій: усі донати
                спрямовуються на Сили оборони, а роботу Фонду можна{" "}
                <span className={styles.linkInline}>підтримати</span> окремо.
              </p>
            </div>
            <div className={styles.heroAside}>
              <a href="#humanitarian" className={styles.heroCard}>
                <img
                  className={styles.heroCardIcon}
                  src={assets.heroHumanitarian}
                  alt=""
                />
                <p className={styles.heroCardTitle}>
                  Проєкти гуманітарного
                  <br />
                  напрямку
                </p>
                <img
                  className={styles.heroCardArrow}
                  src={assets.heroCardArrow}
                  alt=""
                />
              </a>
              <a href="#civilian" className={styles.heroCard}>
                <img
                  className={styles.heroCardIcon}
                  src={assets.heroCivilian}
                  alt=""
                />
                <p className={styles.heroCardTitle}>
                  Проєкти центру готовності цивільних
                </p>
                <img
                  className={styles.heroCardArrow}
                  src={assets.heroCardArrow}
                  alt=""
                />
              </a>
            </div>
          </section>

          <div className={styles.toolbar}>
            <div className={styles.tags} role="tablist" aria-label="Фільтри проєктів">
              {FILTER_TAGS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={i === activeTag}
                  className={`${styles.tag} ${i === activeTag ? styles.tagActive : ""}`}
                  onClick={() => setActiveTag(i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button type="button" className={styles.sort}>
              <span className={styles.sortLabel}>Сортування</span>
              <span className={styles.sortValue}>Активні проєкти</span>
              <svg
                className={styles.sortChevron}
                viewBox="0 0 12 8"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M1 1.5 6 6.5 11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fillOpacity="0"
                />
              </svg>
            </button>
          </div>

          <section
            id="projects"
            className={styles.grid}
            aria-label="Список проєктів"
          >
            {gridItems.map((p, i) => (
              <ProjectCard key={`${p.title}-${i}`} project={p} />
            ))}
          </section>
        </div>

        <section className={styles.partners} aria-labelledby="partners-title">
          <div className={styles.partnersInner}>
            <h2 id="partners-title" className={styles.partnersTitle}>
              Наші партнери
            </h2>
            <p className={styles.partnersIntro}>
              Фонд Сергія Притули гарантує ефективність, прозорість і швидкість
              використання ресурсів. Ми працюємо напряму, без посередників та
              зайвих затримок, аби допомога максимально швидко досягала адресата.
            </p>
            <div className={styles.partnerGrid}>
              {[
                assets.partner1,
                assets.partner2,
                assets.partner3,
                assets.partner4,
                assets.partner5,
                assets.partner6,
              ].map((src) => (
                <div key={src} className={styles.partnerCard}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
            <button type="button" className={styles.btnGhostLight}>
              Стати нашим партнером
              <img src={assets.partnerBtnArrow} alt="" width={24} height={24} />
            </button>
          </div>
        </section>

        <section className={styles.preFooter} aria-labelledby="cta-title">
          <div className={styles.preFooterInner}>
            <div>
              <h2 id="cta-title" className={styles.preFooterTitle}>
                Підсилюй Сили Оборони
              </h2>
              <p className={styles.preFooterText}>
                Твій донат сьогодні — це знищений ворог завтра.
                <br />
                Долучайся до забезпечення військових необхідною технікою прямо зараз.
              </p>
            </div>
            <button type="button" className={`${styles.btnOrange} ${styles.btnOrangeInline}`}>
              Допомогти війську
            </button>
          </div>
        </section>

        <footer className={styles.footerDark}>
          <div className={styles.shell}>
            <div className={styles.footerCard}>
              <div className={styles.footerTop}>
                <span className={styles.footerLogo}>БФ Сергія Притули</span>
                <div className={styles.socials}>
                  <button type="button" className={styles.socialBtn} aria-label="Facebook">
                    <img src={assets.footerSocial1} alt="" />
                  </button>
                  <button type="button" className={styles.socialBtn} aria-label="Instagram">
                    <img src={assets.footerSocial2} alt="" />
                  </button>
                  <button type="button" className={styles.socialBtn} aria-label="Telegram">
                    <img src={assets.footerSocial3} alt="" />
                  </button>
                </div>
              </div>
              <div className={styles.footerRule} />
              <div className={styles.footerMid}>
                <div className={styles.footerLinks}>
                  <div className={styles.footerCol}>
                    <span>Проєкти</span>
                    <span>Звітність</span>
                    <span>Про фонд</span>
                  </div>
                  <div className={styles.footerCol}>
                    <span>Новини</span>
                    <span>Партнерства</span>
                    <span>Часті питання</span>
                  </div>
                </div>
                <div>
                  <div className={styles.contactChip}>
                    <img src={assets.footerPhoneIcon} alt="" width={20} height={20} />
                    <span>
                      Гаряча лінія: <strong>0800 300 114</strong>
                    </span>
                  </div>
                  <div className={styles.contactChip}>
                    <img src={assets.footerMailIcon} alt="" width={20} height={20} />
                    <strong>info@prytulafoundation.org</strong>
                  </div>
                </div>
              </div>
              <div className={styles.footerBottom}>
                <p className={styles.footerCopyright}>
                  © {new Date().getFullYear()} Благодійний фонд Сергія Притули. Всі права
                  захищені.
                </p>
                <div className={styles.credit}>
                  <img src={assets.creditLogo} alt="Open Tech" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
