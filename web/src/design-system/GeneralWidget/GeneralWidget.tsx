import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { GeneralWidgetScrollMetrics } from "./generalWidgetScroll";
import { useGeneralWidgetPageScroll } from "./useGeneralWidgetPageScroll";
import { useStableProgressSectionHeight } from "./useStableProgressSectionHeight";
import { GENERAL_WIDGET_IMAGE_MAX_H } from "./generalWidgetScroll";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { ChipPaymentType } from "../ChipPaymentType";
import { CurrencySelect } from "../CurrencySelect";
import type { CurrencyCode } from "../CurrencySelect";
import {
  IconBrandMono,
  IconPaymentHeartEmpty,
  IconPaymentHeartFilled,
  IconPaymentReceipt,
  IconPaymentRepeat,
  IconSparkle14,
} from "../Icons";
import { PaymentInfo, PaymentInfoGroup } from "../PaymentInfo";
import { ProgressBar } from "../ProgressBar";
import { QuickAmount } from "../QuickAmount";
import { Tabs } from "../Tabs";
import type {
  GeneralWidgetDonatePageCategory,
  GeneralWidgetPaymentInfoSection,
  GeneralWidgetPaymentTab,
  GeneralWidgetProgress,
  GeneralWidgetProps,
} from "./GeneralWidget.types";
import { DEFAULT_PAYMENT_INFO_SECTIONS } from "./generalWidgetPaymentInfoDefaults";
import styles from "./GeneralWidget.module.css";

const DEFAULT_QUICK_AMOUNTS = [200, 500, 1000];
const WIDE_QUICK_AMOUNTS = [100, 200, 500, 1000, 5000];

const DEFAULT_NEWSLETTER_OPT_IN_LABEL =
  "Надсилати мені новини, аналітику та звіти від БО Сергія Притули";

const DONATE_PAGE_CATEGORY_ITEMS = [
  { id: "military", label: "Допомогити війську" },
  { id: "foundation", label: "Підтримати фонд" },
] as const;

function parseAmountValue(amount: string): number {
  const normalized = amount.replace(/\s/g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function isAmountActive(amount: string): boolean {
  return parseAmountValue(amount) > 0;
}

function sanitizeAmountInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") {
    return "0";
  }
  return digits.replace(/^0+(?=\d)/, "") || "0";
}

const DEFAULT_CURRENCY_OPTIONS: CurrencyCode[] = [
  { code: "UAH" },
  { code: "USD" },
  { code: "EUR" },
];

function ProgressBlock({
  progress,
  compact = false,
  done = false,
  scrollMetrics,
  showTitle = false,
  /** layout=article scroll: мініатюра = той самий кадр, що hero (не окремий thumbnailSrc). */
  scrollThumbSrc,
  scrollThumbAlt,
}: {
  progress: GeneralWidgetProgress;
  compact?: boolean;
  done?: boolean;
  scrollMetrics?: GeneralWidgetScrollMetrics;
  showTitle?: boolean;
  scrollThumbSrc?: string;
  scrollThumbAlt?: string;
}) {
  const isScrollMode = scrollMetrics !== undefined;
  const isCompact = isScrollMode ? scrollMetrics.t > 0.01 : compact;
  const thumbSrc = isScrollMode
    ? scrollThumbSrc ?? progress.thumbnailSrc
    : progress.thumbnailSrc;
  const thumbAlt = isScrollMode
    ? scrollThumbAlt ?? progress.thumbnailAlt
    : progress.thumbnailAlt;
  const showThumb =
    !done &&
    Boolean(thumbSrc) &&
    isCompact &&
    (!isScrollMode || scrollMetrics.thumbWidth > 0);

  const sectionStyle: CSSProperties | undefined = isScrollMode
    ? { gap: scrollMetrics.thumbGap }
    : undefined;

  const thumbStyle: CSSProperties | undefined = isScrollMode
    ? {
        width: scrollMetrics.thumbWidth > 0 ? scrollMetrics.thumbWidth : 0,
        height: scrollMetrics.thumbHeight > 0 ? scrollMetrics.thumbHeight : 0,
        opacity: scrollMetrics.thumbOpacity,
      }
    : undefined;

  const titleStyle: CSSProperties | undefined = isScrollMode
    ? {
        maxHeight: scrollMetrics.titleAnimH,
        opacity: scrollMetrics.titleOpacity,
      }
    : undefined;

  const sectionClass = [
    styles.progressSection,
    done && styles.progressSectionDone,
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
    <section
      className={sectionClass}
      style={sectionStyle}
      aria-label="Прогрес збору"
    >
      {showThumb ? (
        <img
          className={thumbClass}
          style={thumbStyle}
          src={thumbSrc}
          alt={thumbAlt ?? ""}
        />
      ) : null}
      <div className={styles.progressBody}>
        {!done &&
        (showTitle || isCompact || (isScrollMode && scrollMetrics.titleAnimH > 0)) ? (
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
          <ProgressBar
            value={progress.value}
            variant={done || progress.value >= 100 ? "done" : undefined}
          />
        </div>
        <div className={styles.progressStats}>
          <div className={styles.statBlock}>
            <p className={styles.statLabel}>
              {progress.collectedLabel ?? "Зібрано"}
            </p>
            <p className={styles.statValue}>{progress.collectedAmount}</p>
          </div>
          <div className={`${styles.statBlock} ${styles.statBlockEnd}`}>
            <p className={styles.statLabel}>
              {progress.goalLabel ?? (done ? "Планувалось зібрати" : "Ціль")}
            </p>
            <p
              className={[
                styles.statValue,
                done ? styles.statValueGoalDone : styles.statValueMuted,
              ]
                .filter(Boolean)
                .join(" ")}
            >
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
  showSubscriptionTab = true,
}: {
  activeTab: GeneralWidgetPaymentTab;
  onTabChange: (tab: GeneralWidgetPaymentTab) => void;
  showSubscriptionTab?: boolean;
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
      {showSubscriptionTab ? (
        <ChipPaymentType
          wrapperClassName={styles.tabChip}
          state={activeTab === "subscription" ? "selected" : "default"}
          icon={<IconPaymentRepeat size={20} glyphOnly aria-hidden />}
          recommendBadge
          role="tab"
          aria-selected={activeTab === "subscription"}
          onClick={() => onTabChange("subscription")}
        >
          Щомісяця
        </ChipPaymentType>
      ) : null}
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
  showSubscriptionTab: boolean;
  isWide: boolean;
  amount: string;
  currency: string;
  currencyOptions: CurrencyCode[];
  onCurrencyChange: (code: string) => void;
  onAmountChange?: (amount: string) => void;
  quickAmounts: number[];
  onQuickAmountClick?: (amount: number) => void;
  paymentInfoSections: GeneralWidgetPaymentInfoSection[];
  showNewsletterOptIn: boolean;
  newsletterOptIn: boolean;
  onNewsletterOptInChange: (checked: boolean) => void;
  newsletterOptInLabel: string;
  newsletterEmail: string;
  onNewsletterEmailChange: (email: string) => void;
  newsletterEmailLabel: string;
  newsletterEmailInputId: string;
  primaryActionLabel: string;
  primaryActionDisabled: boolean;
  subscriptionPrimaryActionLabel: string;
  subscriptionSecondaryActionLabel: string;
  subscriptionCancelHref?: string;
  onSubscriptionCancel?: () => void;
  secondaryActionLabel: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

function DonatePageCategoryHeader({
  category,
  onCategoryChange,
}: {
  category: GeneralWidgetDonatePageCategory;
  onCategoryChange: (id: string) => void;
}) {
  return (
    <header className={styles.pageCategoryHeader}>
      <Tabs
        className={styles.pageCategoryTabs}
        aria-label="Категорія донату"
        items={DONATE_PAGE_CATEGORY_ITEMS}
        value={category}
        onChange={onCategoryChange}
      />
      <div className={styles.pageCategorySeparator} aria-hidden />
    </header>
  );
}

function NewsletterOptInBlock({
  checked,
  onCheckedChange,
  label,
  email,
  onEmailChange,
  emailLabel,
  emailInputId,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  email: string;
  onEmailChange: (email: string) => void;
  emailLabel: string;
  emailInputId: string;
}) {
  return (
    <div className={styles.newsletterBlock}>
      <Checkbox
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
      >
        {label}
      </Checkbox>
      {checked ? (
        <div className={styles.newsletterEmailField}>
          <label className={styles.newsletterEmailLabel} htmlFor={emailInputId}>
            {emailLabel}
          </label>
          <input
            id={emailInputId}
            type="email"
            className={styles.newsletterEmailInput}
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            autoComplete="email"
            inputMode="email"
          />
          <div className={styles.newsletterEmailUnderline} aria-hidden />
        </div>
      ) : null}
    </div>
  );
}

function AmountBlock({
  amount,
  currency,
  currencyOptions,
  onCurrencyChange,
  onAmountChange,
  quickAmounts,
  onQuickAmountClick,
  className,
  children,
}: {
  amount: string;
  currency: string;
  currencyOptions: CurrencyCode[];
  onCurrencyChange: (code: string) => void;
  onAmountChange?: (amount: string) => void;
  quickAmounts: number[];
  onQuickAmountClick?: (amount: number) => void;
  className?: string;
  children?: ReactNode;
}) {
  const rootClass = [styles.amountBlock, className].filter(Boolean).join(" ");
  const amountInputClass = [
    styles.amountValue,
    isAmountActive(amount) && styles.amountValueActive,
  ]
    .filter(Boolean)
    .join(" ");

  const handleAmountFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (amount === "0") {
      event.target.select();
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAmountChange?.(sanitizeAmountInput(event.target.value));
  };

  return (
    <div className={rootClass}>
      <div className={styles.amountInput}>
        <div className={styles.amountRow}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={amountInputClass}
            value={amount}
            onChange={handleAmountChange}
            onFocus={handleAmountFocus}
            aria-label="Сума донату"
          />
          <CurrencySelect
            className={styles.currencySelect}
            appearance="amount"
            options={currencyOptions}
            value={currency}
            onChange={onCurrencyChange}
          />
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
      {children}
    </div>
  );
}

function SubscriptionCallout({
  cancelHref,
  onCancel,
}: {
  cancelHref?: string;
  onCancel?: () => void;
}) {
  return (
    <div className={styles.subscriptionCallout}>
      <IconSparkle14 className={styles.subscriptionCalloutIcon} />
      <p className={styles.subscriptionCalloutText}>
        Регулярна підтримка — найефективніший спосіб допомогти. Підписку можна{" "}
        {cancelHref ? (
          <a href={cancelHref} className={styles.subscriptionCancelLink}>
            скасувати
          </a>
        ) : (
          <button
            type="button"
            className={styles.subscriptionCancelLink}
            onClick={onCancel}
          >
            скасувати
          </button>
        )}{" "}
        будь-коли.
      </p>
    </div>
  );
}

function DonateFormBody({
  paymentTab,
  onPaymentTabChange,
  showSubscriptionTab,
  isWide,
  amount,
  currency,
  currencyOptions,
  onCurrencyChange,
  onAmountChange,
  quickAmounts,
  onQuickAmountClick,
  paymentInfoSections,
  showNewsletterOptIn,
  newsletterOptIn,
  onNewsletterOptInChange,
  newsletterOptInLabel,
  newsletterEmail,
  onNewsletterEmailChange,
  newsletterEmailLabel,
  newsletterEmailInputId,
  primaryActionLabel,
  primaryActionDisabled,
  subscriptionPrimaryActionLabel,
  subscriptionSecondaryActionLabel,
  subscriptionCancelHref,
  onSubscriptionCancel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: DonateFormBodyProps) {
  return (
    <>
      <PaymentTypeTabs
        activeTab={paymentTab}
        onTabChange={onPaymentTabChange}
        showSubscriptionTab={showSubscriptionTab}
      />

      {paymentTab === "once" ? (
        <div role="tabpanel">
          <AmountBlock
            amount={amount}
            currency={currency}
            currencyOptions={currencyOptions}
            onCurrencyChange={onCurrencyChange}
            onAmountChange={onAmountChange}
            quickAmounts={quickAmounts}
            onQuickAmountClick={onQuickAmountClick}
            className={isWide ? styles.amountBlockWide : undefined}
          >
            {isWide && showNewsletterOptIn ? (
              <NewsletterOptInBlock
                checked={newsletterOptIn}
                onCheckedChange={onNewsletterOptInChange}
                label={newsletterOptInLabel}
                email={newsletterEmail}
                onEmailChange={onNewsletterEmailChange}
                emailLabel={newsletterEmailLabel}
                emailInputId={newsletterEmailInputId}
              />
            ) : null}
          </AmountBlock>
        </div>
      ) : null}

      {paymentTab === "subscription" ? (
        <div className={styles.subscriptionPanel} role="tabpanel">
          <SubscriptionCallout
            cancelHref={subscriptionCancelHref}
            onCancel={onSubscriptionCancel}
          />
          <AmountBlock
            amount={amount}
            currency={currency}
            currencyOptions={currencyOptions}
            onCurrencyChange={onCurrencyChange}
            onAmountChange={onAmountChange}
            quickAmounts={quickAmounts}
            onQuickAmountClick={onQuickAmountClick}
          />
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

      {paymentTab === "once" ? (
        <div className={styles.actions}>
          <Button
            variant="primary"
            theme="light"
            className={styles.actionFull}
            showLeftIcon={false}
            disabled={primaryActionDisabled}
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
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

      {paymentTab === "subscription" ? (
        <div className={styles.actions}>
          <Button
            variant="primary"
            theme="light"
            className={styles.actionFull}
            showLeftIcon={false}
            onClick={onPrimaryAction}
          >
            {subscriptionPrimaryActionLabel}
          </Button>
          <Button
            variant="primary"
            theme="special"
            className={styles.actionFull}
            onClick={onSecondaryAction}
          >
            {subscriptionSecondaryActionLabel}
          </Button>
        </div>
      ) : null}
    </>
  );
}

function DoneFormBody({
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: {
  primaryActionLabel: string;
  secondaryActionLabel: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}) {
  return (
    <div className={styles.actions}>
      <Button
        variant="primary"
        theme="dark"
        className={styles.actionFull}
        showLeftIcon={false}
        onClick={onPrimaryAction}
      >
        {primaryActionLabel}
      </Button>
      <Button
        variant="secondary"
        theme="dark"
        className={styles.actionFull}
        showLeftIcon={false}
        onClick={onSecondaryAction}
      >
        {secondaryActionLabel}
      </Button>
    </div>
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
  paymentType = "active",
  paymentTab: paymentTabControlled,
  defaultPaymentTab = "once",
  onPaymentTabChange,
  showSubscriptionTab = true,
  amount: amountControlled,
  defaultAmount = "0",
  onAmountChange,
  currency: currencyControlled,
  currencyOptions = DEFAULT_CURRENCY_OPTIONS,
  onCurrencyChange,
  quickAmounts,
  onQuickAmountClick,
  paymentInfoSections = DEFAULT_PAYMENT_INFO_SECTIONS,
  primaryActionLabel,
  subscriptionPrimaryActionLabel = "Оформити підписку",
  subscriptionSecondaryActionLabel = "Долучитись",
  subscriptionCancelHref,
  onSubscriptionCancel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  donatePageCategory,
  onDonatePageCategoryChange,
  militaryDonateHref,
  foundationDonateHref,
  showNewsletterOptIn,
  newsletterOptIn: newsletterOptInControlled,
  defaultNewsletterOptIn = false,
  onNewsletterOptInChange,
  newsletterOptInLabel = DEFAULT_NEWSLETTER_OPT_IN_LABEL,
  newsletterEmail: newsletterEmailControlled,
  defaultNewsletterEmail = "",
  onNewsletterEmailChange,
  newsletterEmailLabel = "Ваш email",
  defaultCollapsed = true,
  collapsed: collapsedControlled,
  onToggleCollapse,
  onScrollToFull,
  articleScrollOffset,
  articleScrollContainerRef,
  articleScrollNaturalLayout = false,
}: GeneralWidgetProps) {
  const isDone = paymentType === "done";
  const isWide = layout === "wide";
  const effectiveQuickAmounts =
    quickAmounts ?? (isWide ? WIDE_QUICK_AMOUNTS : DEFAULT_QUICK_AMOUNTS);
  const effectiveShowNewsletterOptIn =
    showNewsletterOptIn ?? isWide;
  const effectivePrimaryActionLabel =
    primaryActionLabel ??
    (isDone ? "Переглянути звіт" : "Підтримати разово");
  const effectiveSecondaryActionLabel =
    secondaryActionLabel ?? (isDone ? "Усі новини по проєкту" : "На банку");

  const [paymentTabUncontrolled, setPaymentTabUncontrolled] =
    useState<GeneralWidgetPaymentTab>(defaultPaymentTab);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [internalAmount, setInternalAmount] = useState(defaultAmount);
  const [internalCurrency, setInternalCurrency] = useState(
    currencyControlled ?? "UAH",
  );
  const [internalNewsletterOptIn, setInternalNewsletterOptIn] = useState(
    defaultNewsletterOptIn,
  );
  const [internalNewsletterEmail, setInternalNewsletterEmail] = useState(
    defaultNewsletterEmail,
  );
  const newsletterEmailInputId = useId();

  const newsletterOptIn =
    newsletterOptInControlled ?? internalNewsletterOptIn;

  const newsletterEmail =
    newsletterEmailControlled ?? internalNewsletterEmail;

  const handleNewsletterOptInChange = (checked: boolean) => {
    if (newsletterOptInControlled === undefined) {
      setInternalNewsletterOptIn(checked);
    }
    if (!checked && newsletterEmailControlled === undefined) {
      setInternalNewsletterEmail("");
    }
    onNewsletterOptInChange?.(checked);
  };

  const handleNewsletterEmailChange = (email: string) => {
    if (newsletterEmailControlled === undefined) {
      setInternalNewsletterEmail(email);
    }
    onNewsletterEmailChange?.(email);
  };

  const amount = amountControlled ?? internalAmount;

  const handleAmountChange = (value: string) => {
    if (amountControlled === undefined) {
      setInternalAmount(value);
    }
    onAmountChange?.(value);
  };

  const primaryActionDisabled = parseAmountValue(amount) <= 0;

  const currency =
    currencyControlled !== undefined ? currencyControlled : internalCurrency;

  const handleCurrencyChange = (code: string) => {
    if (currencyControlled === undefined) {
      setInternalCurrency(code);
    }
    onCurrencyChange?.(code);
  };

  const isTabControlled = paymentTabControlled !== undefined;
  const paymentTab = isTabControlled
    ? paymentTabControlled
    : paymentTabUncontrolled;

  const setPaymentTab = (tab: GeneralWidgetPaymentTab) => {
    if (!showSubscriptionTab && tab === "subscription") {
      return;
    }
    if (!isTabControlled) {
      setPaymentTabUncontrolled(tab);
    }
    onPaymentTabChange?.(tab);
  };

  useEffect(() => {
    if (!showSubscriptionTab && paymentTab === "subscription") {
      setPaymentTab("once");
    }
  }, [showSubscriptionTab, paymentTab]);

  const handleDonatePageCategoryChange = (id: string) => {
    const category = id as GeneralWidgetDonatePageCategory;
    if (category === donatePageCategory) {
      return;
    }
    onDonatePageCategoryChange?.(category);
    if (category === "military" && militaryDonateHref) {
      window.location.assign(militaryDonateHref);
      return;
    }
    if (category === "foundation" && foundationDonateHref) {
      window.location.assign(foundationDonateHref);
    }
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

  const articleRef = useRef<HTMLElement>(null);
  const useNaturalArticleLayout =
    articleScrollContainerRef != null || articleScrollNaturalLayout;
  const { height: progressSectionHeight, ref: progressSectionRef } =
    useStableProgressSectionHeight(layout === "article");

  const progressMeasureRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && node.offsetHeight > 0) {
        progressSectionRef(node);
      }
    },
    [progressSectionRef],
  );

  const scrollAnimation = useGeneralWidgetPageScroll(
    paymentTab,
    layout === "article",
    articleRef,
    articleScrollOffset,
    progressSectionHeight,
    articleScrollContainerRef,
  );

  const articleHeightTransition = scrollAnimation.useHeightTransition
    ? "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
    : "none";

  const scrollToFullWidget = () => {
    onScrollToFull?.();
    const scrollContainer = articleScrollContainerRef?.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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
    showSubscriptionTab,
    isWide,
    amount,
    currency,
    currencyOptions,
    onCurrencyChange: handleCurrencyChange,
    onAmountChange: handleAmountChange,
    quickAmounts: effectiveQuickAmounts,
    onQuickAmountClick,
    paymentInfoSections,
    showNewsletterOptIn: effectiveShowNewsletterOptIn,
    newsletterOptIn,
    onNewsletterOptInChange: handleNewsletterOptInChange,
    newsletterOptInLabel,
    newsletterEmail,
    onNewsletterEmailChange: handleNewsletterEmailChange,
    newsletterEmailLabel,
    newsletterEmailInputId,
    primaryActionLabel: effectivePrimaryActionLabel,
    primaryActionDisabled,
    subscriptionPrimaryActionLabel,
    subscriptionSecondaryActionLabel,
    subscriptionCancelHref,
    onSubscriptionCancel,
    secondaryActionLabel: effectiveSecondaryActionLabel,
    onPrimaryAction,
    onSecondaryAction,
  };

  if (isDone) {
    if (!progress) {
      return null;
    }

    const doneRootClass = [styles.root, className].filter(Boolean).join(" ");

    return (
      <article className={doneRootClass}>
        {hero ? (
          <div className={styles.hero}>
            <img
              className={styles.heroImage}
              src={hero.src}
              alt={hero.alt}
            />
          </div>
        ) : null}

        <ProgressBlock progress={progress} done />

        <div className={[styles.form, styles.formDone].join(" ")}>
          <DoneFormBody
            primaryActionLabel={effectivePrimaryActionLabel}
            secondaryActionLabel={effectiveSecondaryActionLabel}
            onPrimaryAction={onPrimaryAction}
            onSecondaryAction={onSecondaryAction}
          />
        </div>
      </article>
    );
  }

  if (layout === "wide") {
    const wideShellClass = [styles.wideShell, className]
      .filter(Boolean)
      .join(" ");
    const wideRootClass = [styles.root, styles.rootWide].join(" ");
    const wideFormClass = [styles.form, styles.formWide].join(" ");

    return (
      <div className={wideShellClass}>
        {donatePageCategory ? (
          <DonatePageCategoryHeader
            category={donatePageCategory}
            onCategoryChange={handleDonatePageCategoryChange}
          />
        ) : null}
        <article className={wideRootClass}>
          <div className={wideFormClass}>
            <DonateFormBody {...donateFormProps} />
          </div>
        </article>
      </div>
    );
  }

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
      useNaturalArticleLayout && styles.rootArticleNaturalLayout,
      scrollAnimation.useAutoHeight && styles.rootArticlePaymentInfo,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const lockedWidgetHeight = scrollAnimation.widgetHeight;

    const rootStyle: CSSProperties =
      !useNaturalArticleLayout && lockedWidgetHeight != null
        ? {
            height: lockedWidgetHeight,
            transition: articleHeightTransition,
          }
        : {};

    const headerStyle: CSSProperties =
      scrollAnimation.t >= 1
        ? {
            minHeight: scrollAnimation.headerHeight,
            height: "auto",
          }
        : {
              height: scrollAnimation.headerHeight,
              minHeight: scrollAnimation.headerHeight,
              maxHeight: scrollAnimation.headerHeight,
              transition: "none",
            };

    const heroLayerStyle: CSSProperties = {
      height: GENERAL_WIDGET_IMAGE_MAX_H,
      opacity: scrollAnimation.heroOpacity,
      transition: "none",
    };

    const morphT = scrollAnimation.t;
    const showProgressClickTarget = morphT > 0.5 && paymentTab !== "paymentInfo";
    const clipArticleHeader = morphT < 1;
    const isFullyCollapsed = morphT >= 1;
    /** Tablet: compact progress strip лише в collapsed; під час morph — повний progress + форма. */
    const tabletProgressMetrics = isFullyCollapsed ? scrollAnimation : undefined;

    const progressBlockProps = {
      progress,
      scrollThumbSrc: hero.src,
      scrollThumbAlt: hero.alt,
    };

    return (
      <article
        ref={articleRef}
        className={[
          rootClass,
          isFullyCollapsed && styles.rootArticleFullyCollapsed,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...rootStyle,
          ["--article-tablet-hero-opacity" as string]: scrollAnimation.heroOpacity,
          ["--article-morph-t" as string]: morphT,
        }}
      >
        <div className={styles.articleShell}>
          <div
            className={[
              styles.articleHeader,
              clipArticleHeader && styles.articleHeaderClip,
            ]
              .filter(Boolean)
              .join(" ")}
            style={headerStyle}
          >
            <div className={styles.articleHeroLayer} style={heroLayerStyle}>
              <img
                className={styles.heroImage}
                src={hero.src}
                alt={hero.alt}
              />
            </div>

            <div
              ref={progressMeasureRef}
              className={[
                styles.articleProgressMobile,
                styles.articleProgressAnchor,
                showProgressClickTarget ? styles.sidebarProgressToggle : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
              <ProgressBlock
                {...progressBlockProps}
                scrollMetrics={scrollAnimation}
              />
            </div>
          </div>

          <div className={styles.articleSide}>
            <div
              className={[
                styles.articleProgressTablet,
                showProgressClickTarget ? styles.sidebarProgressToggle : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
              <div ref={progressMeasureRef}>
                <ProgressBlock
                  {...progressBlockProps}
                  showTitle
                  scrollMetrics={tabletProgressMetrics}
                />
              </div>
            </div>

            <div className={styles.form}>
              <DonateFormBody {...donateFormProps} />
            </div>

            <div className={styles.articleTabletCollapsedCta}>
              <Button
                variant="primary"
                theme="light"
                className={styles.actionFull}
                showLeftIcon={false}
                disabled={primaryActionDisabled}
                onClick={onPrimaryAction}
              >
                {effectivePrimaryActionLabel === "Підтримати разово"
                  ? "Підтримати проєкт"
                  : effectivePrimaryActionLabel}
              </Button>
            </div>
          </div>
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
