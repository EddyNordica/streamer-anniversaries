import React from "react";
import { Listbox } from "@headlessui/react";
import { SelectContent } from "./SelectContent";
import { Translations } from "@/data/locales";
import { useTranslation } from "next-i18next";
import { isNonEmptyString } from "@/utils/string";

export interface SelectItem<T> {
  id: string;
  text: string;
  value: T;
}

export interface MultiSelectProps<T> {
  name: string;
  label: string;
  items: SelectItem<T>[];
  onSelected: (selection: T[]) => void;
  defaultItemIds?: string[];
}

const NoSelectionSymbol = "_";

export const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
  const { t } = useTranslation();

  if (props.items.length === 0) {
    throw new Error("No items were specified for Select.");
  }

  const [selectedItems, setSelectedItems] = useSelectedItems(
    props.items,
    props.items.filter(
      (item) => props.defaultItemIds != null && item.id in props.defaultItemIds
    )
  );

  const buttonText = selectedItems
    .sort(
      (a: SelectItem<T>, b: SelectItem<T>) =>
        props.items.indexOf(a) - props.items.indexOf(b)
    )
    .map((item) => item.text)
    .join(", ");

  return (
    <Listbox
      value={selectedItems}
      onChange={(items: SelectItem<T>[]) => {
        setSelectedItems(items);
        props.onSelected(items.map((item) => item.value));
      }}
      multiple
    >
      {({ open }) => (
        <>
          <SelectContent
            name={props.name}
            label={props.label}
            buttonLabel={
              isNonEmptyString(buttonText)
                ? undefined
                : t(Translations.noSelection) ?? undefined
            }
            buttonText={buttonText || NoSelectionSymbol}
            items={props.items}
            open={open}
          />
        </>
      )}
    </Listbox>
  );
};

const useSelectedItems = <T,>(
  items: SelectItem<T>[],
  initialValues: SelectItem<T>[]
): [SelectItem<T>[], (items: SelectItem<T>[]) => void] => {
  const [selectedItems, setSelectedItems] =
    React.useState<SelectItem<T>[]>(initialValues);

  // This hook needs to re-run when the items change because they can also
  // change when the locale was updated.
  const selectedItemIds = selectedItems.map((item) => item.id);
  React.useEffect(() => {
    const newItems: SelectItem<T>[] = [];
    for (const item of items) {
      if (selectedItemIds.findIndex((itemId) => itemId === item.id) >= 0) {
        newItems.push(item);
      }
    }

    setSelectedItems(newItems);

    // For the dependency, use the array of IDs rather than passing the selected
    // items because that would cause an infinite loop. This hook should only
    // run when the items and the selected items change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedItemIds.join()]);

  return [selectedItems, setSelectedItems];
};
