import { Duration, Location, Specialization, Gender, TrainingLevel, Role, ApiServiceRoute, AccountRoute } from '@backend/shared/core';
import { enumToArray, joinUrl } from '@backend/shared/helpers';

import { Option } from './types/types';

export const MAIN_TITLE = 'FitFriends';
export const ID_PARAM = ':id';
export const REVIEWS_ANCHOR = 'reviews';

export enum PageTitle {
  Index = MAIN_TITLE,
  Loading = 'Загрузка...',
  Intro = 'Разводящая',
  SignIn = 'Войти',
  SignUp = 'Регистрация',
  Questionnaire = 'Опросник',
  PersonalAccount = 'Личный кабинет',
  TrainingsCatalog = 'Каталог тренировок',
  TrainingDetail = 'Карточка тренировки',
  CreateTraining = 'Создать тренировку',
  UsersCatalog = 'Каталог пользователей',
  UserDetail = 'Карточка пользователя',
  Friends = 'Список друзей',
  MyPurchases = 'Мои покупки',
  MyOrders = 'Мои заказы',
  MyTrainings = 'Мои тренировки',
  NotFound = '404'
}

export enum AppRoute {
  Index = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Questionnaire = '/questionnaire',
  PersonalAccount = '/personal-account',
  TrainingsCatalog = '/trainings',
  TrainingDetail = `/training/${ID_PARAM}`,
  CreateTraining = '/create-training',
  UsersCatalog = '/users',
  UserDetail = `/user/${ID_PARAM}`,
  Friends = '/friends',
  MyPurchases = '/my-purchases',
  MyOrders = '/my-orders',
  MyTrainings = '/my-trainings',
  NotFound = '/404',
}

export const ApiRoute = {
  LOGIN: joinUrl(ApiServiceRoute.Users, AccountRoute.Login),
  LOGOUT: joinUrl(ApiServiceRoute.Users, AccountRoute.Logout),
  REFRESH: joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh),
  CHECK: joinUrl(ApiServiceRoute.Users, AccountRoute.Check),
  REGISTER: joinUrl(ApiServiceRoute.Users, AccountRoute.Register)
  //! эти используются в действиях и в апи, остальные сюда тащить?
} as const;

export enum StoreSlice {
  UserProcess = 'USER_PROCESS',
  UserProfileProcess = 'USER_PROFILE_PROCESS',
  TrainingProcess = 'TRAINING_PROCESS',
  ReviewProcess = 'REVIEW_PROCESS'
}

export const multipartFormDataHeader = { 'Content-Type': 'multipart/form-data' } as const;

export const DefaultUser = {
  ROLE: Role.Coach,
  GENDER: Gender.Female,
  SPECIALISATIONS: [
    Specialization.Boxing as string,
    Specialization.Crossfit as string,
    Specialization.Power as string
  ],
  DURATION: Duration.Minutes_30_50,
  TRAINING_LEVEL: TrainingLevel.Amateur
} as const;

const UserGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
  [Gender.NotMatter]: 'Неважно',
} as const;

export const USER_GENDERS: Option[] = enumToArray(Gender).map(
  (gender) => ({ value: gender, title: UserGenderTitle[gender] })
);

//! перенести в компонент/страницу по месту? или отдельный файл
export const TrainingGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'женщин',
  [Gender.Male]: 'мужчин',
  [Gender.NotMatter]: 'всех',
} as const;

export const LocationTitle: { [key in Location]: string } = {
  [Location.Petrogradskaya]: 'Петроградская',
  [Location.Pionerskaya]: 'Пионерская',
  [Location.Sportivnaya]: 'Спортивная',
  [Location.Udelnaya]: 'Удельная',
  [Location.Zvezdnaya]: 'Звёздная'
} as const;

export const LOCATIONS: Option[] = enumToArray(Location).map(
  (location) => ({ value: location, title: LocationTitle[location] })
);

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
//! можно преобазовать из UserDurationTitle
export const TrainingDurationTitle: { [key in Duration]: string } = {
  [Duration.Minutes_10_30]: '10_30',
  [Duration.Minutes_30_50]: '30_50',
  [Duration.Minutes_50_80]: '50_80',
  [Duration.Minutes_80_100]: '80_100'
} as const;

const TrainingLevelTitle: { [key in TrainingLevel]: string } = {
  [TrainingLevel.Amateur]: 'Любитель',
  [TrainingLevel.Beginner]: 'Новичок',
  [TrainingLevel.Professional]: 'Профессионал'
} as const;

export const TRAINING_LEVELS: Option[] = enumToArray(TrainingLevel).map(
  (trainingLevel) => ({ value: trainingLevel, title: TrainingLevelTitle[trainingLevel] })
);
