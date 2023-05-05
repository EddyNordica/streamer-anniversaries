import React from "react";
import Head from "next/head";
import { Trans } from "next-i18next";
import { useTranslation } from "next-i18next";
import { Translations } from "@/data/locales";
import { SegmentedText } from "@/ui/components/SegmentedText";
import { Container } from "@/ui/layout/Container";

export const ActionBarContainerContext =
  React.createContext<HTMLDivElement | null>(null);

interface PageLayoutProps {
  pageTitle: string | null;
  hasActionBar?: boolean;
}

export const PageLayout = (props: React.PropsWithChildren<PageLayoutProps>) => {
  const { t } = useTranslation();
  const actionBarContainerRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Head>
        <title>{`${props.pageTitle === null ? "" : `${props.pageTitle} - `}${t(
          Translations.siteNameText
        )}`}</title>
      </Head>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Page Title */}
        <div className="py-2 sm:py-4 short:py-2 flex-none">
          <Container>
            <div className="flex flex-wrap items-center sm:flex-nowrap">
              <h1 className="text-base phone:text-2xl font-semibold leading-7 text-gray-900">
                {
                  <Trans
                    i18nKey={Translations.siteNameHeading}
                    components={{
                      span: <SegmentedText />,
                    }}
                  />
                }
              </h1>
              <div
                className="flex items-center ml-auto"
                ref={actionBarContainerRef}
              ></div>
            </div>
          </Container>
        </div>

        {/* Page Content */}
        <ActionBarContainerContext.Provider
          value={actionBarContainerRef.current}
        >
          <div className="flex-1 overflow-y-auto">{props.children}</div>
        </ActionBarContainerContext.Provider>
      </div>
    </>
  );
};
