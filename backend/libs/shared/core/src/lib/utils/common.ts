import { SPECIAL_OFFER_PERCENT } from '../constants/consts';
import { Role } from '../types/role.enum';
import { SortType } from '../types/sort-type.enum';

export function isCoachRole(role: Role): boolean {
  return role === Role.Coach;
}

export function isSportsmanRole(role: Role): boolean {
  return role === Role.Sportsman;
}

export function isForFreeSortType(sortType: SortType | undefined): boolean {
  return sortType === SortType.ForFree;
}

export function parseStringNumber(value: string): number | undefined {
  const parsedValue = parseInt(value, 10);

  return (isNaN(parsedValue)) ? undefined : parsedValue;
}

export function getNewPrice(price: number): number {
  return Math.round(price * (1 - (SPECIAL_OFFER_PERCENT / 100)));
}

export function getOldPrice(price: number): number {
  return Math.round(price / (1 - (SPECIAL_OFFER_PERCENT / 100)));
}
