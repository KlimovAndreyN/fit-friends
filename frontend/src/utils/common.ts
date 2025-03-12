export function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}
