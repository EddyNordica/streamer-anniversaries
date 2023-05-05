import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { SupportedLocales, Translations } from "@/data/locales";
import { getLanguageName } from "@/lib/locale";

export interface LocaleDropdownMenuItem {
  id: string;
  name: string;
  locale: SupportedLocales;
}

export interface LocaleDropdownProps {
  selectedLocale: SupportedLocales;
  items: LocaleDropdownMenuItem[];
  alignment?: "right" | "left";
}

export const LocaleDropdown = (props: LocaleDropdownProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left" role="menuitem">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label={
            t(Translations.localeDropdownLabel, {
              lang: getLanguageName(props.selectedLocale),
            }) ?? undefined
          }
          title={t(Translations.localeDropdown)}
        >
          <GlobeAltIcon className="mr-1 h-5 w-5" />
          {props.selectedLocale.toUpperCase()}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            {
              "right-0":
                props.alignment === "right" || props.alignment === undefined,
            },
            { "left-0": props.alignment === "left" }
          )}
        >
          <div className="py-1">
            {props.items.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <Link
                    href={router.pathname}
                    locale={item.locale}
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
