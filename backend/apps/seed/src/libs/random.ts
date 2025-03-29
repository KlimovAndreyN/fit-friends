//! функции есть на фронте, объеденить через хелпер
export function getRandomNumber(min: number, max: number, numAfterDigit = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomBoolean(): boolean {
  return getRandomNumber(0, 100) > 50;
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomNumber(0, items.length - 1)];
}

function enumToArray<T>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}

export function getRandomEnumItem<T>(enumObj: T): T[keyof T] {
  const enumItems = enumToArray(enumObj);

  return enumItems[getRandomNumber(0, enumItems.length - 1)];
}

/*
export function getRandomUniqueItems<T>(items: T[], count: number): T {
  if (items.length <= count) {

  }

  const indexes: number[] = [];


  return items[getRandomNumber(0, items.length - 1)];
}
*/
