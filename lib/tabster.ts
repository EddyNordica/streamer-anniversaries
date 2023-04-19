import React from "react";
import { createTabster, disposeTabster, Types } from "tabster";

export const TabsterContext = React.createContext<Types.Tabster | null>(null);

export const useCreateTabster = (): Types.Tabster | null => {
  const [tabster, setTabster] = React.useState<Types.Tabster | null>(null);

  React.useEffect(() => {
    setTabster(createTabster(window));
    return () => {
      if (tabster != null) {
        disposeTabster(tabster);
      }
    };
  }, []);

  return tabster;
};

export const useTabster = (): Types.Tabster | null =>
  React.useContext(TabsterContext);
