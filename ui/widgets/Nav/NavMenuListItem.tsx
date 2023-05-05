import React from "react";
import Link from "next/link";
import { NavigationItem } from "./Nav.types";

export interface NavMenuListItemProps extends NavigationItem {
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  onInvoked?: () => void;
}

export const NavMenuListItem = (
  props: React.PropsWithChildren<NavMenuListItemProps>
) => {
  return (
    <li role="none">
      <Link
        href={props.link}
        role="menuitem"
        className={props.className}
        onClick={props.onInvoked}
      >
        {props.showIcon && (
          <props.icon className={props.iconClassName} aria-hidden="true" />
        )}
        {props.children}
      </Link>
    </li>
  );
};
