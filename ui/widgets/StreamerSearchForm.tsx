import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
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
import { MultiSelect } from "@/ui/components/Select/MulitSelect";
import { Toggle } from "@/ui/components/Toggle";

export interface StreamerSearchFormProps {
  setAnniversary: (anniversary: StreamerAnniversary) => void;
  setRegions: (regions: StreamerRegion[]) => void;
  setHideGraduated: (hide: boolean) => void;
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
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-6">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
          {/* Anniversary */}
          <div className="sm:col-span-3">
            <div className="mt-2">
              <Select<StreamerAnniversary>
                name="anniversary"
                label={t(Translations.anniversary)}
                items={anniversaries}
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
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <SearchBox
          label={t(Translations.searchStreamers)}
          onSearch={(query) => props.setSearchQuery(query)}
        />
      </div>
    </div>
  );
};

const getRegionsButtonText = (items: SelectItem<StreamerRegion>[]): string => {
  return items.map((item) => item.value.toUpperCase()).join(", ");
};

export const useStreamerSearchForm = (): [
  [
    StreamerAnniversary,
    React.Dispatch<React.SetStateAction<StreamerAnniversary>>
  ],
  [StreamerRegion[], React.Dispatch<React.SetStateAction<StreamerRegion[]>>],
  [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
] => {
  const anniversaryState = React.useState<StreamerAnniversary>("birthday");
  const regionState = React.useState<StreamerRegion[]>([]);
  const hideGraduatedState = React.useState(false);
  const searchQueryState = React.useState<string>();

  return [anniversaryState, regionState, hideGraduatedState, searchQueryState];
};
