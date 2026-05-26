import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { GeneralWidgetScrollMetrics } from "./generalWidgetScroll";
import { useGeneralWidgetPageScroll } from "./useGeneralWidgetPageScroll";
import { Button } from "../Button";
import { ChipPaymentType } from "../ChipPaymentType";
import {
  IconBrandMono,
  IconDropdownArrow10,
  IconPaymentHeartEmpty,
  IconPaymentHeartFilled,
  IconPaymentReceipt,
  IconPaymentRepeat,
} from "../Icons";
import { PaymentInfo, PaymentInfoGroup } from "../PaymentInfo";
import { ProgressBar } from "../ProgressBar";
import { QuickAmount } from "../QuickAmount";
import type {
  GeneralWidgetPaymentInfoSection,
  GeneralWidgetPaymentTab,
  GeneralWidgetProgress,
  GeneralWidgetProps,
} from "./GeneralWidget.types";
import styles from "./GeneralWidget.module.css";

const DEFAULT_QUICK_AMOUNTS = [200, 500, 1000];

function ProgressBlock({
  progress,
  compact = false,
  scrollMetrics,
}: {
  progress: GeneralWidgetProgress;
  compact?: boolean;
  scrollMetrics?: GeneralWidgetScrollMetrics;
}) {
  const isScrollMode = scrollMetrics !== undefined;
  const isCompact = isScrollMode ? scrollMetrics.t > 0.01 : compact;
  const showThumb =
    Boolean(progress.thumbnailSrc) &&
    isCompact &&
    (!isScrollMode || scrollMetrics.thumbWidth > 0);

  const thumbStyle: CSSProperties | undefined = isScrollMode
    ? {
        width: scrollMetrics.thumbWidth > 0 ? `${scrollMetrics.thumbWidth}px` : 0,
        opacity: scrollMetrics.thumbOpacity,
      }
    : undefined;

  const titleStyle: CSSProperties | undefined = isScrollMode
    ? {
        maxHeight: `${scrollMetrics.titleAnimH}px`,
        opacity: scrollMetrics.titleAnimH > 0 ? 1 : 0,
      }
    : undefined;

  const sectionClass = [
    styles.progressSection,
    isCompact && styles.progressSectionCompact,
    isCompact && isScrollMode && styles.progressSectionScroll,
  ]
    .filter(Boolean)
    .join(" ");

  const thumbClass = [
    styles.progressThumb,
    isScrollMode && styles.progressThumbScroll,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass} aria-label="Прогрес збору">
      {showThumb ? (
        <img
          className={thumbClass}
          style={thumbStyle}
          src={progress.thumbnailSrc}
          alt={progress.thumbnailAlt ?? ""}
        />
      ) : null}
      <div className={styles.progressBody}>
        {isCompact || (isScrollMode && scrollMetrics.titleAnimH > 0) ? (
          <h3
            className={[
              styles.progressTitle,
              isScrollMode && styles.progressTitleScroll,
            ]
              .filter(Boolean)
              .join(" ")}
            style={titleStyle}
          >
            {progress.title}
          </h3>
        ) : null}
        <div
          className={[
            styles.progressBarWrap,
            isScrollMode && styles.progressBarScroll,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ProgressBar value={progress.value} />
        </div>
        <div className={styles.progressStats}>
          <div className={styles.statBlock}>
            <p className={styles.statLabel}>
              {progress.collectedLabel ?? "Зібрано"}
            </p>
            <p className={styles.statValue}>{progress.collectedAmount}</p>
          </div>
          <div className={`${styles.statBlock} ${styles.statBlockEnd}`}>
            <p className={styles.statLabel}>{progress.goalLabel ?? "Ціль"}</p>
            <p className={`${styles.statValue} ${styles.statValueMuted}`}>
              {progress.goalAmount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentTypeTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: GeneralWidgetPaymentTab;
  onTabChange: (tab: GeneralWidgetPaymentTab) => void;
}) {
  const heartIcon =
    activeTab === "once" ? (
      <IconPaymentHeartFilled size={20} glyphOnly aria-hidden />
    ) : (
      <IconPaymentHeartEmpty size={20} glyphOnly aria-hidden />
    );

  return (
    <div className={styles.tabs} role="tablist" aria-label="Тип платежу">
      <ChipPaymentType
        wrapperClassName={styles.tabChip}
        state={activeTab === "once" ? "selected" : "default"}
        icon={heartIcon}
        role="tab"
        aria-selected={activeTab === "once"}
        onClick={() => onTabChange("once")}
      >
        Разово
      </ChipPaymentType>
      <ChipPaymentType
        wrapperClassName={styles.tabChip}
        state={activeTab === "subscription" ? "selected" : "default"}
        icon={<IconPaymentRepeat size={20} glyphOnly aria-hidden />}
        recommendBadge={activeTab !== "subscription"}
        role="tab"
        aria-selected={activeTab === "subscription"}
        onClick={() => onTabChange("subscription")}
      >
        Щомісяця
      </ChipPaymentType>
      <ChipPaymentType
        wrapperClassName={styles.tabChip}
        state={activeTab === "paymentInfo" ? "selected" : "default"}
        icon={<IconPaymentReceipt size={20} glyphOnly aria-hidden />}
        role="tab"
        aria-selected={activeTab === "paymentInfo"}
        onClick={() => onTabChange("paymentInfo")}
      >
        Реквізити
      </ChipPaymentType>
    </div>
  );
}

type DonateFormBodyProps = {
  paymentTab: GeneralWidgetPaymentTab;
  onPaymentTabChange: (tab: GeneralWidgetPaymentTab) => void;
  amount: string;
  currency: string;
  quickAmounts: number[];
  onQuickAmountClick?: (amount: number) => void;
  paymentInfoSections: GeneralWidgetPaymentInfoSection[];
  subscriptionPlaceholder: GeneralWidgetProps["subscriptionPlaceholder"];
  resolvedPrimaryLabel: string;
  secondaryActionLabel: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

function DonateFormBody({
  paymentTab,
  onPaymentTabChange,
  amount,
  currency,
  quickAmounts,
  onQuickAmountClick,
  paymentInfoSections,
  subscriptionPlaceholder,
  resolvedPrimaryLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: DonateFormBodyProps) {
  return (
    <>
      <PaymentTypeTabs activeTab={paymentTab} onTabChange={onPaymentTabChange} />

      {paymentTab === "once" ? (
        <div className={styles.amountBlock} role="tabpanel">
          <div className={styles.amountInput}>
            <div className={styles.amountRow}>
              <p className={styles.amountValue} aria-live="polite">
                {amount}
              </p>
              <div className={styles.currencyDropdown}>
                <span className={styles.currencyLabel}>{currency}</span>
                <IconDropdownArrow10
                  className={styles.currencyIcon}
                  size={10}
                  aria-hidden
                />
              </div>
            </div>
            <div className={styles.amountUnderline} aria-hidden />
          </div>
          <div className={styles.quickAmounts}>
            {quickAmounts.map((value) => (
              <QuickAmount
                key={value}
                className={styles.quickAmount}
                amount={value}
                currency={currency}
                onClick={() => onQuickAmountClick?.(value)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {paymentTab === "subscription" ? (
        <div className={styles.subscriptionPlaceholder} role="tabpanel">
          {subscriptionPlaceholder}
        </div>
      ) : null}

      {paymentTab === "paymentInfo" ? (
        <div className={styles.paymentInfoRoot} role="tabpanel">
          <PaymentInfoGroup>
            {paymentInfoSections.map((section) => (
              <div key={section.title} className={styles.paymentInfoSection}>
                <p className={styles.sectionHeading}>{section.title}</p>
                {section.items.map((item) => (
                  <PaymentInfo
                    key={item.id}
                    id={item.id}
                    paymentType={item.paymentType}
                    title={item.title}
                    fields={item.fields}
                    description={item.description}
                  />
                ))}
              </div>
            ))}
          </PaymentInfoGroup>
        </div>
      ) : null}

      {paymentTab === "once" || paymentTab === "subscription" ? (
        <div className={styles.actions}>
          <Button
            variant="primary"
            theme="light"
            className={styles.actionFull}
            showLeftIcon={false}
            onClick={onPrimaryAction}
          >
            {resolvedPrimaryLabel}
          </Button>
          <Button
            variant="primary"
            theme="dark"
            className={styles.actionFull}
            showLeftIcon={false}
            rightIcon={
              <IconBrandMono
                className={styles.bankIcon}
                width={58}
                height={24}
                glyphOnly
                aria-hidden
              />
            }
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        </div>
      ) : null}
    </>
  );
}

function handleSidebarToggleKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  toggle: () => void,
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
}

export function GeneralWidget({
  className,
  layout = "full",
  showProgress = false,
  progress,
  hero,
  paymentTab: paymentTabControlled,
  defaultPaymentTab = "once",
  onPaymentTabChange,
  amount = "0",
  currency = "UAH",
  quickAmounts = DEFAULT_QUICK_AMOUNTS,
  onQuickAmountClick,
  paymentInfoSections = [],
  primaryActionLabel = "Підтримати разово",
  secondaryActionLabel = "На банку",
  onPrimaryAction,
  onSecondaryAction,
  subscriptionPlaceholder = "Щомісячна підписка — наступна ітерація компонента.",
  defaultCollapsed = true,
  collapsed: collapsedControlled,
  onToggleCollapse,
  onScrollToFull,
  articleScrollOffset,
}: GeneralWidgetProps) {
  const [paymentTabUncontrolled, setPaymentTabUncontrolled] =
    useState<GeneralWidgetPaymentTab>(defaultPaymentTab);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isTabControlled = paymentTabControlled !== undefined;
  const paymentTab = isTabControlled
    ? paymentTabControlled
    : paymentTabUncontrolled;

  const setPaymentTab = (tab: GeneralWidgetPaymentTab) => {
    if (!isTabControlled) {
      setPaymentTabUncontrolled(tab);
    }
    onPaymentTabChange?.(tab);
  };

  const isCollapseControlled = collapsedControlled !== undefined;
  const collapsed = isCollapseControlled
    ? collapsedControlled
    : internalCollapsed;

  const toggleCollapse = () => {
    const next = !collapsed;
    if (!isCollapseControlled) {
      setInternalCollapsed(next);
    }
    onToggleCollapse?.(next);
  };

  const stopExpandedPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const resolvedPrimaryLabel =
    paymentTab === "once"
      ? primaryActionLabel
      : paymentTab === "subscription"
        ? "Підтримати щомісяця"
        : primaryActionLabel;

  const articleRef = useRef<HTMLElement>(null);

  const scrollAnimation = useGeneralWidgetPageScroll(
    paymentTab,
    layout === "article",
    articleRef,
    articleScrollOffset,
  );

  const scrollToFullWidget = () => {
    onScrollToFull?.();
    const anchorTop = articleRef.current
      ? articleRef.current.getBoundingClientRect().top + window.scrollY
      : 0;
    window.scrollTo({ top: anchorTop, behavior: "smooth" });
  };

  const handleArticleProgressClick = () => {
    if (layout === "article" && scrollAnimation.t > 0.5) {
      scrollToFullWidget();
    }
  };

  const handleArticleProgressKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (layout === "article" && scrollAnimation.t > 0.5) {
      handleSidebarToggleKeyDown(event, scrollToFullWidget);
    }
  };

  const donateFormProps: DonateFormBodyProps = {
    paymentTab,
    onPaymentTabChange: setPaymentTab,
    amount,
    currency,
    quickAmounts,
    onQuickAmountClick,
    paymentInfoSections,
    subscriptionPlaceholder,
    resolvedPrimaryLabel,
    secondaryActionLabel,
    onPrimaryAction,
    onSecondaryAction,
  };

  if (layout === "veryShort") {
    if (!progress) {
      return null;
    }

    const rootClass = [styles.root, styles.rootVeryShort, className]
      .filter(Boolean)
      .join(" ");

    return (
      <article className={rootClass}>
        <ProgressBlock progress={progress} compact />
      </article>
    );
  }

  if (layout === "article") {
    if (!progress || !hero) {
      return null;
    }

    const rootClass = [
      styles.root,
      styles.rootArticle,
      scrollAnimation.useAutoHeight && styles.rootArticlePaymentInfo,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isScrollAnimating =
      scrollAnimation.widgetHeight != null &&
      scrollAnimation.t > 0 &&
      scrollAnimation.t < 1;

    const rootStyle: CSSProperties = {
      height:
        isScrollAnimating && scrollAnimation.widgetHeight != null
          ? scrollAnimation.widgetHeight
          : undefined,
      transition: scrollAnimation.useHeightTransition
        ? "height 0.3s ease"
        : "none",
    };

    const heroClass = [
      styles.hero,
      styles.heroScroll,
      scrollAnimation.useHeightTransition && styles.heroScrollTransition,
    ]
      .filter(Boolean)
      .join(" ");

    const heroStyle: CSSProperties = {
      height: scrollAnimation.heroHeight,
      opacity: scrollAnimation.heroOpacity,
    };

    const showProgressClickTarget = scrollAnimation.t > 0.5;

    return (
      <article ref={articleRef} className={rootClass} style={rootStyle}>
        <div className={heroClass} style={heroStyle}>
          <img
            className={styles.heroImage}
            src={hero.src}
            alt={hero.alt}
          />
        </div>

        <div
          className={
            showProgressClickTarget ? styles.sidebarProgressToggle : undefined
          }
          role={showProgressClickTarget ? "button" : undefined}
          tabIndex={showProgressClickTarget ? 0 : undefined}
          aria-label={
            showProgressClickTarget
              ? "Прокрутити до повного віджета донату"
              : undefined
          }
          onClick={
            showProgressClickTarget ? handleArticleProgressClick : undefined
          }
          onKeyDown={
            showProgressClickTarget
              ? handleArticleProgressKeyDown
              : undefined
          }
        >
          <ProgressBlock progress={progress} scrollMetrics={scrollAnimation} />
        </div>

        <div className={styles.form}>
          <DonateFormBody {...donateFormProps} />
        </div>
      </article>
    );
  }

  if (layout === "sidebar") {
    if (!progress) {
      return null;
    }

    const rootClass = [
      styles.root,
      styles.rootSidebar,
      collapsed && styles.collapsed,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <article className={rootClass}>
        <div
          className={styles.sidebarProgressToggle}
          role="button"
          tabIndex={0}
          aria-expanded={!collapsed}
          aria-label={
            collapsed ? "Розгорнути картку донату" : "Згорнути картку донату"
          }
          onClick={toggleCollapse}
          onKeyDown={(event) => handleSidebarToggleKeyDown(event, toggleCollapse)}
        >
          <ProgressBlock progress={progress} compact />
        </div>

        <div
          className={styles.expandedContent}
          aria-hidden={collapsed}
          onClick={stopExpandedPropagation}
        >
          <DonateFormBody {...donateFormProps} />
        </div>
      </article>
    );
  }

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <article className={rootClass}>
      {hero ? (
        <div className={styles.hero}>
          <img
            className={styles.heroImage}
            src={hero.src}
            alt={hero.alt}
          />
        </div>
      ) : null}

      {showProgress && progress ? <ProgressBlock progress={progress} /> : null}

      <div className={styles.form}>
        <DonateFormBody {...donateFormProps} />
      </div>
    </article>
  );
}
