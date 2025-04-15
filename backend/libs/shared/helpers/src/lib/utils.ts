export function joinUrl(...items: string[]): string {
  return [...items].join('/');
}

export function enumToArray<T extends object>(enumObj: T): T[keyof T][] {
  const items = Object.values(enumObj) as T[keyof T][];

  return items;
}

export function parseStringNumber(value: string): number | undefined {
  const parsedValue = parseInt(value, 10);

  return (isNaN(parsedValue)) ? undefined : parsedValue;
}

export function getQueryString(query: object): string {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      if (Array.isArray(value)) {
        value.map((item) => {
          queryParams.push(`${key}=${item}`);
        });
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  return `?${queryParams.join('&')}`;
}
