import React from "react";
import { useTranslation } from "next-i18next";
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

export interface StreamerSearchFormProps {
  setAnniversary: (anniversary: StreamerAnniversary) => void;
  setRegions: (regions: StreamerRegion[]) => void;
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
        text: t(getRegionName(region)),
        value: region,
      })),
    [t]
  );

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-6">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <div className="mt-2">
              <Select<StreamerAnniversary>
                label={t(Translations.anniversary)}
                items={anniversaries}
                onSelected={(anniversary) => props.setAnniversary(anniversary)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <div className="mt-2">
              <MultiSelect<StreamerRegion>
                label={t(Translations.region)}
                items={regions}
                onSelected={(regions) => {
                  props.setRegions(regions);
                }}
              />
            </div>
          </div>
        </div>
        <SearchBox
          label="Search for streamers by name."
          onSearch={(query) => props.setSearchQuery(query)}
        />
      </div>
    </div>
  );
};
