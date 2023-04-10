import { DeepReadonly } from "ts-essentials";
import {
  Streamer,
  StreamerAnniversary,
  StreamerRegion,
} from "@/data/streamers.types";
import {
  createDateComparator,
  convertToNormalizedTime,
  convertUnixTimeToDays,
  calculateAnniversaryAge,
} from "./date";
import { isNonEmptyString } from "@/utils/string";
import { Translations } from "@/data/locales";

export interface StreamerData {
  /**
   * The streamer.
   */
  streamer: Streamer;

  /**
   * The number of days to the anniversary.
   */
  days?: number;

  /**
   * THe age of the anniversary.
   */
  age?: number;
}

export interface SortedSteamers {
  /**
   * The list of streamers having the anniversary today.
   */
  today: DeepReadonly<StreamerData[]>;

  /**
   * The list of streamers where the anniversary is upcoming,
   * sorted in ascending order based on the number of days to the anniversary.
   */
  upcoming: DeepReadonly<StreamerData[]>;

  /**
   * The list of streamers that have not disclosed the date of the anniversary.
   */
  unknown: DeepReadonly<StreamerData[]>;
}

/**
 * Sorts the list of streamers based on the specified anniversary and the target
 * date.
 */
export const sortStreamers = (
  streamers: Streamer[],
  anniversary: StreamerAnniversary,
  targetDate: Date
): SortedSteamers => {
  const today: StreamerData[] = [];
  const upcoming: StreamerData[] = [];
  const unknown: StreamerData[] = [];
  const sortedStreamers = streamers.sort(
    createDateComparator(anniversary, targetDate)
  );

  for (const streamer of sortedStreamers) {
    const dateString = streamer.anniversaries[anniversary];

    if (dateString == null) {
      unknown.push({ streamer });
    } else {
      const normalizedTime = convertToNormalizedTime(
        dateString,
        anniversary,
        targetDate
      );
      const diff = normalizedTime - targetDate.valueOf();
      const days = convertUnixTimeToDays(diff);

      if (days > 0) {
        upcoming.push({
          streamer,
          days,
          age: calculateAnniversaryAge(dateString, anniversary, targetDate),
        });
      } else if (days < 0) {
        throw new Error(
          "The difference should never be 0 since past dates should have been adjusted to the next year."
        );
      } else {
        today.push({ streamer });
      }
    }
  }

  const data: SortedSteamers = {
    today,
    upcoming,
    unknown,
  };

  return data;
};

/**
 * Gets the translation key for the specified anniversary.
 */
export const getAnniversaryName = (
  anniversary: StreamerAnniversary
): Translations => {
  switch (anniversary) {
    case "birthday":
      return Translations.birthday;
    case "debut":
      return Translations.debut;
  }
};

/**
 * Gets the translation key for the specified region
 */
export const getRegionName = (region: StreamerRegion): Translations => {
  switch (region) {
    case "jp":
      return Translations.japan;
    case "en":
      return Translations.english;
    case "id":
      return Translations.indonesia;
    case "in":
      return Translations.india;
    case "kr":
      return Translations.korea;
    case "cn":
      return Translations.china;
  }
};

/**
 * Filters the streamers based on the specified search query.
 */
export const filterStreamers = (
  streamers: DeepReadonly<Streamer[]>,
  searchQuery: string | undefined,
  regions: StreamerRegion[] | undefined
): DeepReadonly<Streamer[]> => {
  if (!isNonEmptyString(searchQuery) && regions?.length === 0) {
    return streamers;
  }

  let filtered: DeepReadonly<Streamer[]> = [...streamers];

  if (isNonEmptyString(searchQuery)) {
    filtered = filtered.filter((streamer) => {
      const names = Object.values(streamer.name);
      for (const name of names) {
        if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
      }
    });
  }

  if (regions != null && regions.length > 0) {
    filtered = filtered.filter(
      (streamer) => regions.indexOf(streamer.region) >= 0
    );
  }

  return filtered;
};
