import React from "react";
import { useTranslation } from "next-i18next";
import { getMover, getTabsterAttribute, Types } from "tabster";
import { Translations } from "@/data/locales";
import { Tabster } from "@/lib/tabster";

const tabsterInitializer = (tabster: Types.Tabster) => getMover(tabster);

export interface StreamerListProps {
  title: string;
  count: number;
}

export const StreamerList = (
  props: React.PropsWithChildren<StreamerListProps>
) => {
  const { t } = useTranslation();

  return (
    <Tabster initializer={tabsterInitializer}>
      <div className="py-4" {...getTabsterAttribute({ root: {} })}>
        <h2 className="text-2xl mb-4">{props.title}</h2>
        <ul
          role="list"
          aria-label={`${props.title}, ${t(Translations.numItems, {
            count: props.count,
          })}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          {...getTabsterAttribute({
            mover: {
              direction: Types.MoverDirections.Grid,
              memorizeCurrent: true,
            },
          })}
        >
          {props.children}
        </ul>
      </div>
    </Tabster>
  );
};
