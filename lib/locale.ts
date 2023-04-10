import { useTranslation } from "next-i18next";
import { SupportedLocales } from "@/data/locales";
import { isNonEmptyString } from "@/utils/string";

export const getLanguageName = (locale: SupportedLocales): string => {
  switch (locale) {
    case "ja":
      return "日本語";
    case "en":
      return "English";
  }
};

export const useSupportedLocale = (): SupportedLocales | undefined => {
  const { i18n } = useTranslation();

  const locale = i18n.language;
  return isNonEmptyString(locale) ? (locale as SupportedLocales) : undefined;
};
