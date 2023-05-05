import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { Types } from "tabster";
import { LocaleDropdown } from "@/ui/widgets/LocaleDropdown";
import { Translations } from "@/data/locales";
import { useSupportedLocale } from "@/lib/locale";
import { Nav } from "./Nav";
import { navigation, languageOptions } from "./Nav.types";
import { NavMenuList } from "./NavMenuList";

export const HorizontalNav = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = useSupportedLocale();

  return (
    <div className="flex w-full">
      <div className="flex flex-shrink-0 items-center">
        <CalendarDaysIcon
          className="h-8 w-8 text-indigo-700"
          aria-hidden
          title={t(Translations.siteNameText) ?? undefined}
        />
      </div>
      <Nav className="hidden sm:flex items-center w-full">
        <NavMenuList
          className="flex sm:ml-6 sm:space-x-8 h-full w-full"
          label={t(Translations.siteNameText ?? undefined)}
          keyboardingDirection={Types.MoverDirections.Horizontal}
        >
          {navigation.map((navItem) => (
            <li key={navItem.id} role="none">
              <Link
                key={navItem.id}
                role="menuitem"
                href={navItem.link}
                className={classNames(
                  "inline-flex items-center h-full border-b-2 px-1 pt-1 text-sm font-medium outline-offset-[-1px]",
                  router.pathname === navItem.link
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {t(navItem.title)}
              </Link>
            </li>
          ))}
          {locale != null && (
            <li className="inline-flex items-center !ml-auto" role="none">
              <LocaleDropdown selectedLocale={locale} items={languageOptions} />
            </li>
          )}
        </NavMenuList>
      </Nav>
    </div>
  );
};
