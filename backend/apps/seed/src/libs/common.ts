import { SWAGGER_USER, SWAGGER_COACH } from './mock-data';

export function isSwaggers(name: string): boolean {
  return [SWAGGER_USER, SWAGGER_COACH].includes(name);
}
