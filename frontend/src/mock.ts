//! Удалить моки

import { Specialization } from '@backend/shared/core';

import { OfferType } from './types/types';
import { SpecializationTitle } from './const';

export const MOCK_OFFERS = [
  {
    id: 'id-11',
    picturePath: '/img/content/thumbnails/preview-03.jpg',
    specialization: Specialization.Crossfit
  },
  {
    id: 'id-12',
    picturePath: '/img/content/thumbnails/preview-02.jpg',
    specialization: Specialization.Power
  },
  {
    id: 'id-13',
    picturePath: '/img/content/thumbnails/preview-01.jpg',
    specialization: Specialization.Boxing
  },
  {
    id: 'id-21',
    picturePath: '/img/content/thumbnails/training-11.jpg',
    specialization: Specialization.Power
  },
  {
    id: 'id-22',
    picturePath: '/img/content/thumbnails/training-09.jpg',
    specialization: Specialization.Stretching
  },
  {
    id: 'id-23',
    picturePath: '/img/content/thumbnails/training-10.jpg',
    specialization: Specialization.Power
  }
];

export const MOCK_SPECIAL_OFFERS: OfferType[] = [
  {
    id: 'id-51',
    title: 'Fitball',
    description: 'Горячие предложения на тренировки на фитболе',
    picturePath: '/img/content/promo-1.png',
    price: 1600,
    oldPrice: 2000
  },
  {
    id: 'id-52',
    title: 'Fleksbend',
    description: 'Горячие предложения на\u00A0Тренировки с\u00A0резинкой для фитнеса',
    picturePath: '/img/content/promo-2.png',
    price: 2400,
    oldPrice: 2800
  },
  {
    id: 'id-53',
    title: 'Full Body Stretch',
    description: 'Горячие предложения на\u00A0Комплекс упражнений на\u00A0растяжку всего тела для новичков',
    picturePath: '/img/content/promo-3.png',
    price: 1800,
    oldPrice: 2200
  },
  {
    id: 'id-54',
    title: 'Full Body Stretch - 2',
    description: 'Горячие предложения на\u00A0Комплекс упражнений на\u00A0растяжку всего тела для новичков',
    picturePath: '/img/content/promo-3.png',
    price: 2000,
    oldPrice: 2500
  }
];

export const MOCK_TRAININGS = [
  {
    id: 'id-70',
    title: 'run, forrest, run, forrest, run',
    specialization: SpecializationTitle[Specialization.Running],
    calorie: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и\u00A0откройте для себя все секреты длительных пробежек.',
    picturePath: '/img/content/thumbnails/training-06.jpg',
    price: 0
  },
  {
    id: 'id-71',
    title: 'run, forrest, run',
    specialization: SpecializationTitle[Specialization.Running],
    calorie: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и\u00A0откройте для себя все секреты длительных пробежек.',
    picturePath: '/img/content/thumbnails/training-06.jpg',
    price: 1600
  },
  {
    id: 'id-72',
    title: 'fitball',
    specialization: SpecializationTitle[Specialization.Pilates],
    calorie: 200,
    description: 'Тренировка на\u00A0фитболе\u00A0\u2013 отличном тренажере для развития чувства баланса и\u00A0равновесия, улучшения координации.',
    picturePath: '/img/content/thumbnails/training-07.jpg',
    price: 1600
  },
  {
    id: 'id-73',
    title: 'devil\'s cindy',
    specialization: SpecializationTitle[Specialization.Crossfit],
    calorie: 950,
    description: 'Знаменитый кроссфит комплекс. Синди\u00A0\u2013 универсальная тренировка для развития функциональной силы.',
    picturePath: '/img/content/thumbnails/training-11.jpg',
    price: 2200
  },
  {
    id: 'id-74',
    title: 'full body stretch',
    specialization: SpecializationTitle[Specialization.Stretching],
    calorie: 500,
    description: 'Комплекс упражнений на\u00A0растяжку всего тела для новичков. Плавное погружение в\u00A0стретчинг и\u00A0умеренная нагрузка.',
    picturePath: '/img/content/thumbnails/training-09.jpg',
    price: 2000
  },
  {
    id: 'id-75',
    title: 'run, forrest, run - 2',
    specialization: SpecializationTitle[Specialization.Running],
    calorie: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и\u00A0откройте для себя все секреты длительных пробежек.',
    picturePath: '/img/content/thumbnails/training-06.jpg',
    price: 2600
  },
  {
    id: 'id-76',
    title: 'fitball - 2',
    specialization: SpecializationTitle[Specialization.Pilates],
    calorie: 150,
    description: 'Тренировка на\u00A0фитболе\u00A0\u2013 отличном тренажере для развития чувства баланса и\u00A0равновесия, улучшения координации.',
    picturePath: '/img/content/thumbnails/training-07.jpg',
    price: 2200
  },
  {
    id: 'id-77',
    title: 'devil\'s cindy - 2',
    specialization: SpecializationTitle[Specialization.Crossfit],
    calorie: 850,
    description: 'Знаменитый кроссфит комплекс. Синди\u00A0\u2013 универсальная тренировка для развития функциональной силы.',
    picturePath: '/img/content/thumbnails/training-11.jpg',
    price: 2500
  },
  {
    id: 'id-78',
    title: 'full body stretch - 2',
    specialization: SpecializationTitle[Specialization.Stretching],
    calorie: 500,
    description: 'Комплекс упражнений на\u00A0растяжку всего тела для новичков. Плавное погружение в\u00A0стретчинг и\u00A0умеренная нагрузка.',
    picturePath: '/img/content/thumbnails/training-09.jpg',
    price: 2000
  }
];

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
    userAvatarPath: '/img/content/avatars/users/photo-6.png',
    rating: 5,
    comment: 'Эта тренировка для меня зарядка по\u00A0утрам, помогает проснуться.'
  }
];
