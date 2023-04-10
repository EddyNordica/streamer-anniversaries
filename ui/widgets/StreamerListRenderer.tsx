import { SupportedLocales } from "@/data/locales";
import { StreamerAnniversary } from "@/data/streamers.types";
import { StreamerData } from "@/lib/streamers";
import { useTranslation } from "react-i18next";
import { DeepReadonly } from "ts-essentials";
import { StreamerList } from "./StreamerList";
import { StreamerListItem } from "./StreamerListItem";

export interface StreamerListRenderer {
  title: string;
  streamers: DeepReadonly<StreamerData[]>;
  anniversary: StreamerAnniversary;
}

export const StreamerListRenderer = (props: StreamerListRenderer) => {
  const { i18n } = useTranslation();

  return (
    <>
      {props.streamers.length > 0 && (
        <StreamerList title={props.title}>
          {props.streamers.map(({ streamer, days, age }) => {
            return (
              <StreamerListItem
                key={streamer.id}
                id={streamer.id}
                name={streamer.name[i18n.language as SupportedLocales]}
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
