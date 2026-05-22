import { useState } from "react";
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
  GeneralWidgetPaymentTab,
  GeneralWidgetProgress,
  GeneralWidgetProps,
} from "./GeneralWidget.types";
import styles from "./GeneralWidget.module.css";

const DEFAULT_QUICK_AMOUNTS = [200, 500, 1000];

function ProgressBlock({
  progress,
  compact = false,
}: {
  progress: GeneralWidgetProgress;
  compact?: boolean;
}) {
  const sectionClass = [
    styles.progressSection,
    compact && styles.progressSectionCompact,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass} aria-label="Прогрес збору">
      {progress.thumbnailSrc ? (
        <img
          className={styles.progressThumb}
          src={progress.thumbnailSrc}
          alt={progress.thumbnailAlt ?? ""}
        />
      ) : null}
      <div className={styles.progressBody}>
        {compact ? (
          <h3 className={styles.progressTitle}>{progress.title}</h3>
        ) : null}
        <div className={styles.progressBarWrap}>
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
}: GeneralWidgetProps) {
  const [paymentTabUncontrolled, setPaymentTabUncontrolled] =
    useState<GeneralWidgetPaymentTab>(defaultPaymentTab);

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

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const resolvedPrimaryLabel =
    paymentTab === "once"
      ? primaryActionLabel
      : paymentTab === "subscription"
        ? "Підтримати щомісяця"
        : primaryActionLabel;

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
        <PaymentTypeTabs activeTab={paymentTab} onTabChange={setPaymentTab} />

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
      </div>
    </article>
  );
}
