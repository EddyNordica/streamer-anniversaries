import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { appWithTranslation } from "next-i18next";
import { AppLayout } from "@/ui/layout/AppLayout";
import { TabsterContext, useCreateTabster } from "@/lib/tabster";

const App = ({ Component, pageProps }: AppProps) => {
  const tabster = useCreateTabster();
  return (
    <>
      <TabsterContext.Provider value={tabster}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </TabsterContext.Provider>
      <Analytics />
    </>
  );
};

export default appWithTranslation(App);
