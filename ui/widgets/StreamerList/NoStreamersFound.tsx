import { Translations } from "@/data/locales";
import { useTranslation } from "next-i18next";
import { UsersIcon } from "@heroicons/react/24/outline";

export const NoStreamersFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center p-4">
      <UsersIcon
        className="mx-auto h-12 w-12 text-gray-400"
        aria-hidden="true"
      />
      <h2 className="mt-2 text-sm font-semibold text-gray-900">
        {t(Translations.noStreamersFound)}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {t(Translations.tryAdjustingFilters)}
      </p>
    </div>
  );
};
