import React from "react";
import { StreamerAnniversary } from "@/data/streamers.types";
import { StreamerData } from "@/lib/streamers";
import { DeepReadonly } from "ts-essentials";
import { StreamerList } from "./StreamerList";
import { StreamerListItem } from "./StreamerListItem";
import { useSupportedLocale } from "@/lib/locale";
import { Translations } from "@/data/locales";

export interface StreamerListRendererProps {
  title: React.ReactNode;
  titleText: string;
  streamers: DeepReadonly<StreamerData[]>;
  anniversary: StreamerAnniversary;
}

export const StreamerListRenderer = (props: StreamerListRendererProps) => {
  const locale = useSupportedLocale();

  return (
    <>
      {props.streamers.length > 0 && locale != null && (
        <StreamerList title={props.title} titleText={props.titleText}>
          {props.streamers.map(({ streamer, days, age }) => {
            return (
              <StreamerListItem
                key={streamer.id}
                id={streamer.id}
                name={streamer.name[locale]}
                imageUrl={streamer.imageUrl}
                date={streamer.anniversaries[props.anniversary]}
                days={days}
                age={age}
                agency={streamer.agency}
                region={streamer.region}
                status={streamer.status}
              />
            );
          })}
        </StreamerList>
      )}
    </>
  );
};

/**
 * Gets the translation key for the specified anniversary title.
 */
export const getAnniversaryTitle = (
  anniversary: StreamerAnniversary
): Translations => {
  switch (anniversary) {
    case "birthday":
      return Translations.birthdayTitle;
    case "debut":
      return Translations.debutTitle;
  }
};
