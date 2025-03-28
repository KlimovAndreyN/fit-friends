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
