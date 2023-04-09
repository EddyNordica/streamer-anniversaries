import React from "react";

export const PageContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {props.children}
    </div>
  );
};
