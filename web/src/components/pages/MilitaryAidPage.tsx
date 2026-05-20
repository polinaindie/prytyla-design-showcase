import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./MilitaryAidPage.module.css";
import { assets } from "../../figmaAssets";
import { useHowItWorksScroll } from "../../hooks/useHowItWorksScroll";
import { useScrubberLabelCenters } from "../../hooks/useScrubberLabelCenters";

const HOW_STEPS = [
  {
    num: "01",
    title: "Подання запиту",
    description: "",
  },
  {
    num: "02",
    title: "Отримання запиту",
    description: "Команда фонду отримує та реєструє ваш запит у системі.",
  },
  {
    num: "03",
    title: "Верифікація",
    description: "Перевіряємо дані підрозділу та актуальність заявлених потреб.",
  },
  {
    num: "04",
    title: "Аналіз ресурсів",
    description: "Оцінюємо наявні ресурси фонду та можливість закриття запиту.",
  },
  {
    num: "05",
    title: "Комунікація з підрозділом",
    description: "Зв’язуємось із вами для уточнення деталей та узгодження поставки.",
  },
  {
    num: "06",
    title: "Передання допомоги",
    description: "Передаємо закуплене обладнання підрозділу та фіксуємо звітність.",
  },
] as const;

type DirectionCard = {
  title: string;
  description: string;
  image: string;
  wide?: boolean;
};

const DIRECTIONS: DirectionCard[] = [
  {
    title: "БПЛА",
    description: "Розвідувальні БПЛА, ударні безпілотники, дрони-камікадзе",
    image: assets.milDirBpla,
  },
  {
    title: "Дрони",
    description: "Ряд моделей дронів брендів DJI чи Autel та FPV-дрони",
    image: assets.milDirDrones,
  },
  {
    title: "Оптичні прилади",
    description:
      "Тепловізори, прилади нічного бачення, військові біноклі, далекоміри, оптичні труби",
    image: assets.milDirOptics,
  },
  {
    title: "Засоби зв’язку",
    description: "Портативні рації, автомобільні рації, ретранслятори",
    image: assets.milDirComms,
  },
  {
    title: "Транспорт",
    description: "Броньована гусенична і колісна техніка, буси, спецтехніка, вантажівки, човни",
    image: assets.milDirTransport,
  },
  {
    title: "Тактична медицина",
    description: "Аптечки, турнікети, медичні рюкзаки, засоби зупинки кровотечі",
    image: assets.milDirTacmed,
  },
  {
    title: "Інші засоби",
    description:
      "Обладнання, необхідне підрозділам на передовій для успішного виконання бойових завдань",
    image: assets.milHeroHelmet,
    wide: true,
  },
];

const FAQ_ITEMS = [
  "Наша компанія хоче бути партнером фонду, куди звернутись?",
  "Хочемо підтримати конкретний напрям Фонду Притули.\nЩо для цього потрібно?",
  "Як отримати більше інформації про напрям чи проєкт фонду?",
  "Як я можу впевнитись, що донат від компанії буде спрямовано виключно на гуманітарну допомогу?",
  "Чи забирає Фонд Сергія Притули собі гроші з донатів партнерів на роботу фонду?",
] as const;

function MilArrowIcon({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.3051 0.211256C12.6563 0.222194 12.9389 0.504637 12.9497 0.855787L13.1596 7.71223C13.1706 8.07889 12.8827 8.38428 12.5161 8.39583C12.149 8.40711 11.8419 8.11933 11.8305 7.75227L11.6674 2.45051L1.09518 11.4163C0.815131 11.6538 0.395251 11.6201 0.157679 11.3402C-0.0798032 11.0602 -0.0449853 10.6403 0.234828 10.4027L10.7387 1.49251L5.40768 1.32942C5.04073 1.31798 4.75284 1.01087 4.76412 0.643873C4.77574 0.277096 5.08184 -0.0109236 5.44869 0.000318202L12.3051 0.211256Z"
          fill="currentColor"
          transform="translate(4.33 6.42)"
        />
      </svg>
    </span>
  );
}

function HowStepOneBody() {
  return (
    <div className={styles.howStepRich}>
      <p className={styles.howStepIntro}>Як подати заявку на отримання допомоги:</p>
      <ol className={styles.howStepList}>
        <li>
          Оформити{" "}
          <a href="#sample-request" className={styles.howStepLink}>
            офіційний запит
          </a>{" "}
          від підрозділу з переліком потреб (обов’язково з підписом та печаткою командира військової
          частини) та зробити його скан/фото.
        </li>
        <li>
          Коректно{" "}
          <a href="#request-form" className={styles.howStepLink}>
            заповнити форму
          </a>{" "}
          фонду (вказати всі необхідні деталі, контакти та прикріпити скан/фото запиту від
          командування)
        </li>
      </ol>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <a className={styles.navItem} href="#projects" onClick={onNavigate}>
        Проєкти
      </a>
      <a className={styles.navItem} href="#reporting" onClick={onNavigate}>
        Звітність
      </a>
      <a className={styles.navItem} href="#about" onClick={onNavigate}>
        Про фонд
        <img className={styles.chevron} src={assets.newsFundChevron} alt="" />
      </a>
      <a className={styles.navItem} href="#news" onClick={onNavigate}>
        Новини
      </a>
      <a className={styles.navItem} href="#partnership" onClick={onNavigate}>
        Партнерства
      </a>
    </>
  );
}

export function MilitaryAidPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const howStickyWrapRef = useRef<HTMLDivElement>(null);
  const howStickyRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLElement>(null);
  const { hostRef: howHostRef, activeStep, setSnapRef, scrollToStep } = useHowItWorksScroll({
    stepCount: HOW_STEPS.length,
  });
  const { rowRef: scrubberLabelsRef, setItemRef, getProgress, remeasure } =
    useScrubberLabelCenters(HOW_STEPS.length);

  const syncHowStageHeight = useCallback(() => {
    const host = howHostRef.current;
    const wrap = howStickyWrapRef.current;
    const snap = host?.querySelector<HTMLElement>(`.${styles.howStepSnap}`);
    if (!host || !wrap || !snap) return;

    const snapHeight = snap.offsetHeight;
    const wrapHeight = wrap.offsetHeight;
    host.style.setProperty(
      "--how-stage-min-height",
      `${HOW_STEPS.length * snapHeight + wrapHeight}px`,
    );
  }, [howHostRef]);

  useEffect(() => {
    document.documentElement.classList.add("how-scroll-snap");
    return () => document.documentElement.classList.remove("how-scroll-snap");
  }, []);

  useLayoutEffect(() => {
    remeasure();
    syncHowStageHeight();
  }, [activeStep, remeasure, syncHowStageHeight]);

  useEffect(() => {
    const wrap = howStickyWrapRef.current;
    const directions = directionsRef.current;
    if (!wrap) return;

    const observer = new ResizeObserver(() => syncHowStageHeight());
    observer.observe(wrap);
    if (directions) observer.observe(directions);

    window.addEventListener("resize", syncHowStageHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHowStageHeight);
    };
  }, [syncHowStageHeight]);

  const progressPercent = `${getProgress(activeStep) * 100}%`;

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
              <NavLinks />
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
            <NavLinks onNavigate={() => setMobileOpen(false)} />
          </div>
        </>
      ) : null}

      <main className={styles.mainPadTop}>
        <div className={styles.shell}>
          <section className={`${styles.contentWide} ${styles.hero}`} aria-labelledby="mil-hero-title">
            <div className={styles.heroCopy}>
              <h1 id="mil-hero-title" className={styles.heroTitle}>
                Подача запиту на військову допомогу
              </h1>
              <div className={styles.heroActions}>
                <a href="#sample-request" className={styles.btnOutline}>
                  Зразок офіційного запиту
                  <MilArrowIcon className={styles.btnWithArrowIcon} />
                </a>
                <a href="#request-form" className={styles.btnWithArrow}>
                  Заповнити форму з запитом
                  <MilArrowIcon className={styles.btnWithArrowIcon} />
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <img src={assets.milHeroHelmet} alt="" />
            </div>
          </section>
        </div>

        <section
          ref={howHostRef}
          className={styles.howScrollHost}
          aria-labelledby="how-title"
          style={{ "--how-step-count": HOW_STEPS.length } as React.CSSProperties}
        >
          <div className={styles.howStage}>
            <div className={styles.howPinTrack}>
              <div className={styles.howScrollSpacer} data-how-spacer aria-hidden>
                {HOW_STEPS.map((s, i) => (
                  <div key={s.num} ref={setSnapRef(i)} className={styles.howStepSnap} />
                ))}
              </div>
            </div>
            <div ref={howStickyWrapRef} className={styles.howStickyWrap}>
              <div ref={howStickyRef} className={styles.howStickyPanel}>
              <div className={styles.howTop}>
                <div className={`${styles.shell} ${styles.contentWide}`}>
                  <h2 id="how-title" className={styles.sectionTitle}>
                    Як це працює
                  </h2>
                  <div className={styles.howCard} aria-live="polite" aria-atomic="true">
              <div className={styles.howActive}>
                <span className={styles.howStepNum}>{HOW_STEPS[activeStep].num}</span>
                <div className={styles.howStepBody}>
                  <h3 className={styles.howStepTitle}>{HOW_STEPS[activeStep].title}</h3>
                  {activeStep === 0 ? (
                    <HowStepOneBody />
                  ) : (
                    <p className={styles.howStepDesc}>{HOW_STEPS[activeStep].description}</p>
                  )}
                </div>
              </div>
              <div className={styles.scrubber}>
                <div className={styles.scrubberTrack}>
                  <div className={styles.scrubberTrackBg} />
                  <div className={styles.scrubberTrackFill} style={{ width: progressPercent }} />
                  <div className={styles.scrubberThumb} style={{ left: progressPercent }}>
                    <img src={assets.milScrubberThumb} alt="" />
                  </div>
                </div>
                <div ref={scrubberLabelsRef} className={styles.scrubberLabels}>
                  {HOW_STEPS.map((s, i) => (
                    <button
                      key={s.num}
                      ref={setItemRef(i)}
                      type="button"
                      className={`${styles.scrubberLabel} ${i === activeStep ? styles.scrubberLabelActive : ""}`}
                      onClick={() => scrollToStep(i)}
                    >
                      {s.num} {s.title}
                    </button>
                  ))}
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>

              <section
                ref={directionsRef}
                id="directions"
                className={styles.directions}
                aria-labelledby="directions-title"
              >
            <div className={styles.directionsInner}>
                <aside className={styles.directionsAside}>
                  <div className={styles.directionsIntro}>
                <h2 id="directions-title" className={styles.sectionTitle}>
                  Напрями
                </h2>
                <p>
                  Нижче наведені основні напрями діяльності Мілітарного напряму, у рамках якого ми
                  здійснюємо регулярні закупівлі. Цей список не є вичерпним, та наведений з метою
                  кращої обізнаності перед поданням запиту на допомогу.
                  </p>
                  </div>
                  <a href="#request-form" className={styles.btnWithArrow}>
                    Заповнити форму з запитом
                    <MilArrowIcon className={styles.btnWithArrowIcon} />
                  </a>
                </aside>
                <div className={styles.directionsGridWrap}>
              <div className={styles.directionsGrid}>
                {DIRECTIONS.map((item) => (
                  <article
                    key={item.title}
                    className={`${styles.dirCard} ${item.wide ? styles.dirCardWide : ""}`}
                  >
                    <div className={styles.dirCardCopy}>
                      <h3 className={styles.dirCardTitle}>{item.title}</h3>
                      <p className={styles.dirCardDesc}>{item.description}</p>
                    </div>
                    <div className={styles.dirCardImg}>
                      <img src={item.image} alt="" />
                    </div>
                  </article>
                ))}
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.faqInner}>
            <aside className={styles.faqAside}>
              <h2 id="faq-title" className={styles.sectionTitle}>
                Часті запитання
              </h2>
              <div className={styles.faqAsideIntro}>
                <p>
                  Не знайшли відповіді?
                  <br />
                  Наші консультанти допоможуть
                </p>
                <div className={styles.faqContacts}>
                  <a href="tel:0800300114" className={styles.faqContact}>
                    <span>
                      <span className={styles.faqContactLight}>Гаряча лінія: </span>
                      <span className={styles.faqContactStrong}>0800 300 114</span>
                    </span>
                    <img src={assets.milFaqPhone} alt="" />
                  </a>
                  <a href="mailto:help@prytulafoundation.org" className={styles.faqContact}>
                    <span className={styles.faqContactStrong}>help@prytulafoundation.org</span>
                    <img src={assets.milFaqMail} alt="" />
                  </a>
                </div>
              </div>
            </aside>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((question) => (
                <button key={question} type="button" className={styles.faqItem}>
                  <p className={styles.faqQuestion}>{question}</p>
                  <img className={styles.faqChevron} src={assets.milFaqChevron} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

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
