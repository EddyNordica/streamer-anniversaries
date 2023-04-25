import { Translations } from "@/data/locales";
import { PageContainer } from "@/ui/layout/PageContainer";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900">
      <PageContainer>
        <div className="py-2 sm:py-4 flex items-center">
          <p className="text-center text-xs sm:text-base leading-5 text-gray-400 m-auto">
            <span>
              Made with{" "}
              <HeartIcon aria-label="love" className="inline h-4 w-4" /> by{" "}
            </span>
            <span className="text-gray-300 hover:underline">
              <a
                href="https://twitter.com/Eddy_Nordica"
                target="_blank"
                aria-label={t(Translations.eddyTwitter) ?? undefined}
              >
                Eddy
              </a>
            </span>
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};
