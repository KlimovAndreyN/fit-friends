import { AuthUser, MetroStationName, UserGender, UserRole } from '@backend/shared/core';

import { getRandomItem } from './random';

export const MOCK_BACKGROUND_PATHS = [
  '/img/content/user-card-photo1.jpg',
  '/img/content/user-card-photo2.jpg'
];

export const MOCK_DEFAULT_USER_PASSWORD = '123456';

export const MOCK_SPORTSMANS: AuthUser[] = [
  {
    email: 'tom@local.ru',
    name: 'Tom',
    about: 'About Tom',
    backgroundPath: getRandomItem(MOCK_BACKGROUND_PATHS),
    gender: getRandomItem(Object.values(UserGender)),
    metroStationName: getRandomItem(Object.values(MetroStationName)),
    role: UserRole.Sportsman,
    avatarFileId: '', //! позднее попробовать подкинуть аватарки
    birthday: new Date('2000-01-01'), //! сделать разное
    passwordHash: ''
  }
];
