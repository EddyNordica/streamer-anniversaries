import React from "react";
import { DeepReadonly } from "ts-essentials";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
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
import {
  StreamerListRenderer,
  getAnniversaryTitle,
} from "@/ui/widgets/StreamerList/StreamerListRenderer";
import { NoStreamersFound } from "@/ui/widgets/StreamerList/NoStreamersFound";
import { removeTime } from "@/lib/date";
import { Container } from "@/ui/layout/Container";
import { PageLayout } from "@/ui/layout/PageLayout";

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
    <PageLayout pageTitle={null}>
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Command Bar */}
        <StreamerSearchForm
          anniversary={anniversary}
          setAnniversary={setAnniversary}
          regions={regions}
          setRegions={setRegions}
          hideGraduated={hideGraduated}
          setHideGraduated={setHideGraduated}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content */}
        {streamers != null && (
          <div className="flex-1 h-full min-h-0 overflow-y-auto">
            <div className="sr-only" aria-live="polite">
              {t(Translations.numberOfResults, {
                count:
                  streamers.today.length +
                  streamers.upcoming.length +
                  streamers.unknown.length,
              })}
            </div>

            <Container>
              <StreamerListRenderer
                title={t(Translations.today, {
                  anniversary: t(getAnniversaryTitle(anniversary)),
                })}
                streamers={streamers.today}
                anniversary={anniversary}
              />

              <StreamerListRenderer
                title={t(Translations.upcoming, {
                  anniversary: t(getAnniversaryTitle(anniversary)),
                })}
                streamers={streamers.upcoming}
                anniversary={anniversary}
              />

              <StreamerListRenderer
                title={t(Translations.unknown)}
                streamers={streamers.unknown}
                anniversary={anniversary}
              />

              {streamers.today.length === 0 &&
                streamers.upcoming.length === 0 &&
                streamers.unknown.length === 0 && <NoStreamersFound />}
            </Container>
          </div>
        )}
      </div>
    </PageLayout>
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
    const currentDate = removeTime(new Date());
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
