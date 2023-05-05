import React from "react";
import { createTabster, disposeTabster, Types } from "tabster";

export const TabsterContext = React.createContext<Types.Tabster | null>(null);

export const useCreateTabster = (): Types.Tabster | null => {
  const [tabster, setTabster] = React.useState<Types.Tabster | null>(null);

  React.useEffect(
    () => {
      setTabster(createTabster(window));
      return () => {
        if (tabster != null) {
          disposeTabster(tabster);
        }
      };
    },
    // This must be initialized only once per window. Otherwise, the Tabster
    // component will cause an infinite loop.
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return tabster;
};

export interface TabsterProps {
  initializer: (tabster: Types.Tabster) => void;
}

export const Tabster = (props: React.PropsWithChildren<TabsterProps>) => {
  const tabster = React.useContext(TabsterContext);
  const [initialized, setInitialized] = React.useState(false);

  const initializer = props.initializer;
  React.useEffect(() => {
    if (tabster != null) {
      initializer(tabster);
      setInitialized(true);
    }
  }, [tabster, initializer]);

  if (tabster == null || !initialized) {
    return null;
  }

  return <>{props.children}</>;
};
