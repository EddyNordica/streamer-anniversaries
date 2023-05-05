import React from "react";
import { getTabsterAttribute, Types } from "tabster";

export interface NavMenuListProps {
  label: string;
  className?: string;
  keyboardingDirection: Types.MoverDirection;
}

export const NavMenuList = (
  props: React.PropsWithChildren<NavMenuListProps>
) => {
  return (
    <ul
      className={props.className}
      role="menubar"
      aria-label={props.label}
      {...getTabsterAttribute({
        mover: {
          direction: props.keyboardingDirection,
        },
      })}
    >
      {props.children}
    </ul>
  );
};
