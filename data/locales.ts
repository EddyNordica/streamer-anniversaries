export const Locales = ["ja", "en"] as const;

export type SupportedLocales = (typeof Locales)[number];

export enum Translations {
  siteNameHeading = "siteNameHeading",
  siteNameText = "siteNameText",
  agency = "agency",
  nijisanji = "nijisanji",
  hololive = "hololive",
  independent = "independent",
  numberOfDays = "numberOfDays",
  date = "date",
  birthday = "birthday",
  debut = "debut",
  birthdayTitle = "birthdayTitle",
  debutTitle = "debutTitle",
  today = "today",
  upcoming = "upcoming",
  unknown = "unknown",
  region = "region",
  regions = "regions",
  home = "home",
  about = "about",
  openMainMenu = "openMainMenu",
  search = "search",
  searchStreamers = "searchStreamers",
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
  noSelection = "noSelection",
  aboutThisSite = "aboutThisSite",
  terms = "terms",
  builtBy = "builtBy",
  sourceCode = "sourceCode",
  aboutThisSiteText = "aboutThisSiteText",
  termsText = "termsText",
  everyday = "everyday",
  hideGraduated = "hideGraduated",
  hideGraduatedScreenReader = "hideGraduatedScreenReader",
  graduated = "graduated",
  showFilters = "showFilters",
  localeDropdown = "localeDropdown",
}
