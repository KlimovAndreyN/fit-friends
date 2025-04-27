function getNotUndefined(values: (number | undefined)[]): number[] {
  return values.filter((value): value is number => (typeof value === 'number'));
}

export function getMin(...values: (number | undefined)[]): number | undefined {
  const newValues = getNotUndefined(values);

  return (newValues.length) ? Math.min(...newValues) : undefined;
}

export function getMax(...values: (number | undefined)[]): number | undefined {
  const newValues = getNotUndefined(values);

  return (newValues.length) ? Math.max(...newValues) : undefined;
}
