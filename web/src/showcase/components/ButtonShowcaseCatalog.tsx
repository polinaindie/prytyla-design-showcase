import type { CSSProperties, ReactNode } from "react";
import { Button } from "../../design-system/Button";
import { IconMenu } from "../../design-system/Icons";
import type { ShowcaseDocSwitchOption } from "../primitives";
import styles from "./ButtonShowcase.module.css";

export const BUTTON_SECTION_OPTIONS = [
  { value: "primary-secondary", label: "Primary" },
  { value: "special", label: "Special" },
  { value: "icons", label: "Icons" },
  { value: "contact", label: "Contact" },
  { value: "social", label: "Social" },
  { value: "nav", label: "Nav" },
  { value: "sizes", label: "Sizes" },
  { value: "examples", label: "Examples" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

export type ButtonShowcaseSection =
  (typeof BUTTON_SECTION_OPTIONS)[number]["value"];

export const BUTTON_STATE_STANDARD_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "disabled", label: "Disabled" },
  { value: "all", label: "All" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

export const BUTTON_STATE_NAV_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "disabled", label: "Disabled" },
  { value: "active", label: "Active" },
  { value: "all", label: "All" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

export type ButtonShowcaseStateView =
  | (typeof BUTTON_STATE_STANDARD_OPTIONS)[number]["value"]
  | (typeof BUTTON_STATE_NAV_OPTIONS)[number]["value"];

export function buttonShowcaseSupportsStateFilter(
  section: ButtonShowcaseSection,
): boolean {
  return (
    section === "primary-secondary" ||
    section === "special" ||
    section === "nav"
  );
}

function OnDark({ children }: { children: ReactNode }) {
  return <div className={styles.onDark}>{children}</div>;
}

function ShowcaseCell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.cell}>
      {children}
      <span className={styles.cellLabel}>{label}</span>
    </div>
  );
}

function PreviewHint({ children }: { children: ReactNode }) {
  return <p className={styles.previewHint}>{children}</p>;
}

function PrimarySecondaryPreview({
  stateView,
}: {
  stateView: ButtonShowcaseStateView;
}) {
  const showDefault = stateView === "default" || stateView === "all";
  const showDisabled = stateView === "disabled" || stateView === "all";

  return (
    <>
      <PreviewHint>
        Primary і Secondary · hover (:hover) і :active — наведи на default.
      </PreviewHint>
      {showDefault ? (
        <div className={styles.grid}>
          <ShowcaseCell label="Primary · light">
            <Button variant="primary" theme="light">
              Підтримати
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Primary · dark">
            <Button variant="primary" theme="dark">
              Підтримати
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Secondary · dark">
            <Button variant="secondary" theme="dark">
              Дізнатись більше
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Secondary · light">
            <OnDark>
              <Button variant="secondary" theme="light">
                Дізнатись більше
              </Button>
            </OnDark>
          </ShowcaseCell>
        </div>
      ) : null}
      {showDisabled ? (
        <div className={styles.grid}>
          <ShowcaseCell label="Primary · light · disabled">
            <Button variant="primary" theme="light" disabled>
              Підтримати
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Primary · dark · disabled">
            <Button variant="primary" theme="dark" disabled>
              Підтримати
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Secondary · dark · disabled">
            <Button variant="secondary" theme="dark" disabled>
              Дізнатись більше
            </Button>
          </ShowcaseCell>
          <ShowcaseCell label="Secondary · light · disabled">
            <OnDark>
              <Button variant="secondary" theme="light" disabled>
                Дізнатись більше
              </Button>
            </OnDark>
          </ShowcaseCell>
        </div>
      ) : null}
    </>
  );
}

function SpecialPreview({ stateView }: { stateView: ButtonShowcaseStateView }) {
  const showDefault = stateView === "default" || stateView === "all";
  const showDisabled = stateView === "disabled" || stateView === "all";

  return (
    <>
      <PreviewHint>Donate CTA · gradient border · hover — CSS.</PreviewHint>
      <div className={styles.grid}>
        {showDefault ? (
          <ShowcaseCell label="Default">
            <Button variant="primary" theme="special">
              Долучитись
            </Button>
          </ShowcaseCell>
        ) : null}
        {showDisabled ? (
          <ShowcaseCell label="Disabled">
            <Button variant="primary" theme="special" disabled>
              Долучитись
            </Button>
          </ShowcaseCell>
        ) : null}
      </div>
    </>
  );
}

function IconsPreview() {
  return (
    <>
      <PreviewHint>
        Один слот іконки (ліворуч або праворуч). Стрілка: внутрішнє посилання
        (→, горизонтально) або зовнішнє (↗, діагонально) — hover на default.
      </PreviewHint>
      <div className={styles.grid}>
        <ShowcaseCell label="Ліва (custom)">
          <Button
            variant="primary"
            theme="light"
            showLeftIcon
            showRightIcon={false}
            leftIcon={<IconMenu size={24} aria-hidden />}
          >
            Ліва іконка
          </Button>
        </ShowcaseCell>
        <ShowcaseCell label="Внутрішнє · default">
          <Button variant="primary" theme="light" linkTarget="internal">
            Детальніше
          </Button>
        </ShowcaseCell>
        <ShowcaseCell label="Зовнішнє · linkTarget">
          <Button variant="primary" theme="light" linkTarget="external">
            Відкрити сайт
          </Button>
        </ShowcaseCell>
        <ShowcaseCell label="Без іконок">
          <Button
            variant="primary"
            theme="light"
            showRightIcon={false}
          >
            Без іконок
          </Button>
        </ShowcaseCell>
      </div>
    </>
  );
}

function ContactPreview() {
  return (
    <>
      <PreviewHint>Contact link chip · mailto / tel.</PreviewHint>
      <div className={styles.grid}>
        <ShowcaseCell label="Dark · email">
          <Button
            variant="contact"
            theme="dark"
            contactType="email"
            href="mailto:info@prytula.org"
          >
            info@prytula.org
          </Button>
        </ShowcaseCell>
        <ShowcaseCell label="Dark · phone">
          <Button
            variant="contact"
            theme="dark"
            contactType="phone"
            contactLabel="Гаряча лінія:"
            href="tel:+380000000000"
          >
            0 800 000 000
          </Button>
        </ShowcaseCell>
        <ShowcaseCell label="Light · email">
          <OnDark>
            <Button
              variant="contact"
              theme="light"
              contactType="email"
              href="mailto:info@prytula.org"
            >
              info@prytula.org
            </Button>
          </OnDark>
        </ShowcaseCell>
        <ShowcaseCell label="Light · phone">
          <OnDark>
            <Button
              variant="contact"
              theme="light"
              contactType="phone"
              contactLabel="Гаряча лінія:"
              href="tel:+380000000000"
            >
              0 800 000 000
            </Button>
          </OnDark>
        </ShowcaseCell>
      </div>
    </>
  );
}

function SocialPreview() {
  return (
    <>
      <PreviewHint>Social · icon-only · aria-label обов’язковий.</PreviewHint>
      <div className={styles.grid}>
        <ShowcaseCell label="Dark">
          <Button
            variant="social"
            theme="dark"
            socialNetwork="facebook"
            href="https://www.facebook.com/"
            aria-label="Facebook"
          />
        </ShowcaseCell>
        <ShowcaseCell label="Light">
          <OnDark>
            <Button
              variant="social"
              theme="light"
              socialNetwork="facebook"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            />
          </OnDark>
        </ShowcaseCell>
      </div>
    </>
  );
}

function NavPreview({ stateView }: { stateView: ButtonShowcaseStateView }) {
  const showDefault = stateView === "default" || stateView === "all";
  const showDisabled = stateView === "disabled" || stateView === "all";
  const showActive = stateView === "active" || stateView === "all";

  return (
    <>
      <PreviewHint>Nav · outline / ghost · hover — CSS.</PreviewHint>
      <div className={styles.grid}>
        {showDefault ? (
          <>
            <ShowcaseCell label="Outline">
              <Button variant="nav" navAppearance="outline">
                попередня
              </Button>
            </ShowcaseCell>
            <ShowcaseCell label="Ghost">
              <Button variant="nav" navAppearance="ghost">
                попередня
              </Button>
            </ShowcaseCell>
          </>
        ) : null}
        {showDisabled ? (
          <>
            <ShowcaseCell label="Outline · disabled">
              <Button variant="nav" navAppearance="outline" disabled>
                попередня
              </Button>
            </ShowcaseCell>
            <ShowcaseCell label="Ghost · disabled">
              <Button variant="nav" navAppearance="ghost" disabled>
                попередня
              </Button>
            </ShowcaseCell>
          </>
        ) : null}
        {showActive ? (
          <>
            <ShowcaseCell label="Outline · active">
              <Button variant="nav" navAppearance="outline" active>
                попередня
              </Button>
            </ShowcaseCell>
            <ShowcaseCell label="Ghost · active">
              <Button variant="nav" navAppearance="ghost" active>
                попередня
              </Button>
            </ShowcaseCell>
          </>
        ) : null}
      </div>
    </>
  );
}

function SizesPreview() {
  return (
    <>
      <PreviewHint>Висота через size-токени.</PreviewHint>
      <div className={styles.sizeRow}>
        <div className={styles.sizeCell}>
          <Button variant="primary" theme="light">
            Primary
          </Button>
          <span className={styles.sizeCaption}>--size-4xlarge (44px)</span>
        </div>
        <div className={styles.sizeCell}>
          <Button variant="nav" navAppearance="outline">
            Nav
          </Button>
          <span className={styles.sizeCaption}>--size-2xlarge (36px)</span>
        </div>
        <div className={styles.sizeCell}>
          <Button
            variant="social"
            theme="dark"
            socialNetwork="facebook"
            href="https://www.facebook.com/"
            aria-label="Facebook"
          />
          <span className={styles.sizeCaption}>44×44</span>
        </div>
      </div>
    </>
  );
}

function ExamplesPreview() {
  return (
    <>
      <PreviewHint>Типові рецепти в продукті.</PreviewHint>
      <div className={styles.grid}>
        <ShowcaseCell label="Donate hero">
          <Button variant="primary" theme="special">
            Долучитись
          </Button>
        </ShowcaseCell>
      </div>
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
          variant="social"
          theme="dark"
          socialNetwork="facebook"
          href="https://www.facebook.com/"
          aria-label="Facebook"
        />
      </div>
    </>
  );
}

export function ButtonShowcaseCatalog({
  section,
  stateView,
  previewGridColumns = 2,
}: {
  section: ButtonShowcaseSection;
  stateView: ButtonShowcaseStateView;
  /** Колонки сітки live preview — від перемикача viewport. */
  previewGridColumns?: 1 | 2 | 3 | 4;
}) {
  const previewStageStyle = {
    "--btn-showcase-grid-cols": String(previewGridColumns),
  } as CSSProperties;

  return (
    <div className={styles.previewStage} style={previewStageStyle}>
      {section === "primary-secondary" ? (
        <PrimarySecondaryPreview stateView={stateView} />
      ) : null}
      {section === "special" ? <SpecialPreview stateView={stateView} /> : null}
      {section === "icons" ? <IconsPreview /> : null}
      {section === "contact" ? <ContactPreview /> : null}
      {section === "social" ? <SocialPreview /> : null}
      {section === "nav" ? <NavPreview stateView={stateView} /> : null}
      {section === "sizes" ? <SizesPreview /> : null}
      {section === "examples" ? <ExamplesPreview /> : null}
    </div>
  );
}
