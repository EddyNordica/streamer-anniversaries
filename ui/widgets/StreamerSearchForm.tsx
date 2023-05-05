import React from "react";
import ReactDOM from "react-dom";
import { Trans, useTranslation } from "next-i18next";
import { Disclosure } from "@headlessui/react";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Translations } from "@/data/locales";
import {
  Anniversaries,
  Regions,
  StreamerAnniversary,
  StreamerRegion,
} from "@/data/streamers.types";
import { getAnniversaryName, getRegionName } from "@/lib/streamers";
import { SearchBox } from "@/ui/components/SearchBox";
import { Select, SelectItem } from "@/ui/components/Select/Select";
import { MultiSelect } from "@/ui/components/Select/MultiSelect";
import { Toggle } from "@/ui/components/Toggle";
import {
  useLocaleSetting,
  booleanParser,
  StorageSettingsOptions,
} from "@/lib/storage";
import { Container } from "@/ui/layout/Container";
import { ActionBarContainerContext } from "@/ui/layout/PageLayout";

export interface StreamerSearchFormProps {
  anniversary: StreamerAnniversary;
  setAnniversary: (anniversary: StreamerAnniversary) => void;
  regions: StreamerRegion[];
  setRegions: (regions: StreamerRegion[]) => void;
  hideGraduated: boolean;
  setHideGraduated: (hide: boolean) => void;
  searchQuery: string | undefined;
  setSearchQuery: (query: string) => void;
}

export const StreamerSearchForm = (props: StreamerSearchFormProps) => {
  const { t } = useTranslation();
  const actionBarContainerRef = React.useContext(ActionBarContainerContext);

  const anniversaries = React.useMemo<SelectItem<StreamerAnniversary>[]>(
    () =>
      Anniversaries.map((anniversary) => ({
        id: anniversary,
        text: t(getAnniversaryName(anniversary)),
        value: anniversary,
      })),
    [t]
  );

  const regions = React.useMemo<SelectItem<StreamerRegion>[]>(
    () =>
      Regions.map((region) => ({
        id: region,
        text: `${t(getRegionName(region))} (${region.toUpperCase()})`,
        value: region,
      })),
    [t]
  );

  return (
    <Disclosure>
      {actionBarContainerRef != null &&
        ReactDOM.createPortal(
          <Disclosure.Button className="inline-flex items-center gap-x-2 px-3.5 py-2.5 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-50">
            <AdjustmentsHorizontalIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            {t(Translations.showFilters)}
          </Disclosure.Button>,
          actionBarContainerRef
        )}
      <Disclosure.Panel className="text-gray-500">
        <Container>
          <div className="border-b border-gray-900/10 pb-6">
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-9">
              {/* Anniversary */}
              <Column>
                <Select<StreamerAnniversary>
                  name="anniversary"
                  label={t(Translations.anniversary)}
                  items={anniversaries}
                  defaultItem={anniversaries.find(
                    (anniversary) => anniversary.value === props.anniversary
                  )}
                  onSelected={props.setAnniversary}
                />
              </Column>

              {/* Regions */}
              <Column>
                <MultiSelect<StreamerRegion>
                  name="regions"
                  label={t(Translations.regions)}
                  items={regions}
                  defaultItemIds={props.regions}
                  onSelected={props.setRegions}
                  getButtonText={getRegionsButtonText}
                />
              </Column>

              {/* Show/Hide Graduated Toggle */}
              <Column>
                <label
                  htmlFor="hideGraduated"
                  className="inline-flex flex-wrap text-sm font-medium leading-6 text-gray-900"
                >
                  <Trans
                    i18nKey={Translations.hideGraduated}
                    components={{
                      i: (
                        <AcademicCapIcon
                          className="h-4 w-4 self-center mx-1"
                          role="presentation"
                        />
                      ),
                    }}
                  />
                </label>
                <div className="relative mt-3">
                  <Toggle
                    name="hideGraduated"
                    label={t(Translations.hideGraduatedScreenReader)}
                    onToggled={props.setHideGraduated}
                    defaultChecked={props.hideGraduated}
                  />
                </div>
              </Column>

              {/* Search Box */}
              <Column className="sm:col-span-9">
                <SearchBox
                  label={t(Translations.searchStreamers)}
                  defaultValue={props.searchQuery}
                  onSearch={(query) => props.setSearchQuery(query)}
                />
              </Column>
            </div>
          </div>
        </Container>
      </Disclosure.Panel>
    </Disclosure>
  );
};

interface ColumnProps {
  className?: string;
}

const Column = (props: React.PropsWithChildren<ColumnProps>) => {
  return (
    <div className={classNames("sm:col-span-3", props.className)}>
      <div className="mt-2">{props.children}</div>
    </div>
  );
};

const getRegionsButtonText = (items: SelectItem<StreamerRegion>[]): string => {
  return items.map((item) => item.value.toUpperCase()).join(", ");
};

type SearchFormStates = [
  anniversaryState: [StreamerAnniversary, (value: StreamerAnniversary) => void],
  regionsState: [StreamerRegion[], (value: StreamerRegion[]) => void],
  hideGraduatedState: [boolean, (value: boolean) => void],
  searchQueryState: [string | undefined, (value: string | undefined) => void]
];

export const useStreamerSearchForm = (): SearchFormStates => {
  const anniversaryState = useLocaleSetting<StreamerAnniversary>(
    "filter:anniversary",
    anniversaryOptions
  );

  const regionsState = useLocaleSetting<StreamerRegion[]>(
    "filter:regions",
    regionsOptions
  );

  const hideGraduatedState = useLocaleSetting<boolean>(
    "filter:hideGraduated",
    hideGraduatedOptions
  );

  const searchQueryState = React.useState<string>();

  return [anniversaryState, regionsState, hideGraduatedState, searchQueryState];
};

const anniversaryParser = (
  value: string | undefined
): StreamerAnniversary | undefined => {
  return Anniversaries.includes(value as StreamerAnniversary)
    ? (value as StreamerAnniversary)
    : undefined;
};

const regionsParser = (
  value: string | undefined
): StreamerRegion[] | undefined => {
  if (value === undefined) {
    return [];
  }

  const regions = value.split(",");
  for (const region of regions) {
    if (!Regions.includes(region as StreamerRegion)) {
      return undefined;
    }
  }

  return regions as StreamerRegion[];
};

const anniversaryOptions: StorageSettingsOptions<StreamerAnniversary> = {
  defaultValue: "birthday",
  parser: anniversaryParser,
};

const regionsOptions: StorageSettingsOptions<StreamerRegion[]> = {
  defaultValue: [],
  parser: regionsParser,
};

const hideGraduatedOptions: StorageSettingsOptions<boolean> = {
  defaultValue: true,
  parser: booleanParser,
};
