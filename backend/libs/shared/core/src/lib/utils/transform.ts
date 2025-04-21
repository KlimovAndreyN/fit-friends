import { parseStringNumber } from './common';

export function transformToStringArray({ value, obj, key }): string[] {
  if (Array.isArray(value)) {
    return value;
  }

  const items: string[] = [];

  // для зачиски объекта от `${key}.`, можно сделать CleanDtoPipe
  for (const objectKey in obj) {
    if (objectKey.startsWith(`${key}.`)) {
      items.push(obj[objectKey]);
    }
  }

  return (items.length) ? items : undefined;
}

export function transformStringBooleanOrBoolean({ value }): boolean {
  // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
  return (typeof value === 'string') ? value === 'true' : value;
}

export function transformNumber({ value }): number {
  return parseStringNumber(value);
}

export function transformArray<T>({ value }): T[] {
  return (Array.isArray(value) ? value : [value]);
}
