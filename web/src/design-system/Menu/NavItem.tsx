import { IconChevronDown10 } from "../Icons";
import type {
  NavItemDropdownProps,
  NavItemLinkProps,
  NavItemProps,
} from "./NavItem.types";
import styles from "./NavItem.module.css";

function isDropdown(props: NavItemProps): props is NavItemDropdownProps {
  return props.type === "dropdown";
}

export function NavItem(props: NavItemProps) {
  const { children, active = false, className } = props;

  const typeClass = isDropdown(props) ? styles.typeDropdown : styles.typeLink;
  const open = isDropdown(props) && (props.open ?? active);
  const rootClass = [
    styles.root,
    typeClass,
    active ? styles.active : "",
    open ? styles.open : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const label = <span className={styles.label}>{children}</span>;

  if (isDropdown(props)) {
    const { open: _o, active: _a, type: _t, className: _c, ...buttonRest } = props;
    return (
      <button
        type="button"
        className={rootClass}
        aria-expanded={open}
        aria-current={active ? "true" : undefined}
        {...buttonRest}
      >
        {label}
        <IconChevronDown10
          className={[styles.chevron, open ? styles.chevronOpen : ""]
            .filter(Boolean)
            .join(" ")}
          size={10}
          aria-hidden
        />
      </button>
    );
  }

  const { href, type: _t, active: _a, className: _c, ...anchorRest } =
    props as NavItemLinkProps;

  return (
    <a
      href={href}
      className={rootClass}
      aria-current={active ? "page" : undefined}
      {...anchorRest}
    >
      {label}
    </a>
  );
}
