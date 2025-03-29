import { UserGender } from "@backend/shared/core";

export const MOCK_BACKGROUND_PATHS = [
  '/img/content/user-card-photo1.jpg',
  '/img/content/user-card-photo2.jpg'
];

export const MOCK_DEFAULT_USER_PASSWORD = '123456';

export const MOCK_SPORTSMANS = [
  { name: 'Tom', gender: UserGender.Male },
  { name: 'Jerry', gender: UserGender.NotMatter },
  { name: 'Roxette', gender: UserGender.Female },
  { name: 'Max', gender: UserGender.Male },
  { name: 'Nataly', gender: UserGender.Female },
  { name: 'Candy', gender: UserGender.Female },
  { name: 'Jack', gender: UserGender.Male }
];

export const MOCK_CALORIES = {
  loseMin: 3000,
  loseMax: 5000,
  wasteMin: 1000,
  wasteMax: 2000
} as const;

export const MOCK_SPECIALIZATIONS = {
  minCount: 1,
  maxCount: 3
} as const;
