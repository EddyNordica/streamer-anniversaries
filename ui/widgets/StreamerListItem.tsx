import React from "react";
import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import { SupportedLocales, Translations } from "@/data/locales";
import {
  StreamerAgency,
  StreamerRegion,
  StreamerStatus,
} from "@/data/streamers.types";
import { convertToLocaleDate } from "@/lib/date";
import { getRegionName } from "@/lib/streamers";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useSupportedLocale } from "@/lib/locale";

export interface StreamerListItemProps {
  id: string;
  name: string;
  imageUrl: string;
  date: string | null;
  days?: number;
  age?: number;
  agency: StreamerAgency;
  region: StreamerRegion;
  status: StreamerStatus;
}

export const StreamerListItem = (props: StreamerListItemProps) => {
  return (
    <li
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      tabIndex={0}
      // Enable this when needed. This lets tabster treat this list item as a
      // single entity, so arrow keys will jump to the next list item instead of
      // going inside a focusable item inside the list item.
      // {...getTabsterAttribute({
      //   groupper: {
      //     tabbability: Types.GroupperTabbabilities.LimitedTrapFocus,
      //   },
      // })}
    >
      <StreamerCard {...props} />
    </li>
  );
};

const StreamerCard = (props: StreamerListItemProps) => {
  const { t } = useTranslation();
  const [src, setSrc] = React.useState(`/images/streamers/${props.imageUrl}`);

  const locale = useSupportedLocale();
  const dateText = useDateText(props.date, props.id, locale);

  return (
    <div className="flex flex-1 flex-col p-8 relative">
      <Image
        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full border"
        src={src}
        alt={props.name}
        width={128}
        height={128}
        onError={() => setSrc("/assets/image-error.png")}
      />
      <div className="mt-6 text-sm text-gray-900 font-medium">{props.name}</div>
      <dl className="mt-1 flex flex-grow flex-col justify-between">
        {/* Number of Days to Anniversary */}
        {props.days != null && (
          <>
            <dt className="sr-only">{t(Translations.numberOfDays)}</dt>
            <dd>
              <Trans
                i18nKey={Translations.daysUnit}
                values={{ days: props.days }}
                components={{
                  span: <span />,
                  strong: <span className="text-4xl sm:text-3xl" />,
                }}
              />
            </dd>
          </>
        )}

        {/* Anniversary Age */}
        {props.age != null && (
          <>
            <dt className="sr-only">{t(Translations.anniversaryAge)}</dt>
            <dd className="text-sm text-gray-500">
              {t(Translations.anniversaryAgeUnit, { age: props.age })}
            </dd>
          </>
        )}

        {/* Anniversary Date */}
        <dt className="sr-only">{t(Translations.date)}</dt>
        <dd className="text-sm text-gray-500">{dateText}</dd>

        {/* Agency */}
        <dt className="sr-only">{t(Translations.agency)}</dt>
        <dd className="mt-3">
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {t(props.agency)}
          </span>
        </dd>

        {/* Region */}
        <div className="absolute top-0 right-3">
          <dt className="sr-only">{t(Translations.region)}</dt>
          <dd className="mt-3">
            <span
              title={t(getRegionName(props.region)) ?? undefined}
              aria-label={t(getRegionName(props.region)) ?? undefined}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 cursor-default"
            >
              {t(props.region).toUpperCase()}
            </span>
          </dd>
        </div>

        {/* Status */}
        {props.status === "ended" && (
          <div className="absolute top-0 left-3">
            <dt className="sr-only">{t(Translations.graduated)}</dt>
            <dd className="mt-3">
              <AcademicCapIcon
                title={t(Translations.graduated) ?? undefined}
                className="h-5 w-5 text-gray-500"
              />
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};

const useDateText = (
  dateString: string | null,
  id: string,
  locale: SupportedLocales | undefined
): string => {
  const { t } = useTranslation();

  if (dateString != null && locale != null) {
    return convertToLocaleDate(dateString, locale);
  }

  if (id === "fumino-tamaki") {
    return t(Translations.everyday);
  } else {
    return t(Translations.unknown);
  }
};
