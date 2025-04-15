//! нужно ли
export function transformTags({ value }): string[] {
  // когда запрос в fit, то преобразует entity[]
  // а когда запрос из api, то преобразует string[]
  return value.map(
    (item: { title: string } | string) => {
      if (typeof item === 'string') {
        return item;
      }

      return item.title;
    });
}

export function transformStringBooleanOrBoolean({ value }): boolean {
  // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
  return (typeof value === 'string') ? value === 'true' : value;
}

//! нужно еще выносить отдельно helpers import { parseStringNumber } from '@backend/shared/helpers'; //Circular dependency between "shared-core" and "shared-helpers" detected: shared-core -> shared-helpers -> shared-core
function parseStringNumber(value: string): number | undefined {
  const parsedValue = parseInt(value, 10);

  return (isNaN(parsedValue)) ? undefined : parsedValue;
}

export function transformNumber({ value }): number {
  return parseStringNumber(value);
}

export function transformArray<T>({ value }): T[] {
  return (Array.isArray(value) ? value : [value]);
}
