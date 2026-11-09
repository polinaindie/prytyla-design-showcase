import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Breadcrumbs } from "../../design-system/Breadcrumbs";
import { GeneralWidget } from "../../design-system/GeneralWidget";
import type { GeneralWidgetPaymentTab } from "../../design-system/GeneralWidget";
import { IconChevronDown } from "../../design-system/Icons";
import { Menu } from "../../design-system/Menu";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import { useProjectPageScroll } from "./useProjectPageScroll";
import styles from "./ProjectPage.module.css";

/**
 * Figma «Project Page_1» 2556:46382 (mobile 375) · scroll state «Project Page On Scroll» 1107:24675.
 * Меню ховається при скролі вниз і з'являється над breadcrumbs + віджетом при скролі вгору;
 * breadcrumbs і GeneralWidget (layout=article) лишаються sticky, контент проїжджає під ними.
 */

const HERO = publicAssetUrl("/images/general-widget-chyste-nebo-thumb.png");
const IMG_CAR = publicAssetUrl("/images/project-page/donation-car.png");
const IMG_VIDEO = publicAssetUrl("/images/project-page/donation-video.png");
const IMG_PROJECT_HERO = publicAssetUrl("/images/project-page/project-hero-image.png");
const IMG_QUOTE_AUTHOR = publicAssetUrl("/images/project-page/quote-author.png");

const BREADCRUMBS = [
  { label: "Головна", href: "/" },
  { label: "Активні проєкти", href: "/projects" },
  { label: "Чисте небо" },
];

const PROGRESS = {
  value: 69,
  title: "Чисте небо",
  thumbnailSrc: HERO,
  thumbnailAlt: "Чисте небо — збір на перехоплювачі ворожих БПЛА",
  collectedAmount: "48 388 780 ₴",
  goalAmount: "20 000 000 ₴",
};

const STATS = [
  { title: "60+ хв в повітрі", text: "В режимі патрулювання чи перехоплення цілі" },
  {
    title: "35+ км зв’язок",
    text: "Далекобійний захищений цифровий відео звʼязок на відстані 35+ км",
  },
  { title: "160 км/год швидкість", text: "Максимальна швидкість польоту 160 км/год" },
  { title: "Вдень та вночі", text: "Працюють вдень та вночі" },
];

/** Figma Tablet 768 (Project Page Tablet 947:11310) — від 48rem; нижче — мобільний макет 375. */
const TABLET_QUERY = "(min-width: 48rem)";

function subscribeTablet(onChange: () => void) {
  const mq = window.matchMedia(TABLET_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useIsTablet(): boolean {
  return useSyncExternalStore(
    subscribeTablet,
    () => window.matchMedia(TABLET_QUERY).matches,
    () => false,
  );
}

export function ProjectPage() {
  const isTablet = useIsTablet();
  const menuRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentTab, setPaymentTab] = useState<GeneralWidgetPaymentTab>("once");
  const [amount, setAmount] = useState("");

  const { offset, menuVisible, scrolledPastFold } = useProjectPageScroll({
    menuLocked: mobileMenuOpen,
  });

  /* Висота меню відрізняється mobile/tablet — sticky-блок та відступ беруть реальну. */
  useEffect(() => {
    const menu = menuRef.current;
    const page = pageRef.current;
    if (!menu || !page) return;
    const sync = () => page.style.setProperty("--project-menu-h", `${menu.offsetHeight}px`);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(menu);
    return () => observer.disconnect();
  }, [isTablet]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div ref={pageRef} className={styles.page}>
      <header
        ref={menuRef}
        className={[styles.menu, menuVisible ? "" : styles.menuHidden]
          .filter(Boolean)
          .join(" ")}
      >
        <Menu
          size={isTablet ? "tablet" : "mobile"}
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
        />
      </header>

      <main
        className={[styles.content, menuVisible ? styles.menuShown : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.pinned}>
          <Breadcrumbs items={BREADCRUMBS} />
          <GeneralWidget
            layout="article"
            articleColumn={isTablet ? "tablet" : "mobile"}
            articleScrollOffset={offset}
            articleScrollNaturalLayout
            articleHero={isTablet}
            showSubscriptionTab={isTablet}
            onScrollToFull={scrollToTop}
            progress={PROGRESS}
            hero={{ src: HERO, alt: "Чисте небо" }}
            paymentTab={paymentTab}
            onPaymentTabChange={setPaymentTab}
            amount={amount}
            onAmountChange={setAmount}
            onQuickAmountClick={(value) => setAmount(String(value))}
          />
        </div>

        <div className={styles.sections}>
          <section className={styles.heroBlock} aria-labelledby="project-title">
            <h1 id="project-title" className={styles.h1}>
              Чисте небо
            </h1>
            <p className={styles.lead}>
              Збір на літаки-перехоплювачі, що нищать ворожі розвідувальні та ударні дрони в
              прифронових містах та на лінії бойового зіткнення.
            </p>

            <div className={styles.donationNote}>
              <div className={styles.noteBody}>
                <p className={styles.noteTitle}>
                  Кожен <span className={styles.noteAccent}>твій донат кратний 33₴ </span>
                  збільшує шанси виграти
                  <br />
                  FORD KUGA від WINNER
                </p>
                <div className={styles.noteText}>
                  <p>
                    До 33-го дня народження нашого партнера Winner розігруємо авто від нього для
                    підсилення проєкту.
                  </p>
                  <p>
                    Участь в розіграші беруть донати на Монобанку збору з 19.11.2025 до 19.02.2026.
                  </p>
                  <p>
                    Детальніше про розіграш:{" "}
                    <a className={styles.noteLink} href="#rules">
                      Правила проведення акції
                    </a>
                  </p>
                </div>
              </div>
              <img className={styles.noteCar} src={IMG_CAR} alt="Ford Kuga" />
            </div>

            <img className={styles.video} src={IMG_VIDEO} alt="Ford за 33₴ — розіграш від Winner" />
          </section>

          <section className={styles.why} aria-labelledby="why-title">
            <div className={styles.whyHeading}>
              <h2 id="why-title" className={styles.h3}>
                Чому це важливо
              </h2>
              <p className={styles.body}>
                Російські дрони щодня атакують українські міста, об’єкти енергетики та критичної
                інфраструктури.
                <br />
                Пілоти-перехоплювачі дозволяють знищувати БПЛА ще в повітрі, зменшуючи кількість
                влучань і руйнувань.
              </p>
            </div>

            <figure className={styles.quote}>
              <span className={styles.quoteMark} aria-hidden>
                “
              </span>
              <blockquote className={styles.quoteText}>
                Відсутність ворожих БПЛА зараз дуже сильно відчувається на низці секторів. Ми бачимо
                роботу наших крил: адже артилерія почала нарешті нормально працювати, ситуація з
                переміщенням війсь і логістичними шляхами теж стала кращою
              </blockquote>
              <figcaption className={styles.quoteAuthor}>
                <span className={styles.quoteName}>БОГДАН ДАНИЛІВ</span>
                <span className={styles.quoteRole}>
                  керівник мілітарного департаменту
                  <br />
                  Фонду Сергія Притули
                </span>
              </figcaption>
              <img className={styles.quotePhoto} src={IMG_QUOTE_AUTHOR} alt="Богдан Данилів" />
            </figure>

            <div className={styles.description}>
              <h3 className={styles.h4}>Літаки-перехоплювачі мають високі льотно-технічні показники:</h3>
              <div className={styles.body}>
                <p>
                  Пілоти-перехоплювачі дозволяють знищувати БПЛА ще в повітрі, зменшуючи кількість
                  влучань і руйнувань.
                </p>
                <p>Яка конкретна допомога буде закуплена</p>
                <p>У межах проєкту закуповуються:</p>
                <ul className={styles.list}>
                  <li>пілоти-перехоплювачі</li>
                  <li>комплектуючі до них</li>
                  <li>запасні частини для ремонту та заміни</li>
                </ul>
                <p>Це техніка з обмеженим ресурсом, яка потребує постійного оновлення.</p>
              </div>
            </div>

            <ul className={styles.stats}>
              {STATS.map((stat) => (
                <li key={stat.title} className={styles.stat}>
                  <p className={styles.statTitle}>{stat.title}</p>
                  <p className={styles.statText}>{stat.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <img className={styles.projectImage} src={IMG_PROJECT_HERO} alt="" />
        </div>
      </main>

      <button
        type="button"
        className={[styles.toTop, scrolledPastFold ? styles.toTopVisible : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label="Нагору"
        onClick={scrollToTop}
        tabIndex={scrolledPastFold ? 0 : -1}
      >
        <IconChevronDown aria-hidden className={styles.toTopIcon} />
      </button>
    </div>
  );
}
