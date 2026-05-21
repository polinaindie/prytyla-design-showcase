import { Button } from "../Button";
import {
  IconSocialFacebook,
  IconSocialInstagram,
  IconSocialLinkedIn,
  IconSocialTelegram,
  IconSocialX,
  IconSocialYouTube,
} from "../Icons";
import type { MenuSocialLink, MenuSocialNetwork } from "./Menu.types";
import styles from "./Menu.module.css";

function SocialIcon({
  network,
  size = 24,
}: {
  network: MenuSocialNetwork;
  size?: number;
}) {
  const className = styles.socialIcon;
  switch (network) {
    case "facebook":
      return <IconSocialFacebook className={className} size={size} aria-hidden />;
    case "instagram":
      return <IconSocialInstagram className={className} size={size} aria-hidden />;
    case "telegram":
      return <IconSocialTelegram className={className} size={size} aria-hidden />;
    case "x":
      return <IconSocialX className={className} size={size} aria-hidden />;
    case "linkedin":
      return <IconSocialLinkedIn className={className} size={size} aria-hidden />;
    case "youtube":
      return <IconSocialYouTube className={className} size={size} aria-hidden />;
    default:
      return null;
  }
}

type MenuFooterProps = {
  socialLinks: MenuSocialLink[];
  hotlineLabel: string;
  hotlineValue: string;
  hotlineHref: string;
  email: string;
  emailHref: string;
  /** Mobile drawer — 20px icons in 36px chips (Figma 1149:24173). */
  socialIconSize?: number;
  /** Tablet drawer — contacts in one row (Figma 1150:24977). */
  layout?: "stacked" | "tablet";
};

export function MenuFooter({
  socialLinks,
  hotlineLabel,
  hotlineValue,
  hotlineHref,
  email,
  emailHref,
  socialIconSize = 24,
  layout = "stacked",
}: MenuFooterProps) {
  const footerClass = [
    styles.footer,
    layout === "tablet" ? styles.footerTablet : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={footerClass}>
      <div
        className={
          layout === "tablet" ? styles.socialRowTablet : styles.socialRow
        }
      >
        {socialLinks.map((link) => (
          <a
            key={link.network}
            href={link.href}
            className={styles.socialLink}
            aria-label={link.label}
          >
            <SocialIcon network={link.network} size={socialIconSize} />
          </a>
        ))}
      </div>
      <div
        className={
          layout === "tablet" ? styles.contactRowTablet : styles.contactRow
        }
      >
        <Button
          variant="contact"
          theme="dark"
          contactType="phone"
          contactLabel={hotlineLabel}
          href={hotlineHref}
          className={styles.contactChip}
        >
          {hotlineValue}
        </Button>
        <Button
          variant="contact"
          theme="dark"
          contactType="email"
          href={emailHref}
          className={styles.contactChip}
        >
          {email}
        </Button>
      </div>
    </div>
  );
}
