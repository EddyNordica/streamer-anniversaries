import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { PageLayout } from "@/ui/layout/PageLayout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default appWithTranslation(App);
