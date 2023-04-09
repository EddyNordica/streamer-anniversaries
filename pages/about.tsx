import React from "react";
import { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Translations } from "@/data/locales";
import { isNonEmptyString } from "@/utils/string";

export default function About() {
  const { t } = useTranslation();

  return (
    <main>
      <h1 className="text-2xl sm:text-4xl font-semibold leading-7 text-gray-900 mb-6">
        {t(Translations.streamerAnniversaryTracker)}
      </h1>

      <div className="space-y-12">
        <div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {t(Translations.aboutThisSite)}
          </h2>
          <p className="text-base leading-7 text-gray-700 mb-4">
            {t(Translations.aboutThisSiteTextOne)}
          </p>
          <blockquote className="twitter-tweet">
            <p lang="ja" dir="ltr">
              どなたか！！！
              <br />
              にじさんじの○○の誕生日まであと○日！
              <br />
              とかお祝いごととか記念日までの
              <br />
              カウントダウン把握してるサイトとかのURLどこでしたっけ…！！！
            </p>
            &mdash; 静凛💜 (@ShizuRin23){" "}
            <a href="https://twitter.com/ShizuRin23/status/1644241090093133824?ref_src=twsrc%5Etfw">
              April 7, 2023
            </a>
          </blockquote>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
          <p className="text-base leading-7 text-gray-700 mb-4">
            {t(Translations.aboutThisSiteTextTwo)}
          </p>
          <p className="text-base leading-7 text-gray-700 mb-4">
            {t(Translations.aboutThisSiteTextThree)}
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
        <div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {t(Translations.privacyPolicy)}
          </h2>
          <p>{t(Translations.privacyPolicyText)}</p>
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
