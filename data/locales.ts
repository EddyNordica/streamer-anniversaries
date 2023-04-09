import { Buildable, DeepReadonly } from "ts-essentials";

export const Locales = ["ja", "en"] as const;

export type SupportedLocales = (typeof Locales)[number];

type LanguageData = DeepReadonly<Record<SupportedLocales, string>>;
const createLanguageNameData = (): LanguageData => {
  const data: Buildable<LanguageData> = {};
  const getLanguageName = (locale: SupportedLocales): string => {
    switch (locale) {
      case "ja":
        return "日本語";
      case "en":
        return "English";
    }
  };

  for (const locale of Locales) {
    data[locale] = getLanguageName(locale);
  }

  return data as LanguageData;
};

export const Languages: LanguageData = createLanguageNameData();

export enum Translations {
  streamerAnniversaryTracker = "streamerAnniversaryTracker",
  agency = "agency",
  nijisanji = "nijisanji",
  hololive = "hololive",
  independent = "independent",
  numberOfDays = "numberOfDays",
  date = "date",
  birthday = "birthday",
  debut = "debut",
  today = "today",
  upcoming = "upcoming",
  unknown = "unknown",
  region = "region",
  home = "home",
  about = "about",
  openMainMenu = "openMainMenu",
  search = "search",
  japan = "japan",
  english = "english",
  indonesia = "indonesia",
  india = "india",
  korea = "korea",
  china = "china",
  anniversary = "anniversary",
  anniversaryAge = "anniversaryAge",
  anniversaryAgeUnit = "anniversaryAgeUnit",
  daysUnit = "daysUnit",
  numberOfResults = "numberOfResults",
  aboutThisSite = "aboutThisSite",
  terms = "terms",
  privacyPolicy = "privacyPolicy",
  builtBy = "builtBy",
  sourceCode = "sourceCode",
  aboutThisSiteTextOne = "aboutThisSiteTextOne",
  aboutThisSiteTextTwo = "aboutThisSiteTextTwo",
  aboutThisSiteTextThree = "aboutThisSiteTextThree",
  termsText = "termsText",
  privacyPolicyText = "privacyPolicyText",
}
