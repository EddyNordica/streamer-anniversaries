import { useTranslation } from "next-i18next";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebouncedCallback } from "use-debounce";
import { Translations } from "@/data/locales";

interface SearchBoxProps {
  label: string;
  defaultValue?: string;
  onSearch: (text: string) => void;
}

export const SearchBox = (props: SearchBoxProps) => {
  const { t } = useTranslation();
  const debounced = useDebouncedCallback(
    (query: string) => props.onSearch(query),
    500
  );

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="search"
          id="search-box"
          aria-label={props.label}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={t(Translations.search) ?? undefined}
          defaultValue={props.defaultValue}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
            debounced(event.target.value)
          }
        />
      </div>
    </div>
  );
};
