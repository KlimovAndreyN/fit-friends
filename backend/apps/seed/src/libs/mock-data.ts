import { Gender } from '@backend/shared/core';

export type MockUser = { name: string; gender: Gender; };

export const SWAGGER_USER = 'Swagger';
export const SWAGGER_COACH = 'SwaggerCoach';

export const SPORTSMANS: MockUser[] = [
  { name: SWAGGER_USER, gender: Gender.Male },
  { name: 'Tom', gender: Gender.Male },
  { name: 'Jerry', gender: Gender.NotMatter },
  { name: 'Roxette', gender: Gender.Female },
  { name: 'Candy', gender: Gender.Female },
  { name: 'Jack', gender: Gender.Male },
  { name: 'Mike', gender: Gender.Male },
  { name: 'David', gender: Gender.Male },
  { name: 'Mary', gender: Gender.Female }
];

export const COACHES: MockUser[] = [
  { name: SWAGGER_COACH, gender: Gender.Male },
  { name: 'Nataly', gender: Gender.Female },
  { name: 'Max', gender: Gender.Male },
  { name: 'Susan', gender: Gender.Female },
  { name: 'Tim', gender: Gender.Male }
];

export const DEFAULT_USER_PASSWORD = '123456';

export const CalorieOption = {
  LOSE_MIN: 3000,
  LOSE_MAX: 5000,
  WASTE_MIN: 1000,
  WASTE_MAX: 2000
} as const;

export const SpecializationsOption = {
  MIN_COUNT: 1,
  MAX_COUNT: 3
} as const;

export const TrainingOption = {
  MIN_COUNT: 0,
  MAX_COUNT: 30,
  NOT_ZERO_PRICE_FACTOR: 4,
  MIN_PRICE: 1,
  MAX_PRICE: 100,
  PRICE_FACTOR: 100,
  MIN_CALORIES: 1,
  MAX_CALORIES: 50,
  CALORIES_FACTOR: 100,
  MIN_DATE: new Date(2025, 0, 1),
  MAX_DATE: new Date(2025, 3, 1),
} as const;

export const OrderOption = {
  MIN_COUNT: 1,
  MAX_COUNT: 10
} as const;

export const ReviewOption = {
  MIN_RATING: 1,
  MAX_RATING: 5
} as const;
