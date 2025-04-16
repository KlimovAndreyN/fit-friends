import { Role } from '../types/role.enum';

export function isCoachRole(role: Role): boolean {
  return role === Role.Coach;
}

export function isSportsmanRole(role: Role): boolean {
  return role === Role.Sportsman;
}

export function parseStringNumber(value: string): number | undefined {
  const parsedValue = parseInt(value, 10);

  return (isNaN(parsedValue)) ? undefined : parsedValue;
}
