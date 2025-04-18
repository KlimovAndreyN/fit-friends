import { parseStringNumber } from './common';

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
