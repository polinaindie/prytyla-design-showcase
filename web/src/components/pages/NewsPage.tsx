import { useState } from "react";
import styles from "./NewsPage.module.css";
import { assets } from "../../figmaAssets";

const FILTER_TAGS = [
  "Усі новини",
  "Проєкти",
  "Допомога армії",
  "Допомога медзакладам",
  "Допомога цивільним",
  "Команда",
  "Партнерства",
  "Такмед",
  "Гуманітарна допомога",
  "Ініціативи",
] as const;

type GridNews = {
  image: string;
  date: string;
  category: string;
  title: string;
  tag?: string;
};

const GRID_NEWS: GridNews[] = [
  {
    image: assets.newsThumbA,
    date: "11/08/2025",
    category: "Проєкт",
    title:
      "Фонд Сергія Притули представив звіт про ефективні підходи до знеболення поранених",
    tag: "WOGОНЬ Допомоги. Загін роботів 2.0",
  },
  {
    image: assets.newsThumbB,
    date: "11/08/2025",
    category: "Такмед",
    title: "Семінар «Кров: Система. Досвід. Перспектива»",
    tag: "Тактична медицина",
  },
  {
    image: assets.newsThumbC,
    date: "11/08/2025",
    category: "Проєкт",
    title:
      "Завершено проєкт WOGОНЬ Допомоги. Загін роботів 2.0",
    tag: "WOGОНЬ Допомоги. Антишахед",
  },
  {
    image: assets.newsThumbD,
    date: "11/08/2025",
    category: "Партнерства",
    title:
      "Благодійний фонд Сергія Притули повідомляє про зміну формату співпраці з розробником прошивки 1001",
    tag: "1001",
  },
  {
    image: assets.newsThumbA,
    date: "11/08/2025",
    category: "Проєкт",
    title:
      "Фонд Сергія Притули завершив проєкт «Безпека UA»: 7 роботизованих комплексів «Змій» для ДСНС та національна медіакампанія",
    tag: "Безпека UA",
  },
  {
    image: assets.newsThumbE,
    date: "11/08/2025",
    category: "Партнерства",
    title:
      "Благодійний Фонд Сергія Притули та чеський «Dárek pro putina» підбили підсумки 10 місяців співпраці",
    tag: "Dárek pro putina",
  },
];

export function NewsPage() {
  const [activeTag, setActiveTag] = useState(0);
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.menuBar}>
            <div className={styles.menuLeft}>
              <button
                type="button"
                className={styles.menuToggle}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className={styles.menuToggleLines} aria-hidden />
              </button>
              <span className={styles.logo}>БФ Сергія Притули</span>
            </div>

            <nav className={`${styles.nav} ${styles.navDesktop}`} aria-label="Головна навігація">
              <a className={styles.navItem} href="#projects">
                Проєкти
              </a>
              <a className={styles.navItem} href="#reporting">
                Звітність
              </a>
              <a className={styles.navItem} href="#about">
                Про фонд
                <img className={styles.chevron} src={assets.newsFundChevron} alt="" />
              </a>
              <a className={styles.navItem} href="#news">
                Новини
              </a>
              <a className={styles.navItem} href="#partnership">
                Партнерства
              </a>
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

      {mobileOpen ? (
        <>
          <button
            type="button"
            className={styles.mobileBackdrop}
            aria-label="Закрити меню"
            onClick={() => setMobileOpen(false)}
          />
          <div id="mobile-nav" className={styles.mobileNav} role="dialog" aria-modal="true">
            <a className={styles.navItem} href="#projects" onClick={() => setMobileOpen(false)}>
              Проєкти
            </a>
            <a className={styles.navItem} href="#reporting" onClick={() => setMobileOpen(false)}>
              Звітність
            </a>
            <a className={styles.navItem} href="#about" onClick={() => setMobileOpen(false)}>
              Про фонд
            </a>
            <a className={styles.navItem} href="#news" onClick={() => setMobileOpen(false)}>
              Новини
            </a>
            <a className={styles.navItem} href="#partnership" onClick={() => setMobileOpen(false)}>
              Партнерства
            </a>
          </div>
        </>
      ) : null}

      <main className={styles.mainPadTop}>
        <div className={styles.shell}>
          <section className={styles.hero} aria-labelledby="news-hero-title">
            <div className={styles.heroCopy}>
              <h1 id="news-hero-title" className={styles.heroTitle}>
                Новини
              </h1>
              <p className={styles.heroBody}>
                Важливі новини з приводу зборів та напрямів діяльності фонду, анонси та інші матеріали
                від фонду
              </p>
            </div>
            <div className={styles.heroAside}>
              <a href="#humanitarian-news" className={styles.heroCard}>
                <img
                  className={styles.heroCardIcon}
                  src={assets.newsHeroHumanitarian}
                  alt=""
                />
                <p className={styles.heroCardTitle}>
                  Новини гуманітарного
                  <br />
                  напрямку
                </p>
                <img className={styles.heroCardArrow} src={assets.newsHeroCardArrow} alt="" />
              </a>
              <a href="#civilian-news" className={styles.heroCard}>
                <img className={styles.heroCardIcon} src={assets.newsHeroCivilian} alt="" />
                <p className={styles.heroCardTitle}>Новини Центру готовності цивільних</p>
                <img className={styles.heroCardArrow} src={assets.newsHeroCardArrow} alt="" />
              </a>
            </div>
          </section>

          <div className={styles.toolbar}>
            <div className={styles.tags} role="tablist" aria-label="Фільтри новин">
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
          </div>

          <section aria-label="Головна новина">
            <div className={styles.featured}>
              <div className={styles.featuredCopy}>
                <div className={styles.featuredInner}>
                  <div className={styles.metaRow}>
                    <span>11/08/2025</span>
                    <img className={styles.metaDot} src={assets.newsMetaDot} alt="" />
                    <span>Гуманітарна допомога</span>
                  </div>
                  <h2 className={styles.featuredTitle}>
                    Завершено проєкт «Безпека UA: гуманітарне розмінування та готовність цивільних»
                  </h2>
                  <div className={styles.tagRow}>
                    <span className={styles.softTag}>Розмінування</span>
                    <span className={styles.softTag}>Цивільний захист</span>
                  </div>
                </div>
              </div>
              <div className={styles.featuredMedia}>
                <img src={assets.newsFeatured} alt="" />
              </div>
            </div>
            <div className={styles.carouselDots}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.carouselDot} ${carouselSlide === i ? styles.carouselDotActive : ""}`}
                  aria-label={`Слайд ${i + 1}`}
                  onClick={() => setCarouselSlide(i)}
                />
              ))}
            </div>
          </section>

          <section className={styles.newsGrid} aria-label="Інші новини">
            {GRID_NEWS.map((item) => (
              <a key={item.title} href="#article" className={styles.newsCard}>
                <div className={styles.newsCardThumb}>
                  <img src={item.image} alt="" />
                </div>
                <div className={styles.newsCardBody}>
                  <div>
                    <div className={styles.metaRow}>
                      <span>{item.date}</span>
                      <img className={styles.metaDot} src={assets.newsMetaDot} alt="" />
                      <span>{item.category}</span>
                    </div>
                    <h3 className={styles.newsCardTitle}>{item.title}</h3>
                  </div>
                  {item.tag ? <span className={styles.softTag}>{item.tag}</span> : null}
                </div>
              </a>
            ))}
          </section>

          <nav className={styles.pagination} aria-label="Сторінки новин">
            <button type="button" className={`${styles.arrowBtn} ${styles.arrowPrev}`} aria-label="Попередня сторінка">
              <img src={assets.newsPaginationPrev} alt="" />
            </button>
            <button
              type="button"
              className={`${styles.pageBtn} ${page === 1 ? styles.pageBtnActive : ""}`}
              aria-current={page === 1 ? "page" : undefined}
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(2)}>
              2
            </button>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(3)}>
              3
            </button>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(4)}>
              4
            </button>
            <span className={styles.paginationEllipsis} aria-hidden>
              ...
            </span>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(128)}>
              128
            </button>
            <button type="button" className={styles.arrowBtn} aria-label="Наступна сторінка">
              <img src={assets.newsPaginationNext} alt="" />
            </button>
          </nav>
        </div>

        <div className={styles.footerWrap}>
          <div className={styles.footerCtaRow}>
            <h2 className={styles.footerCtaTitle}>Підсилюй Сили Оборони</h2>
            <div className={styles.footerCtaInner}>
              <p className={styles.footerCtaText}>
                Твій донат сьогодні — це знищений ворог завтра.
                <br />
                Долучайся до забезпечення військових необхідною технікою прямо зараз.
              </p>
              <button type="button" className={styles.btnOrange}>
                Допомогти війську
              </button>
            </div>
          </div>

          <div className={styles.footerCard}>
            <div className={styles.footerTop}>
              <span className={styles.footerLogo}>Благодійний фонд Сергія Притули</span>
              <div className={styles.socials}>
                <button type="button" className={styles.socialBtn} aria-label="Facebook">
                  <img src={assets.newsSocialFb} alt="" />
                </button>
                <button type="button" className={styles.socialBtn} aria-label="Instagram">
                  <img src={assets.newsSocialIg} alt="" />
                </button>
                <button type="button" className={styles.socialBtn} aria-label="Telegram">
                  <img src={assets.footerSocial3} alt="" />
                </button>
                <button type="button" className={styles.socialBtn} aria-label="X">
                  <img src={assets.newsSocialX} alt="" />
                </button>
                <button type="button" className={styles.socialBtn} aria-label="LinkedIn">
                  <img src={assets.newsSocialLiIcon} alt="" />
                </button>
                <button type="button" className={styles.socialBtn} aria-label="YouTube">
                  <img src={assets.newsSocialYt} alt="" />
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
                  <img src={assets.newsFooterPhoneFrame} alt="" width={20} height={20} />
                  <span>
                    <span className={styles.contactChipLight}>Гаряча лінія: </span>
                    <strong>0800 300 114</strong>
                  </span>
                </div>
                <div className={styles.contactChip}>
                  <img src={assets.newsFooterMailFrame} alt="" width={20} height={20} />
                  <strong>info@prytulafoundation.org</strong>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              © {new Date().getFullYear()} Благодійний фонд Сергія Притули. Всі права захищені.
            </p>
            <div className={styles.credit}>
              <img src={assets.newsCreditPartner} alt="" height={20} />
              <img src={assets.newsCreditOpenTech} alt="Open Tech" height={20} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
