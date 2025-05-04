export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export const DEFAULT_ENVIRONMENT = ENVIRONMENTS[0];

export type Environment = typeof ENVIRONMENTS[number];
