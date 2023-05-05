import React from "react";

export const Container = (props: React.PropsWithChildren) => {
  return (
    <div className="max-w-md sm:container mx-auto px-4 sm:px-6 lg:px-8">
      {props.children}
    </div>
  );
};
