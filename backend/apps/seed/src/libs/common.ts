import { SWAGGER_USER } from './mock-data';

export function isSwaggers(name: string): boolean {
  return name.startsWith(SWAGGER_USER);
}
