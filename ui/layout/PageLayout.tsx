import React from "react";
import Head from "next/head";
import { Header } from "@/ui/widgets/Header";
import { Footer } from "@/ui/widgets/Footer";
import { PageContainer } from "./PageContainer";
import { useTranslation } from "next-i18next";
import { Translations } from "@/data/locales";

export const PageLayout = (props: React.PropsWithChildren) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>{t(Translations.siteNameText)}</title>
      </Head>

      <div className="flex-none">
        <Header />
      </div>

      <div className="bg-gray-100 flex-1 overflow-y-auto">
        <PageContainer>
          <div className="py-6">{props.children}</div>
        </PageContainer>
      </div>

      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};
