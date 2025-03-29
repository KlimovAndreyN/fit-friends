//! Удалить моки

import { Specialization } from '@backend/shared';

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
    id: 'id-44',
    title: 'Fitball',
    description: 'Горячие предложения на тренировки на фитболе',
    picturePath: 'img/content/promo-1.png',
    price: 1600,
    oldPrice: 2000
  },
  {
    id: 'id-55',
    title: 'Fleksbend',
    description: 'Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса',
    picturePath: 'img/content/promo-2.png',
    price: 2400,
    oldPrice: 2800
  },
  {
    id: 'id-66',
    title: 'Full Body Stretch',
    description: 'Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков',
    picturePath: 'img/content/promo-3.png',
    price: 1800,
    oldPrice: 2200
  }
];
