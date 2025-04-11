//! Удалить моки

import { Specialization } from '@backend/shared/core';

import { SpecializationTitle } from './const';

export const MOCK_USERS = [
  {
    id: 'id-91',
    name: 'Иван',
    location: 'Чёрная речка',
    specializations: [SpecializationTitle[Specialization.Aerobics], SpecializationTitle[Specialization.Stretching], SpecializationTitle[Specialization.Crossfit]],
    avatarPath: '/img/content/thumbnails/user-06.jpg'
  },
  {
    id: 'id-92',
    name: 'Яна',
    location: 'Крестовский остров',
    specializations: [SpecializationTitle[Specialization.Pilates]],
    avatarPath: '/img/content/thumbnails/user-07.jpg'
  },
  {
    id: 'id-93',
    name: 'Диана',
    location: 'Невский проспект',
    specializations: [SpecializationTitle[Specialization.Pilates]],
    avatarPath: '/img/content/thumbnails/user-04.jpg'
  },
  {
    id: 'id-94',
    name: 'Константин',
    location: 'Комендантский проспект',
    specializations: [SpecializationTitle[Specialization.Power], SpecializationTitle[Specialization.Boxing], SpecializationTitle[Specialization.Running]],
    avatarPath: '/img/content/thumbnails/user-05.jpg'
  },
  {
    id: 'id-95',
    name: 'Иван-2',
    location: 'Чёрная речка-2',
    //! можно/будет несколько?
    specializations: [SpecializationTitle[Specialization.Aerobics], SpecializationTitle[Specialization.Stretching], SpecializationTitle[Specialization.Crossfit]],
    avatarPath: '/img/content/thumbnails/user-06.jpg'
  },
  {
    id: 'id-96',
    name: 'Яна-2',
    location: 'Крестовский остров-2',
    specializations: [SpecializationTitle[Specialization.Pilates]],
    avatarPath: '/img/content/thumbnails/user-07.jpg'
  },
  {
    id: 'id-97',
    name: 'Диана-2',
    location: 'Невский проспект-2',
    specializations: [SpecializationTitle[Specialization.Pilates]],
    avatarPath: '/img/content/thumbnails/user-04.jpg'
  },
  {
    id: 'id-98',
    name: 'Константин-2',
    location: 'Комендантский проспект-2',
    specializations: [SpecializationTitle[Specialization.Power], SpecializationTitle[Specialization.Boxing], SpecializationTitle[Specialization.Running]],
    avatarPath: '/img/content/thumbnails/user-05.jpg'
  }
];

export const MOCK_REVIEWS = [
  {
    userId: 'userId-1',
    userName: 'Никита',
    userAvatarPath: '/img/content/avatars/users/photo-1.png',
    rating: 4,
    comment: 'Эта тренировка для меня зарядка по\u00A0утрам, помогает проснуться.'
  },
  {
    userId: 'userId-2',
    userName: 'Дарья',
    userAvatarPath: '/img/content/avatars/users/photo-2.png',
    rating: 3,
    comment: 'Спасибо, классная тренировка! Понятная и\u00A0интересная, с\u00A0акцентом на\u00A0правильную технику, как я\u00A0люблю.'
  },
  {
    userId: 'userId-3',
    userName: 'Катерина',
    userAvatarPath: '/img/content/avatars/users/photo-3.png',
    rating: 5,
    comment: 'Хорошая тренировка, но\u00A0все\u00A0же не\u00A0хватило немного динамики. Для меня оказалась слишком легкой.'
  },
  {
    userId: 'userId-4',
    userName: 'Татьяна',
    userAvatarPath: '/img/content/avatars/users/photo-4.png',
    rating: 4,
    comment: 'Регулярно выполняю эту тренировку дома и\u00A0вижу результат! Спина стала прямее, появилось больше сил и\u00A0гибкость тоже стала лучше, хотя упражнения довольно простые.'
  },
  {
    userId: 'userId-5',
    userName: 'Наталья',
    userAvatarPath: '/img/content/avatars/users/photo-5.png',
    rating: 3,
    comment: 'Ну\u00A0какой\u00A0же кайф! Спасибо, крутая программа. С\u00A0музыкой вообще супер! Действительно, Energy!'
  },
  {
    userId: 'userId-6',
    userName: 'Никита',
    userAvatarPath: '/img/content/avatars/users/photo-1.png',
    rating: 5,
    comment: 'Эта тренировка для меня зарядка по\u00A0утрам, помогает проснуться.'
  }
];
