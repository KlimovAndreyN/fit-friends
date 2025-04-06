import { Gender } from '@backend/shared/core';

export const MOCK_BACKGROUND_PATHS = [
  '/img/content/user-card-photo1.jpg',
  '/img/content/user-card-photo2.jpg'
];

export const MOCK_DEFAULT_USER_PASSWORD = '123456';

export const MOCK_SPORTSMANS = [
  { name: 'Tom', gender: Gender.Male },
  { name: 'Jerry', gender: Gender.NotMatter },
  { name: 'Roxette', gender: Gender.Female },
  { name: 'Max', gender: Gender.Male },
  { name: 'Nataly', gender: Gender.Female },
  { name: 'Candy', gender: Gender.Female },
  { name: 'Jack', gender: Gender.Male }
];

export const MockCalorieOption = {
  LOSE_MIN: 3000,
  LOSE_MAX: 5000,
  WASTE_MIN: 1000,
  WASTE_MAX: 2000
} as const;

export const MockSpecializationsOption = {
  MIN_COUNT: 1,
  MAX_COUNT: 3
} as const;
