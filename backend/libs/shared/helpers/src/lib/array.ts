export function updateItem<T = string | number>(items: T[], oldItem: T, newItem: T): T[] {
  return items.map((item) => (item === oldItem ? newItem : item));
}

export function deleteItem<T = string | number>(items: T[], oldItem: T): T[] {
  return items.filter((item) => (item !== oldItem));
}
