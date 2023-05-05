import { Translations } from "@/data/locales";
import { useSupportedLocale } from "@/lib/locale";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Types } from "tabster";
import { LocaleDropdown } from "../LocaleDropdown";
import { Nav } from "./Nav";
import { navigation, languageOptions } from "./Nav.types";
import { NavMenuList } from "./NavMenuList";
import { NavMenuListItem } from "./NavMenuListItem";
import classNames from "classnames";

export interface VerticalNavProps {
  close: () => void;
}

export const VerticalNav = (props: VerticalNavProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useSupportedLocale();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 h-full">
      <div className="flex h-16 shrink-0 items-center">
        <CalendarDaysIcon
          className="h-8 w-8 text-indigo-700"
          title={t(Translations.siteNameText) ?? undefined}
        />
      </div>
      <Nav className="flex flex-1 flex-col">
        <NavMenuList
          className="flex flex-1 flex-col gap-y-2"
          label={t(Translations.siteNameText ?? undefined)}
          keyboardingDirection={Types.MoverDirections.Vertical}
        >
          {navigation.map((navItem) => (
            <NavMenuListItem
              key={navItem.id}
              className={classNames(
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                router.pathname === navItem.link
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              )}
              iconClassName={classNames(
                "h-6 w-6 shrink-0",
                router.pathname === navItem.link
                  ? "text-indigo-600"
                  : "text-gray-400 group-hover:text-indigo-600"
              )}
              showIcon
              onInvoked={props.close}
              {...navItem}
            >
              {t(navItem.title)}
            </NavMenuListItem>
          ))}
          {locale != null && (
            <li role="none">
              <div className="text-xs font-semibold leading-6 text-gray-400 mt-2">
                {t(Translations.localeDropdownTitle)}
              </div>
              <LocaleDropdown
                selectedLocale={locale}
                items={languageOptions}
                alignment="left"
              />
            </li>
          )}
        </NavMenuList>
      </Nav>
    </div>
  );
};
