export function enumToArray<T>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}
