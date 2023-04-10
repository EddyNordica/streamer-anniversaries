import { StreamerAnniversary } from "@/data/streamers.types";
import { StreamerData } from "@/lib/streamers";
import { DeepReadonly } from "ts-essentials";
import { StreamerList } from "./StreamerList";
import { StreamerListItem } from "./StreamerListItem";
import { useSupportedLocale } from "@/lib/locale";

export interface StreamerListRenderer {
  title: string;
  streamers: DeepReadonly<StreamerData[]>;
  anniversary: StreamerAnniversary;
}

export const StreamerListRenderer = (props: StreamerListRenderer) => {
  const locale = useSupportedLocale();

  return (
    <>
      {props.streamers.length > 0 && locale != null && (
        <StreamerList title={props.title}>
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
