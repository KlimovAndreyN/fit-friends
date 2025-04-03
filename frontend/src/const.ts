import { Duration, Location, Specialization, Gender, TrainingLevel, Role } from '@backend/shared';

import { getViteEnvBooleanVariable } from './utils/common';
import { Option } from './types/option';

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
  UserInfoProcess = 'USER_INFO_PROCESS'
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
  TIME: Duration.Minutes_30_50,
  TRAINING_LEVEL: TrainingLevel.Amateur
} as const;

export const UserRoleOption: { [key in Role]: { singUpTitle: string; svgIcon: string; endingClassName: string } } = {
  [Role.Sportsman]: { singUpTitle: 'Я хочу тренироваться', svgIcon: '#icon-weight', endingClassName: 'user' },
  [Role.Coach]: { singUpTitle: 'Я хочу тренировать', svgIcon: '#icon-cup', endingClassName: 'coath' }
} as const;

export const USER_ROLES = [
  Role.Coach,
  Role.Sportsman
] as const;

export const UserGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
  [Gender.NotMatter]: 'Неважно',
} as const;

export const USER_GENDERS: Option[] = [
  { value: Gender.Male, title: UserGenderTitle[Gender.Male] },
  { value: Gender.Female, title: UserGenderTitle[Gender.Female] },
  { value: Gender.NotMatter, title: UserGenderTitle[Gender.NotMatter] }
];

export const LocationTitle: { [key in Location]: string } = {
  [Location.Petrogradskaya]: 'Петроградская',
  [Location.Pionerskaya]: 'Пионерская',
  [Location.Sportivnaya]: 'Спортивная',
  [Location.Udelnaya]: 'Удельная',
  [Location.Zvezdnaya]: 'Звёздная'
} as const;

export const LOCATIONS: Option[] = [
  { value: Location.Pionerskaya, title: LocationTitle[Location.Pionerskaya] },
  { value: Location.Petrogradskaya, title: LocationTitle[Location.Petrogradskaya] },
  { value: Location.Udelnaya, title: LocationTitle[Location.Udelnaya] },
  { value: Location.Zvezdnaya, title: LocationTitle[Location.Zvezdnaya] },
  { value: Location.Sportivnaya, title: LocationTitle[Location.Sportivnaya] }
];

//! еще будет для тренера и должно подменятся при изменении роли
export const USER_BACKGROUND_PATHS: Option[] = [
  { value: '/img/content/user-card-photo1.jpg', title: 'Фоновая картинка №1' },
  { value: '/img/content/user-card-photo2.jpg', title: 'Фоновая картинка №2' }
];

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

export const SPECIALISATIONS: Option[] = [
  { value: Specialization.Yoga, title: SpecializationTitle[Specialization.Yoga] },
  { value: Specialization.Running, title: SpecializationTitle[Specialization.Running] },
  { value: Specialization.Power, title: SpecializationTitle[Specialization.Power] },
  { value: Specialization.Aerobics, title: SpecializationTitle[Specialization.Aerobics] },
  { value: Specialization.Crossfit, title: SpecializationTitle[Specialization.Crossfit] },
  { value: Specialization.Boxing, title: SpecializationTitle[Specialization.Boxing] },
  { value: Specialization.Pilates, title: SpecializationTitle[Specialization.Pilates] },
  { value: Specialization.Stretching, title: SpecializationTitle[Specialization.Stretching] }
];

export const TIMES: Option[] = [
  { value: Duration.Minutes_10_30, title: '10-30 мин' },
  { value: Duration.Minutes_30_50, title: '30-50 мин' },
  { value: Duration.Minutes_50_80, title: '50-80 мин' },
  { value: Duration.Minutes_80_100, title: '80-100 мин' }
];

export const TrainingLevelTitle: { [key in TrainingLevel]: string } = {
  [TrainingLevel.Amateur]: 'Любитель',
  [TrainingLevel.Beginner]: 'Новичок',
  [TrainingLevel.Professional]: 'Профессионал'
} as const;

export const TRAINING_LEVELS: Option[] = [
  { value: TrainingLevel.Beginner, title: TrainingLevelTitle[TrainingLevel.Beginner] },
  { value: TrainingLevel.Amateur, title: TrainingLevelTitle[TrainingLevel.Amateur] },
  { value: TrainingLevel.Professional, title: TrainingLevelTitle[TrainingLevel.Professional] }
];
