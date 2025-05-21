import { parseStringNumber } from './common';

export function transformToStringBooleanOrBoolean({ value }): boolean {
  // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
  return (typeof value === 'string') ? value === 'true' : value;
}

export function transformToNumber({ value }): number {
  return parseStringNumber(value);
}

export function transformToArray({ value }): unknown[] {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value === '') {
    return [];
  }

  return [value];
}

export function transformDateToString({ value }): string | unknown {
  //! проверить
  return (value instanceof (Date)) ? value.toISOString() : value;
}
