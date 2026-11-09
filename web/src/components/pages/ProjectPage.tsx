import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { Breadcrumbs } from "../../design-system/Breadcrumbs";
import { GeneralWidget } from "../../design-system/GeneralWidget";
import type { GeneralWidgetPaymentTab } from "../../design-system/GeneralWidget";
import { IconChevronDown } from "../../design-system/Icons";
import { Menu } from "../../design-system/Menu";
import { publicAssetUrl } from "../../lib/publicAssetUrl";
import {
  GENERAL_WIDGET_SCROLL_RANGE,
  GENERAL_WIDGET_TABLET_COLLAPSED_H,
} from "../../design-system/GeneralWidget/generalWidgetScroll";
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

type Rect = { x: number; y: number; w: number; h: number };

/** Compact-смуга (Figma 1107:26076): padding 16 + border 1, мініатюра 74×95. */
const THUMB_FALLBACK: Rect = { x: 17, y: 17, w: 74, h: 95 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function smooth(value: number, start: number, end: number): number {
  const x = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return x * x * (3 - 2 * x);
}

/** Фото віджета (hero / мініатюра) — перший видимий <img> з обкладинкою. */
function findPhoto(root: HTMLElement): HTMLImageElement | null {
  const images = root.querySelectorAll<HTMLImageElement>('img[src*="general-widget-chyste-nebo-thumb"]');
  for (const img of images) {
    if (img.getBoundingClientRect().width > 0) return img;
  }
  return null;
}

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

  const [currency, setCurrency] = useState("UAH");
  const morphProgress = Math.min(1, Math.max(0, offset / GENERAL_WIDGET_SCROLL_RANGE));
  /* Секвенція: контент зникає 0–0.3 → фото їде 0.2–0.8 → compact-контент з'являється 0.7–1. */
  const fullOut = smooth(morphProgress, 0, 0.3);
  const photoP = smooth(morphProgress, 0.12, 0.88);
  const compactIn = smooth(morphProgress, 0.7, 1);
  const fullWidgetHeight = useRef<number | null>(null);
  const widgetSlotRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const compactLayerRef = useRef<HTMLDivElement>(null);
  const heroRect = useRef<Rect | null>(null);
  const thumbRect = useRef<Rect>(THUMB_FALLBACK);

  /* Висота та кадр hero повного віджета (t=0) — база для shared-element морфу фото. */
  useEffect(() => {
    const node = widgetSlotRef.current;
    if (!node || morphProgress !== 0) return;
    const sync = () => {
      fullWidgetHeight.current = node.offsetHeight;
      const box = node.getBoundingClientRect();
      const photo = findPhoto(node);
      if (photo) {
        const r = photo.getBoundingClientRect();
        heroRect.current = { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
      }
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, [morphProgress, isTablet, paymentTab]);

  /* Кадр мініатюри в compact-шарі — кінцева точка морфу фото. */
  useLayoutEffect(() => {
    const layer = compactLayerRef.current;
    const wrap = morphRef.current;
    if (!layer || !wrap) return;
    const photo = findPhoto(layer);
    if (!photo) return;
    const box = wrap.getBoundingClientRect();
    const r = photo.getBoundingClientRect();
    thumbRect.current = { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
  });

  const from = heroRect.current ?? { x: 0, y: 0, w: 0, h: 0 };
  const to = thumbRect.current;
  const photoStyle: CSSProperties = {
    left: lerp(from.x, to.x, photoP),
    top: lerp(from.y, to.y, photoP),
    width: lerp(from.w, to.w, photoP),
    height: lerp(from.h, to.h, photoP),
    borderRadius: lerp(12, 6, photoP),
  };

  const renderWidget = (scrollOffset: number) => (
    <GeneralWidget
      layout="article"
      articleColumn={isTablet ? "tablet" : "mobile"}
      articleScrollOffset={scrollOffset}
      articleScrollNaturalLayout
      articleHero={isTablet}
      articleStableTabs
      showSubscriptionTab={isTablet}
      onScrollToFull={scrollToTop}
      progress={PROGRESS}
      hero={{ src: HERO, alt: "Чисте небо" }}
      paymentTab={paymentTab}
      onPaymentTabChange={setPaymentTab}
      amount={amount}
      onAmountChange={setAmount}
      currency={currency}
      onCurrencyChange={setCurrency}
      onQuickAmountClick={(value) => setAmount(String(value))}
    />
  );


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
          {isTablet && morphProgress > 0 && morphProgress < 1 ? (
            /*
             * Subordinate motion: фото — єдиний головний об'єкт, що безперервно їде з hero
             * в мініатюру. Решта контенту спершу зникає, а після «приземлення» фото — з'являється.
             */
            <div
              ref={morphRef}
              className={styles.widgetMorph}
              style={{
                height: Math.round(
                  lerp(
                    fullWidgetHeight.current ?? GENERAL_WIDGET_TABLET_COLLAPSED_H,
                    GENERAL_WIDGET_TABLET_COLLAPSED_H,
                    photoP,
                  ),
                ),
              }}
            >
              <div
                ref={compactLayerRef}
                className={`${styles.widgetLayer} ${styles.widgetLayerHidePhoto}`}
                style={{ opacity: compactIn }}
              >
                {renderWidget(GENERAL_WIDGET_SCROLL_RANGE)}
              </div>
              <div
                className={`${styles.widgetLayer} ${styles.widgetLayerTop} ${styles.widgetLayerHidePhoto}`}
                style={{ opacity: 1 - fullOut }}
              >
                {renderWidget(0)}
              </div>
              <img
                className={styles.morphPhoto}
                src={HERO}
                alt=""
                aria-hidden
                style={photoStyle}
              />
            </div>
          ) : (
            <div ref={widgetSlotRef}>
              {renderWidget(
                isTablet
                  ? morphProgress >= 1
                    ? GENERAL_WIDGET_SCROLL_RANGE
                    : 0
                  : easeInOutCubic(morphProgress) * GENERAL_WIDGET_SCROLL_RANGE,
              )}
            </div>
          )}
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
