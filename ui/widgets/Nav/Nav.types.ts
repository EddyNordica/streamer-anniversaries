import { Locales, Translations } from "@/data/locales";
import { getLanguageName } from "@/lib/locale";
import { HomeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { LocaleDropdownMenuItem } from "../LocaleDropdown";

export const languageOptions: LocaleDropdownMenuItem[] = Locales.map(
  (locale) => ({
    id: locale,
    name: getLanguageName(locale),
    locale,
  })
);

export interface NavigationItem {
  id: string;
  title: string;
  link: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  >;
}

export const navigation: NavigationItem[] = [
  {
    id: "home",
    title: Translations.home,
    link: "/",
    icon: HomeIcon,
  },
  {
    id: "about",
    title: Translations.about,
    link: "/about",
    icon: InformationCircleIcon,
  },
];
