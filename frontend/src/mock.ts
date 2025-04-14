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
