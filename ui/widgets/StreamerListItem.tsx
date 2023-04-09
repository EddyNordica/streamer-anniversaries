import React from "react";
import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import { Translations } from "@/data/locales";
import { StreamerAgency, StreamerRegion } from "@/data/streamers.types";
import { convertToLocaleShortDate } from "@/lib/date";
import { getRegionName } from "@/lib/streamers";

export interface StreamerListItemProps {
  name: string;
  imageUrl: string;
  date: string | null;
  days?: number;
  age?: number;
  agency: StreamerAgency;
  region: StreamerRegion;
}

export const StreamerListItem = (props: StreamerListItemProps) => {
  return (
    <li
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      tabIndex={0}
    >
      <StreamerCard {...props} />
    </li>
  );
};

const StreamerCard = (props: StreamerListItemProps) => {
  const { t } = useTranslation();
  const [src, setSrc] = React.useState(`/images/streamers/${props.imageUrl}`);

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
        {props.age != null && (
          <>
            <dt className="sr-only">{t(Translations.anniversaryAge)}</dt>
            <dd className="text-sm text-gray-500">
              <Trans
                i18nKey={Translations.anniversaryAgeUnit}
                values={{ age: props.age }}
              />
            </dd>
          </>
        )}
        <dt className="sr-only">{t(Translations.date)}</dt>
        <dd className="text-sm text-gray-500">
          {props.date != null
            ? convertToLocaleShortDate(props.date)
            : t(Translations.unknown)}
        </dd>
        <dt className="sr-only">{t(Translations.agency)}</dt>
        <dd className="mt-3">
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {t(props.agency)}
          </span>
        </dd>
        <div className="absolute top-0 right-3">
          <dt className="sr-only">{t(Translations.region)}</dt>
          <dd className="mt-3">
            <span
              title={t(getRegionName(props.region)) ?? undefined}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
            >
              {t(props.region).toUpperCase()}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
};
