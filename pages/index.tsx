import React from "react";
import { DeepReadonly } from "ts-essentials";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import { Streamers } from "@/data/streamers";
import {
  Streamer,
  StreamerAnniversary,
  StreamerRegion,
} from "@/data/streamers.types";
import { SupportedLocales, Translations } from "@/data/locales";
import {
  StreamerData,
  SortedSteamers,
  sortStreamers,
  filterStreamers,
} from "@/lib/streamers";
import { isNonEmptyString } from "@/utils/string";
import { StreamerList } from "@/ui/widgets/StreamerList";
import { StreamerListItem } from "@/ui/widgets/StreamerListItem";
import { StreamerSearchForm } from "@/ui/widgets/StreamerSearchForm";

// const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  streamers: DeepReadonly<Streamer[]>;
}

export default function Home(props: HomeProps) {
  const { t } = useTranslation();

  const [streamers, setStreamers] = React.useState<SortedSteamers>();
  const [anniversary, setAnniversary] =
    React.useState<StreamerAnniversary>("birthday");
  const [regions, setRegions] = React.useState<StreamerRegion[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>();

  // This needs to run inside an effect hook to prevent a React hydration error because
  // it depends on the current time which will be always different on the server and client.
  React.useEffect(() => {
    const currentDate = new Date();
    const targetStreamers = filterStreamers(
      props.streamers,
      searchQuery,
      regions
    );
    setStreamers(sortStreamers([...targetStreamers], anniversary, currentDate));
  }, [props.streamers, searchQuery, regions, anniversary]);

  return (
    <main>
      <h1 className="text-2xl sm:text-4xl font-semibold leading-7 text-gray-900">
        {t(Translations.streamerAnniversaryTracker)}
      </h1>

      <StreamerSearchForm
        setAnniversary={setAnniversary}
        setRegions={setRegions}
        setSearchQuery={setSearchQuery}
      />

      {streamers != null && (
        <>
          <div className="sr-only" aria-live="polite">
            <Trans
              i18nKey={Translations.numberOfResults}
              values={{
                count:
                  streamers.today.length +
                  streamers.upcoming.length +
                  streamers.unknown.length,
              }}
            />
          </div>

          <StreamerListRenderer
            title={t(Translations.today)}
            streamers={streamers.today}
            anniversary={anniversary}
          />

          <StreamerListRenderer
            title={t(Translations.upcoming)}
            streamers={streamers.upcoming}
            anniversary={anniversary}
          />

          <StreamerListRenderer
            title={t(Translations.unknown)}
            streamers={streamers.unknown}
            anniversary={anniversary}
          />
        </>
      )}
    </main>
  );
}

interface StreamerListRenderer {
  title: string;
  streamers: DeepReadonly<StreamerData[]>;
  anniversary: StreamerAnniversary;
}

const StreamerListRenderer = (props: StreamerListRenderer) => {
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
              />
            );
          })}
        </StreamerList>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(isNonEmptyString(locale) ? await serverSideTranslations(locale) : {}),
      streamers: Streamers,
    },
  };
};
