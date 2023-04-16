import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import {
  LocaleDropdown,
  LocaleDropdownMenuItem,
} from "@/ui/widgets/LocaleDropdown";
import { PageContainer } from "@/ui/layout/PageContainer";
import { Locales, Translations } from "@/data/locales";
import { getLanguageName, useSupportedLocale } from "@/lib/locale";

const languageOptions: LocaleDropdownMenuItem[] = Locales.map((locale) => ({
  id: locale,
  name: getLanguageName(locale),
  locale,
}));

interface NavigationItem {
  id: string;
  title: string;
  link: string;
}

const navigation: NavigationItem[] = [
  {
    id: "home",
    title: Translations.home,
    link: "/",
  },
  {
    id: "about",
    title: Translations.about,
    link: "/about",
  },
];

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useSupportedLocale();

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <PageContainer>
            <nav className="max-w-7xl">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" title={t(Translations.siteNameText) ?? ""}>
                      <CalendarDaysIcon className="h-8 w-8 text-indigo-700" />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((navItem) => (
                      <Link
                        key={navItem.id}
                        href={navItem.link}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          router.pathname === navItem.link
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {t(navItem.title)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {locale != null && (
                    <LocaleDropdown
                      selectedLocale={locale}
                      items={languageOptions}
                    />
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {locale != null && (
                    <LocaleDropdown
                      selectedLocale={locale}
                      items={languageOptions}
                    />
                  )}
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">
                      {t(Translations.openMainMenu)}
                    </span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </nav>
          </PageContainer>

          <Disclosure.Panel className="sm:hidden">
            <nav className="space-y-1 pb-3 pt-2">
              {navigation.map((navItem) => (
                <Disclosure.Button
                  key={navItem.id}
                  as={Link}
                  href={navItem.link}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    router.pathname === navItem.link
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {t(navItem.title)}
                </Disclosure.Button>
              ))}
            </nav>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
