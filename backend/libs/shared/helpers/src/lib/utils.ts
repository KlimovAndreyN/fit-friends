export function joinUrl(...items: string[]): string {
  return [...items].join('/');
}

export function enumToArray<T extends object>(enumObj: T): T[keyof T][] {
  const items = Object.values(enumObj) as T[keyof T][];

  return items;
}

export function parseStringNumber(value: string): number | undefined {
  const parsedValue = parseInt(value, 10);

  return (isNaN(parsedValue)) ? undefined : parsedValue;
}
