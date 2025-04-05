import { enumToArray } from './utils';

export function getRandomNumber(min: number, max: number, numAfterDigit = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomBoolean(): boolean {
  return getRandomNumber(0, 100) > 50;
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomNumber(0, items.length - 1)];
}

export function getRandomEnumItem<T extends object>(enumObj: T): T[keyof T] {
  const enumItems = enumToArray(enumObj);

  return enumItems[getRandomNumber(0, enumItems.length - 1)];
}

function getUniqueRandomNumbers(numbersCount: number, min: number, max: number): number[] {
  const uniqueNumbers = new Set<number>();
  const maxCount = max - min + 1;
  let count = numbersCount;

  if (count > maxCount) {
    count = maxCount;
  }

  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(getRandomNumber(min, max));
  }

  return Array.from(uniqueNumbers);
}

export function getRandomUniqueItems<T>(items: T[], count: number): T[] {
  const indexes: number[] = getUniqueRandomNumbers(count, 0, items.length);

  return items.filter((_, index) => (indexes.includes(index)));
}
