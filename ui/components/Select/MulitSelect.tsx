import React from "react";
import { Listbox } from "@headlessui/react";
import { SelectContent } from "./SelectContent";

export interface SelectItem<T> {
  id: string;
  text: string;
  value: T;
}

export interface MultiSelectProps<T> {
  label: string;
  items: SelectItem<T>[];
  onSelected: (selection: T[]) => void;
  defaultItemIds?: string[];
}

export const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
  if (props.items.length === 0) {
    throw new Error("No items were specified for Select.");
  }

  const [selectedItems, setSelectedItems] = React.useState<SelectItem<T>[]>(
    props.items.filter(
      (item) => props.defaultItemIds != null && item.id in props.defaultItemIds
    )
  );

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
            label={props.label}
            buttonText={
              selectedItems
                .sort(
                  (a: SelectItem<T>, b: SelectItem<T>) =>
                    props.items.indexOf(a) - props.items.indexOf(b)
                )
                .map((item) => item.text)
                .join(", ") || "_"
            }
            items={props.items}
            open={open}
          />
        </>
      )}
    </Listbox>
  );
};
