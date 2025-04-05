export function joinUrl(...items: string[]): string {
  return [...items].join('/');
}

export function enumToArray<T extends object>(enumObj: T): T[keyof T][] {
  const items = Object.values(enumObj) as T[keyof T][];

  return items;
}
