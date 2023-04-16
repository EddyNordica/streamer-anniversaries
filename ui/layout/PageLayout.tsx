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
    <>
      <Head>
        <title>{t(Translations.siteName)}</title>
      </Head>
      <Header />
      <div className="bg-gray-100">
        <PageContainer>
          <div className="py-6">{props.children}</div>
        </PageContainer>
      </div>
      <Footer />
    </>
  );
};
