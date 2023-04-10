import { SupportedLocales } from "@/data/locales";
import { HasAnniversaries, StreamerAnniversary } from "@/data/streamers.types";
import { isNonEmptyString } from "@/utils/string";

const MilliSecondsInADay = 86400000;
const MilliSecondsInAYear = 31536000000;

const hasNoYear = (dateString: string): boolean =>
  /^[0-9]{2}\/[0-9]{2}$/.test(dateString);

/**
 * Parses the date string and returns a Date instance.
 */
const parseDateString = (dateString: string): Date => {
  // Safari cannot parse dates that are not in YYYY/MM/DD format, so if the year
  // is missing, throw an exception.
  if (hasNoYear(dateString)) {
    throw new Error("The date string is missing a year.");
  }

  return new Date(dateString);
};

/**
 * Creates a Date instance representing the current date without time.
 */
export const createCurrentDateWithoutTime = (): Date =>
  // Use the toDateString method to remove the time from today's date as it is
  // irrelevant in calculations. Not only that, but the calculations assumes
  // the target date does not have time specified.
  new Date(new Date().toDateString());

/**
 * Modifies the date string to use the year of the target date.
 */
const parseToDateWithTargetYear = (
  dateString: string,
  anniversary: StreamerAnniversary,
  targetDate: Date
): Date => {
  const targetYear = targetDate.getFullYear();
  switch (anniversary) {
    case "birthday":
      return parseDateString(`${targetYear}/${dateString}`);
    case "debut":
      return parseDateString(dateString.replace(/^[0-9]{4}/, `${targetYear}`));
  }
};

/**
 * Converts the string to unix time, but if the specified date is before the
 * target date, an extra year is added to the time.
 */
export const convertToNormalizedTime = (
  dateString: string,
  anniversary: StreamerAnniversary,
  targetDate: Date
): number => {
  const date = parseToDateWithTargetYear(dateString, anniversary, targetDate);
  const dateValue = date.valueOf();
  const diff = dateValue - targetDate.valueOf();

  // When the difference is negative, it means the anniversary has already
  // passed this year, so add one extra year.
  return diff < 0
    ? date.setFullYear(date.getFullYear() + 1).valueOf()
    : dateValue;
};

/**
 * Get the comparator for anniversary dates.
 */
export const createDateComparator = (
  anniversary: StreamerAnniversary,
  targetDate: Date
): ((a: HasAnniversaries, b: HasAnniversaries) => number) => {
  return (a: HasAnniversaries, b: HasAnniversaries): number => {
    const dateStringA = a.anniversaries[anniversary];
    const dateStringB = b.anniversaries[anniversary];

    if (isNonEmptyString(dateStringA) && !isNonEmptyString(dateStringB)) {
      return 1;
    } else if (
      !isNonEmptyString(dateStringA) &&
      isNonEmptyString(dateStringB)
    ) {
      return -1;
    } else if (isNonEmptyString(dateStringA) && isNonEmptyString(dateStringB)) {
      return (
        convertToNormalizedTime(dateStringA, anniversary, targetDate) -
        convertToNormalizedTime(dateStringB, anniversary, targetDate)
      );
    } else {
      return 0;
    }
  };
};

/**
 * Converts the specified Unix time to days.
 */
export const convertUnixTimeToDays = (time: number) =>
  Math.ceil(time / MilliSecondsInADay);

/**
 * Converts the specified Unix time to years.
 */
export const convertUnixTimeToYears = (time: number) =>
  Math.ceil(time / MilliSecondsInAYear);

/**
 * Calculates the age of the anniversary.
 */
export const calculateAnniversaryAge = (
  dateString: string,
  anniversary: StreamerAnniversary,
  targetDate: Date
): number | undefined => {
  switch (anniversary) {
    case "birthday":
      return undefined;
    case "debut":
      return convertUnixTimeToYears(
        targetDate.valueOf() - parseDateString(dateString).valueOf()
      );
  }
};

/**
 * Converts the specified date string to a locale date.
 */
export const convertToLocaleDate = (
  dateString: string,
  anniversary: StreamerAnniversary,
  locale: SupportedLocales
): string => {
  // Use any year because it's only needed for birthday where the year is not
  // shown.
  const year = new Date().getFullYear();
  const dateStringWithYear = ensureYear(dateString, year);

  return parseDateString(dateStringWithYear).toLocaleDateString(locale, {
    year: anniversary === "debut" ? "numeric" : undefined,
    month: "long",
    day: "numeric",
  });
};

const ensureYear = (dateString: string, year: number): string => {
  if (hasNoYear(dateString)) {
    return `${year}/${dateString};`;
  }

  return dateString;
};
