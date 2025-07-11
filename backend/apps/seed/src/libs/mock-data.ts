import { Gender } from '@backend/shared/core';

export type MockUser = { name: string; gender: Gender; };

export const FilesPath = {
  ASSETS: 'assets',
  AVATARS: 'avatars',
  CERTIFICATES: 'certificates',
  VIDEOS: 'videos',
  SEED_STATIC: 'seed-static'
} as const;

export const SWAGGER_USER = 'Swagger';

export const SPORTSMANS: MockUser[] = [
  { name: SWAGGER_USER, gender: Gender.Male },
  { name: `${SWAGGER_USER}Two`, gender: Gender.Male },
  { name: 'Tom', gender: Gender.Male },
  { name: 'Jerry', gender: Gender.NotMatter },
  { name: 'Roxette', gender: Gender.Female },
  { name: 'Candy', gender: Gender.Female },
  { name: 'Jack', gender: Gender.Male },
  { name: 'Mike', gender: Gender.Male },
  { name: 'David', gender: Gender.Male },
  { name: 'Mary', gender: Gender.Female },
  { name: 'Andrey', gender: Gender.Male },
  { name: 'Vladimir', gender: Gender.Male },
  { name: 'Alex', gender: Gender.Male },
  { name: 'Evgeny', gender: Gender.Male },
  { name: 'Denis', gender: Gender.Male },
  { name: 'Irina', gender: Gender.Female },
  { name: 'Yulia', gender: Gender.Female }
];

export const COACHES: MockUser[] = [
  { name: `${SWAGGER_USER}Coach`, gender: Gender.Male },
  { name: 'Nataly', gender: Gender.Female },
  { name: 'Max', gender: Gender.Male },
  { name: 'Susan', gender: Gender.Female },
  { name: 'Tim', gender: Gender.Male },
  { name: 'Igor', gender: Gender.Male },
  { name: 'Mihail', gender: Gender.Male },
  { name: 'Anastasiya', gender: Gender.Female }
];

export const DEFAULT_USER_PASSWORD = '123456';
export const USER_AVATAR_EXIST_FACTOR = 5;

export const UserCreateDateOption = {
  MIN: new Date(2025, 0, 1),
  MAX: new Date(2025, 3, 1),
} as const;

export const UserBirthdayDateOption = {
  MIN: new Date(2020, 0, 1),
  MAX: new Date(2020, 11, 1),
} as const;

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
  MAX_COUNT: 50,
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
