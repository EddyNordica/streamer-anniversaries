import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { PageLayout } from "@/ui/layout/PageLayout";
import { TabsterContext, useCreateTabster } from "@/lib/tabster";

const App = ({ Component, pageProps }: AppProps) => {
  const tabster = useCreateTabster();
  return (
    <TabsterContext.Provider value={tabster}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </TabsterContext.Provider>
  );
};

export default appWithTranslation(App);
