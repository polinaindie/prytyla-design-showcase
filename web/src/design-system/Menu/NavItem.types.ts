import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/** Figma Nav item (3:7847) — part of Menu header. */
export type NavItemType = "link" | "dropdown";

type NavItemBase = {
  children: ReactNode;
  active?: boolean;
  className?: string;
};

export type NavItemLinkProps = NavItemBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    type?: "link";
    href: string;
  };

export type NavItemDropdownProps = NavItemBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> & {
    type: "dropdown";
    open?: boolean;
  };

export type NavItemProps = NavItemLinkProps | NavItemDropdownProps;
