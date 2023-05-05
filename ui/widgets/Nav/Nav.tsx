import React from "react";
import { useTranslation } from "next-i18next";
import { Types, getMover, getTabsterAttribute } from "tabster";
import { Translations } from "@/data/locales";
import { Tabster } from "@/lib/tabster";

const tabsterInitializer = (tabster: Types.Tabster) => getMover(tabster);

export interface NavProps {
  className?: string;
}

export const Nav = (props: React.PropsWithChildren<NavProps>) => {
  const { t } = useTranslation();

  return (
    <Tabster initializer={tabsterInitializer}>
      <nav
        aria-label={t(Translations.mainMenu) ?? undefined}
        className={props.className}
        {...getTabsterAttribute({ root: {} })}
      >
        {props.children}
      </nav>
    </Tabster>
  );
};
