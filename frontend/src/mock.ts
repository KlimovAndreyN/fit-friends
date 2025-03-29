//! Удалить моки

import { Specialization } from '@backend/shared';
import { SpecializationTitle } from './const';

export const MOCK_OFFERS = [
  {
    id: 'id-11',
    picturePath: 'img/content/thumbnails/preview-03.jpg',
    specialization: Specialization.Crossfit
  },
  {
    id: 'id-12',
    picturePath: 'img/content/thumbnails/preview-02.jpg',
    specialization: Specialization.Power
  },
  {
    id: 'id-13',
    picturePath: 'img/content/thumbnails/preview-01.jpg',
    specialization: Specialization.Boxing
  },
  {
    id: 'id-21',
    picturePath: 'img/content/thumbnails/training-11.jpg',
    specialization: Specialization.Power
  },
  {
    id: 'id-22',
    picturePath: 'img/content/thumbnails/training-09.jpg',
    specialization: Specialization.Stretching
  },
  {
    id: 'id-23',
    picturePath: 'img/content/thumbnails/training-10.jpg',
    specialization: Specialization.Power
  }
];

export const MOCK_SPECIAL_OFFERS = [
  {
    id: 'id-51',
    title: 'Fitball',
    description: 'Горячие предложения на тренировки на фитболе',
    picturePath: 'img/content/promo-1.png',
    price: 1600,
    oldPrice: 2000
  },
  {
    id: 'id-52',
    title: 'Fleksbend',
    description: 'Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса',
    picturePath: 'img/content/promo-2.png',
    price: 2400,
    oldPrice: 2800
  },
  {
    id: 'id-53',
    title: 'Full Body Stretch',
    description: 'Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков',
    picturePath: 'img/content/promo-3.png',
    price: 1800,
    oldPrice: 2200
  }
];

export const MOCK_POPULAR_TRAINING = [
  {
    id: 'id-71',
    title: 'run, forrest, run',
    specialization: SpecializationTitle[Specialization.Running],
    calorie: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.',
    picturePath: 'img/content/thumbnails/training-06.jpg',
    price: 1600
  },
  {
    id: 'id-72',
    title: 'fitball',
    specialization: SpecializationTitle[Specialization.Pilates],
    calorie: 200,
    description: 'Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном тренажере для развития чувства баланса и&nbsp;равновесия, улучшения координации.',
    picturePath: 'img/content/thumbnails/training-07.jpg',
    price: 1600
  },
  {
    id: 'id-73',
    title: 'devil&apos;s cindy',
    specialization: SpecializationTitle[Specialization.Crossfit], // нужно вывести в нижнем регистре
    calorie: 950,
    description: 'Знаменитый кроссфит комплекс. Синди&nbsp;&mdash; универсальная тренировка для развития функциональной силы.',
    picturePath: 'img/content/thumbnails/training-11.jpg',
    price: 2200
  },
  {
    id: 'id-74',
    title: 'full body stretch - 2',
    specialization: SpecializationTitle[Specialization.Stretching],
    calorie: 500,
    description: 'Комплекс упражнений на&nbsp;растяжку всего тела для новичков. Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.',
    picturePath: 'img/content/thumbnails/training-09.jpg',
    price: 2000
  },
  {
    id: 'id-75',
    title: 'run, forrest, run - 2',
    specialization: SpecializationTitle[Specialization.Running],
    calorie: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.',
    picturePath: 'img/content/thumbnails/training-06.jpg',
    price: 2600
  },
  {
    id: 'id-76',
    title: 'fitball - 2',
    specialization: SpecializationTitle[Specialization.Pilates],
    calorie: 150,
    description: 'Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном тренажере для развития чувства баланса и&nbsp;равновесия, улучшения координации.',
    picturePath: 'img/content/thumbnails/training-07.jpg',
    price: 2200
  },
  {
    id: 'id-77',
    title: 'devil&apos;s cindy - 2',
    specialization: SpecializationTitle[Specialization.Crossfit], // нужно вывести в нижнем регистре
    calorie: 850,
    description: 'Знаменитый кроссфит комплекс. Синди&nbsp;&mdash; универсальная тренировка для развития функциональной силы.',
    picturePath: 'img/content/thumbnails/training-11.jpg',
    price: 2500
  },
  {
    id: 'id-78',
    title: 'full body stretch - 2',
    specialization: SpecializationTitle[Specialization.Stretching],
    calorie: 500,
    description: 'Комплекс упражнений на&nbsp;растяжку всего тела для новичков. Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.',
    picturePath: 'img/content/thumbnails/training-09.jpg',
    price: 2000
  }
];
