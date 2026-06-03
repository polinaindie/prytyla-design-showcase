import buttonStyles from "../Button/Button.module.css";
import { IconArrowUpRight } from "../Icons";
import { Illustration3D } from "../Illustration3D";
import { LinkCard } from "../LinkCard";
import type { SubPageHeroAction, SubPageHeroProps } from "./SubPageHero.types";
import styles from "./SubPageHero.module.css";

const DEFAULT_IMAGE_ILLUSTRATION = "humanitarianProjects" as const;

function SubPageHeroActionLink({ action }: { action: SubPageHeroAction }) {
  const themeClass =
    action.appearance === "primary"
      ? buttonStyles.primaryDark
      : buttonStyles.secondaryDark;

  return (
    <a
      href={action.href}
      className={[buttonStyles.root, themeClass, styles.actionLink]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={buttonStyles.label}>{action.label}</span>
      <IconArrowUpRight className={buttonStyles.icon} size={24} aria-hidden />
    </a>
  );
}

export function SubPageHero(props: SubPageHeroProps) {
  const {
    variant,
    title,
    description,
    showTitle = true,
    showDescription = true,
    background = "orange",
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const usesSideIllustration = variant === "image" || variant === "actions";

  const illustrationVariant =
    variant === "image" || variant === "actions"
      ? (props.illustration ?? DEFAULT_IMAGE_ILLUSTRATION)
      : DEFAULT_IMAGE_ILLUSTRATION;

  const titleNode = showTitle ? (
    <h1 id="subpage-hero-title" className={styles.title}>
      {title}
    </h1>
  ) : null;

  const actions =
    variant === "actions" && props.actions && props.actions.length > 0
      ? props.actions
      : null;

  return (
    <div className={styles.shell}>
      <section
        className={rootClass}
        data-variant={variant}
        data-background={background}
        aria-labelledby={showTitle ? "subpage-hero-title" : undefined}
        {...rest}
      >
        <div className={styles.copy}>
          {usesSideIllustration ? (
            <div className={styles.imageTitleRow}>
              {titleNode}
              <Illustration3D
                variant={illustrationVariant}
                className={styles.illustrationInline}
                aria-hidden
              />
            </div>
          ) : (
            titleNode
          )}

          {showDescription && description != null ? (
            <div className={styles.description}>{description}</div>
          ) : null}

          {actions ? (
            <div className={styles.actions}>
              {actions.map((action) => (
                <SubPageHeroActionLink key={action.href} action={action} />
              ))}
            </div>
          ) : null}
        </div>

        {variant === "links" ? (
          <>
            <div className={`${styles.links} ${styles.linksMobile}`}>
              {props.links.map((link) => (
                <LinkCard
                  key={`${link.href}-mobile`}
                  href={link.href}
                  title={link.title}
                  illustration={link.illustration}
                  size="mobile"
                  className={styles.linkCard}
                />
              ))}
            </div>
            <div className={`${styles.links} ${styles.linksDesktop}`}>
              {props.links.map((link) => (
                <LinkCard
                  key={`${link.href}-desktop`}
                  href={link.href}
                  title={link.title}
                  illustration={link.illustration}
                  size="desktop"
                  className={styles.linkCard}
                />
              ))}
            </div>
          </>
        ) : usesSideIllustration ? (
          <div className={styles.illustrationAside}>
            <Illustration3D variant={illustrationVariant} aria-hidden />
          </div>
        ) : null}
      </section>
    </div>
  );
}
