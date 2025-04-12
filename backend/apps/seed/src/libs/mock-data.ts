import { Gender } from '@backend/shared/core';

export type MockUser = { name: string; gender: Gender; };

export const MOCK_SWAGGER_USER = 'Swagger';
export const MOCK_SWAGGER_COACH = 'SwaggerCoach';

export const MOCK_SPORTSMANS: MockUser[] = [
  { name: MOCK_SWAGGER_USER, gender: Gender.Male },
  { name: 'Tom', gender: Gender.Male },
  { name: 'Jerry', gender: Gender.NotMatter },
  { name: 'Roxette', gender: Gender.Female },
  { name: 'Candy', gender: Gender.Female },
  { name: 'Jack', gender: Gender.Male },
  { name: 'Mike', gender: Gender.Male },
  { name: 'David', gender: Gender.Male },
  { name: 'Mary', gender: Gender.Female }
];

export const MOCK_COACHES: MockUser[] = [
  { name: MOCK_SWAGGER_COACH, gender: Gender.Male },
  { name: 'Nataly', gender: Gender.Female },
  { name: 'Max', gender: Gender.Male },
  { name: 'Susan', gender: Gender.Female },
  { name: 'Tim', gender: Gender.Male }
];

export const MOCK_DEFAULT_USER_PASSWORD = '123456';

//! сделать компактнее и есть на фронте
//! проверить работает ли "img/" или нужно "/img/"
export const MOCK_SPORTSMANS_BACKGROUND_PATHS = [
  'img/content/user-card-photo1.jpg',
  'img/content/user-card-photo2.jpg'
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

export const MockTrainingOption = {
  MIN_COUNT: 0,
  MAX_COUNT: 20,
  MIN_PRICE: 0,
  MAX_PRICE: 10000,
  MIN_CALORIES: 1000,
  MAX_CALORIES: 5000,
  MIN_DATE: new Date(2025, 0, 1),
  MAX_DATE: new Date(2025, 3, 1),
} as const;

//! сделать компактнее и возможно будут на фронте
//! проверить работает ли "img/" или нужно "/img/"
export const MOCK_TRAININGS_BACKGROUND_PATHS = [
  'img/content/thumbnails/training-01@2x.jpg',
  'img/content/thumbnails/training-02@2x.jpg',
  'img/content/thumbnails/training-03@2x.jpg',
  'img/content/thumbnails/training-04@2x.jpg',
  'img/content/thumbnails/training-05@2x.jpg',
  'img/content/thumbnails/training-06@2x.jpg',
  'img/content/thumbnails/training-07@2x.jpg',
  'img/content/thumbnails/training-08@2x.jpg',
  'img/content/thumbnails/training-09@2x.jpg',
  'img/content/thumbnails/training-10@2x.jpg',
  'img/content/thumbnails/training-11@2x.jpg',
  'img/content/thumbnails/training-12@2x.jpg'
];

export const MockOrderOption = {
  MIN_COUNT: 1,
  MAX_COUNT: 10
} as const;

export const MockReviewOption = {
  MIN_RATING: 1,
  MAX_RATING: 5
} as const;
