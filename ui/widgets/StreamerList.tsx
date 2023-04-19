import { useTabster } from "@/lib/tabster";
import React from "react";
import { getMover, getTabsterAttribute, Types } from "tabster";

export interface StreamerListProps {
  title: string;
}

export const StreamerList = (
  props: React.PropsWithChildren<StreamerListProps>
) => {
  const tabster = useTabster();
  React.useEffect(() => {
    if (tabster != null) {
      getMover(tabster);
    }
  }, [tabster]);

  return (
    <div className="mt-4" {...getTabsterAttribute({ root: {} })}>
      <h2 className="text-2xl mb-4">{props.title}</h2>
      <ul
        role="list"
        aria-label={props.title}
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
  );
};
