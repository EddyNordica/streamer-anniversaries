import { SupportedLocales } from "@/data/locales";
import { StrictOmit } from "ts-essentials";

type AnniversaryYMDDate =
  `${number}${number}${number}${number}/${number}${number}/${number}${number}`;

type AnniversaryMDDate = `${number}${number}/${number}${number}`;

export const Anniversaries = ["birthday", "debut"] as const;
export type StreamerAnniversary = (typeof Anniversaries)[number];

/**
 * All supported anniversaries.
 */
interface Anniversaries extends Record<StreamerAnniversary, string | null> {
  /**
   * The birthday of a streamer.
   *
   * This date does not specify the year because it's sometimes impossible to
   * determine the next age based on this year alone due to some lores being too
   * fictional/unrealistic.
   *
   * Also, since the birthday is not always disclosed, the value can be null.
   */
  birthday: AnniversaryMDDate | null;

  /**
   * The date where the debut stream aired live.
   */
  debut: AnniversaryYMDDate;
}

/**
 * Represents an object that has anniversary data.
 */
export interface HasAnniversaries {
  anniversaries: Anniversaries;
}

export const Agency = ["nijisanji", "hololive", "independent"];
export type StreamerAgency = (typeof Agency)[number];

/**
 * The status fo a streamer.
 *
 * `active` - The streamer is active, and is officially part of an agency (if
 * the streamer is part of one). Those who are on hiatus are also included
 * in this category as long as they are expected to come back. For example,
 * 語部紡 is considered active because she never officially left Nijisanji.
 *
 * `ended` - The streamer who has decided to end the streaming career as
 * the current person/character. Usually, this means the person has graduated.
 * This does not include those who were forcibly terminated.
 */
export const Status = ["active", "ended"];
export type StreamerStatus = (typeof Status)[number];

export const Social = [
  "bilibili",
  "instagram",
  "niconico",
  "tiktok",
  "twitCasting",
  "twitch",
  "twitter",
  "weibo",
  "youtube",
];
export type StreamerSocial = (typeof Social)[number];

export const Regions = ["jp", "en", "id", "in", "kr", "cn"] as const;
export type StreamerRegion = (typeof Regions)[number];

interface BaseStreamer extends HasAnniversaries {
  id: string;
  imageUrl: string;
  agency: StreamerAgency;
  status: StreamerStatus;
  links: Partial<Record<StreamerSocial, `https://${string}`>>;
}

/**
 * Represents a streamer whose name is only available in Japanese or English.
 */
interface ENJPStreamer extends BaseStreamer {
  name: Record<SupportedLocales, string>;
  region: Extract<StreamerRegion, "jp" | "en" | "id" | "in">;
}

/**
 * Represents a streamer whose name is also available in Korean.
 */
interface KRStreamer extends BaseStreamer {
  name: Record<SupportedLocales | "kr", string>;
  region: Extract<StreamerRegion, "kr">;
}

/**
 * Represents a streamer whose name is also available in Chinese.
 */
interface CNStreamer extends BaseStreamer {
  name: Record<SupportedLocales | "cn", string>;
  region: Extract<StreamerRegion, "cn">;
}

/**
 * Represents a streamer.
 */
export type Streamer = ENJPStreamer | KRStreamer | CNStreamer;
