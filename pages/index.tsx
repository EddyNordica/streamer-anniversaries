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
import { Translations } from "@/data/locales";
import {
  SortedSteamers,
  sortStreamers,
  filterStreamers,
} from "@/lib/streamers";
import { isNonEmptyString } from "@/utils/string";
import {
  StreamerSearchForm,
  useStreamerSearchForm,
} from "@/ui/widgets/StreamerSearchForm";
import { StreamerListRenderer } from "@/ui/widgets/StreamerListRenderer";

// const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  streamers: DeepReadonly<Streamer[]>;
}

export default function Home(props: HomeProps) {
  const { t } = useTranslation();

  const [
    [anniversary, setAnniversary],
    [regions, setRegions],
    [hideGraduated, setHideGraduated],
    [searchQuery, setSearchQuery],
  ] = useStreamerSearchForm();
  const streamers = useSortedStreamers(
    props.streamers,
    anniversary,
    regions,
    hideGraduated,
    searchQuery
  );

  return (
    <main>
      <h1 className="text-2xl sm:text-4xl font-semibold leading-7 text-gray-900">
        {t(Translations.streamerAnniversaryTracker)}
      </h1>

      <StreamerSearchForm
        setAnniversary={setAnniversary}
        setRegions={setRegions}
        setHideGraduated={setHideGraduated}
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

const useSortedStreamers = (
  allStreamers: DeepReadonly<Streamer[]>,
  anniversary: StreamerAnniversary,
  regions: StreamerRegion[],
  hideGraduated: boolean,
  searchQuery: string | undefined
): SortedSteamers | undefined => {
  const [sortedStreamers, setSortedStreamers] =
    React.useState<SortedSteamers>();

  // This needs to run inside an effect hook to prevent a React hydration error because
  // it depends on the current time which will be always different on the server and client.
  React.useEffect(() => {
    // Use the toDateString method to remove the time from today's date as it is
    // irrelevant in calculations. Not only that, but the calculations assumes
    // the target date does not have time specified.
    const currentDate = new Date(new Date().toDateString());
    const targetStreamers = filterStreamers(
      allStreamers,
      searchQuery,
      regions,
      hideGraduated
    );
    setSortedStreamers(
      sortStreamers([...targetStreamers], anniversary, currentDate)
    );
  }, [allStreamers, anniversary, regions, hideGraduated, searchQuery]);

  return sortedStreamers;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(isNonEmptyString(locale) ? await serverSideTranslations(locale) : {}),
      streamers: Streamers,
    },
  };
};
