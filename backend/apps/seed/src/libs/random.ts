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
