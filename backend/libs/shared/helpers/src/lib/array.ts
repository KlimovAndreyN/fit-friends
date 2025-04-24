function findItemIndex<T = string | number>(items: T[], value: T): number {
  return items.findIndex((item) => item === value)
}

export function updateItem<T = string | number>(items: T[], oldItem: T, newItem: T) {
  items[findItemIndex<T>(items, oldItem)] = newItem;
}

export function deleteItem<T = string | number>(items: T[], item: T) {
  const index = findItemIndex(items, item);

  if ((index >= 0) && (index < items.length - 1)) {
    items.splice(index, 1);
  }
}
