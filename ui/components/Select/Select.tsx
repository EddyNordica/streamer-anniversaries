import React from "react";
import { Listbox } from "@headlessui/react";
import { SelectContent } from "./SelectContent";

export interface SelectItem<T> {
  id: string;
  text: string;
  value: T;
}

export interface SelectProps<T> {
  label: string;
  items: SelectItem<T>[];
  onSelected: (selection: T) => void;
  defaultItemId?: string;
}

export const Select = <T,>(props: SelectProps<T>) => {
  if (props.items.length === 0) {
    throw new Error("No items were specified for Select.");
  }

  const [selectedItem, setSelectedItem] = useSelectedItem(
    props.items,
    props.items.find((item) => item.id === props.defaultItemId) ??
      props.items[0]
  );

  return (
    <Listbox
      value={selectedItem}
      onChange={(item: SelectItem<T>) => {
        setSelectedItem(item);
        props.onSelected(item.value);
      }}
    >
      {({ open }) => (
        <SelectContent
          label={props.label}
          buttonText={selectedItem.text}
          items={props.items}
          open={open}
        />
      )}
    </Listbox>
  );
};

const useSelectedItem = <T,>(
  items: SelectItem<T>[],
  initialValue: SelectItem<T>
): [SelectItem<T>, (item: SelectItem<T>) => void] => {
  const [selectedItem, setSelectedItem] =
    React.useState<SelectItem<T>>(initialValue);

  // This hook needs to re-run when the items change because they can also
  // change when the locale was updated.
  const selectedItemId = selectedItem.id;
  React.useEffect(() => {
    const newItem = items.find((item) => item.id === selectedItemId);
    if (newItem != null) {
      setSelectedItem(newItem);
    }
  }, [items, selectedItemId]);

  return [selectedItem, setSelectedItem];
};
