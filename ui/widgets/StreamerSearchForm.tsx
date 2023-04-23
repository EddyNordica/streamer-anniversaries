import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { Disclosure } from "@headlessui/react";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
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
import { useLocaleSetting, booleanParser } from "@/lib/storage";

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
    <div className="mt-4">
      <Disclosure>
        <div className="flex justify-end">
          <Disclosure.Button className="inline-flex items-center gap-x-2 px-3.5 py-2.5 text-sm font-semibold shadow-sm rounded-md bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <AdjustmentsHorizontalIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            {t(Translations.showFilters)}
          </Disclosure.Button>
        </div>
        <Disclosure.Panel className="text-gray-500">
          <div className="border-b border-gray-900/10 pb-6">
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
              {/* Anniversary */}
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <Select<StreamerAnniversary>
                    name="anniversary"
                    label={t(Translations.anniversary)}
                    items={anniversaries}
                    defaultItem={anniversaries.find(
                      (anniversary) => anniversary.value === props.anniversary
                    )}
                    onSelected={props.setAnniversary}
                  />
                </div>
              </div>

              {/* Regions */}
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <MultiSelect<StreamerRegion>
                    name="regions"
                    label={t(Translations.regions)}
                    items={regions}
                    defaultItemIds={props.regions}
                    onSelected={props.setRegions}
                    getButtonText={getRegionsButtonText}
                  />
                </div>
              </div>

              {/* Show/Hide Graduated Toggle */}
              <div className="sm:col-span-3">
                <div className="mt-2">
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
                </div>
              </div>
            </div>

            {/* Search Box */}
            <SearchBox
              label={t(Translations.searchStreamers)}
              defaultValue={props.searchQuery}
              onSearch={(query) => props.setSearchQuery(query)}
            />
          </div>
        </Disclosure.Panel>
      </Disclosure>
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
    { defaultValue: "birthday", parser: anniversaryParser }
  );

  const regionsState = useLocaleSetting<StreamerRegion[]>("filter:regions", {
    defaultValue: [],
    parser: regionsParser,
  });

  const hideGraduatedState = useLocaleSetting<boolean>("filter:hideGraduated", {
    defaultValue: true,
    parser: booleanParser,
  });

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
