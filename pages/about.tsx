import React from "react";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans, useTranslation } from "next-i18next";
import { Translations } from "@/data/locales";
import { isNonEmptyString } from "@/utils/string";
import { SegmentedText } from "@/ui/components/SegmentedText";

export default function About() {
  const { t } = useTranslation();

  return (
    <main>
      <h1 className="text-2xl sm:text-4xl font-semibold leading-7 text-gray-900 mb-6">
        {
          <Trans
            i18nKey={Translations.siteNameHeading}
            components={{
              span: <SegmentedText />,
            }}
          />
        }
      </h1>

      <div className="space-y-12">
        <div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {t(Translations.aboutThisSite)}
          </h2>
          <p className="text-base leading-7 text-gray-700 mb-4">
            <Trans
              i18nKey={Translations.aboutThisSiteText}
              components={{
                a: (
                  <a
                    href="https://twitter.com/ShizuRin23/status/1644241090093133824"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    target="_blank"
                  />
                ),
              }}
            />
          </p>
          <ul role="list">
            <li>
              <span>{t(Translations.builtBy)}: </span>
              <span>
                Eddy (
                <a
                  href="https://twitter.com/Eddy_Nordica"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  target="_blank"
                >
                  Twitter
                </a>
                )
              </span>
            </li>
            <li>
              <span>{t(Translations.sourceCode)}: </span>
              <span>
                <a
                  href="https://github.com/EddyNordica/streamer-anniversaries"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  target="_blank"
                >
                  GitHub
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {t(Translations.terms)}
          </h2>
          <p>{t(Translations.termsText)}</p>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
      ...(isNonEmptyString(locale) ? await serverSideTranslations(locale) : {}),
    },
  };
};
