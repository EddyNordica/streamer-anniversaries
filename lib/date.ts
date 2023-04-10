import { SupportedLocales } from "@/data/locales";
import { HasAnniversaries, StreamerAnniversary } from "@/data/streamers.types";
import { isNonEmptyString } from "@/utils/string";

const MilliSecondsInADay = 86400000;
const MilliSecondsInAYear = 31536000000;

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
      return new Date(`${targetYear}/${dateString}`);
    case "debut":
      return new Date(dateString.replace(/^[0-9]{4}/, `${targetYear}`));
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
        targetDate.valueOf() - new Date(dateString).valueOf()
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
  return new Date(dateString).toLocaleDateString(locale, {
    year: anniversary === "debut" ? "numeric" : undefined,
    month: "long",
    day: "numeric",
  });
};
