import { Duration, Location, Specialization, Gender, TrainingLevel, Role } from '@backend/shared/core';

import { getViteEnvBooleanVariable } from './utils/common';
import { Option } from './types/option';
import { enumToArray } from '../../backend/libs/shared/helpers/src/lib/utils';

export const routeAccessDebug = getViteEnvBooleanVariable('VITE_ROUTE_ACCESS_DEBUG');

const MAIN_TITLE = 'FitFriends';

export enum PageTitle {
  Index = MAIN_TITLE,
  Loading = `Загрузка... — ${MAIN_TITLE}`,
  Intro = `Разводящая — ${MAIN_TITLE}`,
  SignIn = `Войти — ${MAIN_TITLE}`,
  SignUp = `Регистрация — ${MAIN_TITLE}`,
  Questionnaire = `Опросник — ${MAIN_TITLE}`,
  Profile = `Личный кабинет — ${MAIN_TITLE}`,
  Friends = `Список друзей — ${MAIN_TITLE}`,
  TrainingCatalog = `Каталог тренировок — ${MAIN_TITLE}`,
  TrainingDetail = `Карточка тренировки — ${MAIN_TITLE}`,
  NotFound = `404 — ${MAIN_TITLE}`
}

export const ID_PARAM = ':id';

export const REVIEWS_ID = 'reviews';

export enum AppRoute {
  Index = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Questionnaire = '/questionnaire',
  Profile = '/profile',
  Friends = '/friends',
  TrainingCatalog = '/training',
  TrainingDetail = `${TrainingCatalog}/${ID_PARAM}`,
  User = `/user/${ID_PARAM}`, //! sportsman? + нужен заголовок + страница / попап? 2 или 3 итерация?
  NotFound = '/404',
}

export enum StoreSlice {
  UserProcess = 'USER_PROCESS',
  UserProfileProcess = 'USER_PROFILE_PROCESS',
  TrainingProcess = 'TRAINING_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

export const multipartFormDataHeader = { 'Content-Type': 'multipart/form-data' } as const;

export const DefaultUser = {
  ROLE: Role.Sportsman,
  GENDER: Gender.Female,
  SPECIALISATIONS: [
    Specialization.Boxing as string,
    Specialization.Crossfit as string,
    Specialization.Power as string
  ],
  DURATION: Duration.Minutes_30_50,
  TRAINING_LEVEL: TrainingLevel.Amateur
} as const;

//! перенести в компонент/страницу по месту? или отдельный файл
const UserGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
  [Gender.NotMatter]: 'Неважно',
} as const;

export const USER_GENDERS: Option[] = enumToArray(Gender).map(
  (gender) => ({ value: gender, title: UserGenderTitle[gender] })
);

//! перенести в компонент/страницу по месту? или отдельный файл
const LocationTitle: { [key in Location]: string } = {
  [Location.Petrogradskaya]: 'Петроградская',
  [Location.Pionerskaya]: 'Пионерская',
  [Location.Sportivnaya]: 'Спортивная',
  [Location.Udelnaya]: 'Удельная',
  [Location.Zvezdnaya]: 'Звёздная'
} as const;

export const LOCATIONS: Option[] = enumToArray(Location).map(
  (location) => ({ value: location, title: LocationTitle[location] })
);

//! еще будет для тренера и должно подменятся при изменении роли
//! проверить работает ли "img/" или нужно "/img/"
export const USER_BACKGROUND_PATHS: Option[] = [
  { value: 'img/content/user-card-photo1.jpg', title: 'Фоновая картинка №1' },
  { value: 'img/content/user-card-photo2.jpg', title: 'Фоновая картинка №2' }
];

//! перенести в компонент/страницу по месту? или отдельный файл
export const SpecializationTitle: { [key in Specialization]: string } = {
  [Specialization.Aerobics]: 'Аэробика',
  [Specialization.Boxing]: 'Бокс',
  [Specialization.Crossfit]: 'Кроссфит',
  [Specialization.Pilates]: 'Пилатес',
  [Specialization.Power]: 'Силовые',
  [Specialization.Running]: 'Бег',
  [Specialization.Stretching]: 'Стрейчинг',
  [Specialization.Yoga]: 'Йога'
} as const;

export const SPECIALISATIONS: Option[] = enumToArray(Specialization).map(
  (specialization) => ({ value: specialization, title: SpecializationTitle[specialization] })
);

//! перенести в компонент/страницу по месту? или отдельный файл
const UserDurationTitle: { [key in Duration]: string } = {
  [Duration.Minutes_10_30]: '10-30 мин',
  [Duration.Minutes_30_50]: '30-50 мин',
  [Duration.Minutes_50_80]: '50-80 мин',
  [Duration.Minutes_80_100]: '80-100 мин'
} as const;

export const USER_DURATIONS: Option[] = enumToArray(Duration).map(
  (duration) => ({ value: duration, title: UserDurationTitle[duration] })
);

//! перенести в компонент/страницу по месту? или отдельный файл
const TrainingLevelTitle: { [key in TrainingLevel]: string } = {
  [TrainingLevel.Amateur]: 'Любитель',
  [TrainingLevel.Beginner]: 'Новичок',
  [TrainingLevel.Professional]: 'Профессионал'
} as const;

export const TRAINING_LEVELS: Option[] = enumToArray(TrainingLevel).map(
  (trainingLevel) => ({ value: trainingLevel, title: TrainingLevelTitle[trainingLevel] })
);
