import React from "react";

export interface StreamerListProps {
  title: React.ReactNode;
  titleText: string;
}

export const StreamerList = (
  props: React.PropsWithChildren<StreamerListProps>
) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-4">{props.title}</h2>
      <ul
        role="list"
        aria-label={props.titleText}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {props.children}
      </ul>
    </div>
  );
};
