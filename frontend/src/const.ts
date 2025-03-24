import { Duration, MetroStationName, Specialization, UserGender, UserLevel, UserRole } from '@backend/shared';
import { Option } from './types/option';

const MAIN_TITLE = 'FitFriends';

export enum PageTitle {
  Index = MAIN_TITLE,
  Loading = `Загрузка... — ${MAIN_TITLE}`,
  Intro = `Разводящая — ${MAIN_TITLE}`,
  SignIn = `Войти — ${MAIN_TITLE}`,
  SignUp = `Регистрация — ${MAIN_TITLE}`,
  Questionnaire = `Опросник — ${MAIN_TITLE}`,
  PersonalAccount = `Личный кабинет — ${MAIN_TITLE}`,
  FriendsList = `Список друзей — ${MAIN_TITLE}`,
  NotFound = `404 — ${MAIN_TITLE}`
}

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Questionnaire = '/questionnaire',
  PersonalAccount = '/personal-account',
  FriendsList = '/friends-list',
  NotFound = '/404',
}

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

export const multipartFormDataHeader = { 'Content-Type': 'multipart/form-data' } as const;

export const DefaultUser = {
  ROLE: UserRole.Sportsman,
  GENDER: UserGender.Female,
  SPECIALISATIONS: [
    Specialization.Boxing as string,
    Specialization.Crossfit as string,
    Specialization.Power as string
  ],
  TIME: Duration.Minutes_30_50,
  LEVEL: UserLevel.Amateur
} as const;

export const UserRoleOption: { [key in UserRole]: { singUpTitle: string; svgIcon: string; endingClassName: string } } = {
  [UserRole.Sportsman]: { singUpTitle: 'Я хочу тренироваться', svgIcon: '#icon-weight', endingClassName: 'user' },
  [UserRole.Coach]: { singUpTitle: 'Я хочу тренировать', svgIcon: '#icon-cup', endingClassName: 'coath' }
} as const;

export const USER_ROLES = [
  UserRole.Coach,
  UserRole.Sportsman
] as const;

export const UserGenderTitle: { [key in UserGender]: string } = {
  [UserGender.Female]: 'Женский',
  [UserGender.Male]: 'Мужской',
  [UserGender.NotMatter]: 'Неважно',
} as const;

export const USER_GENDERS: Option[] = [
  { value: UserGender.Male, title: UserGenderTitle[UserGender.Male] },
  { value: UserGender.Female, title: UserGenderTitle[UserGender.Female] },
  { value: UserGender.NotMatter, title: UserGenderTitle[UserGender.NotMatter] }
];

export const MetroStationTitle: { [key in MetroStationName]: string } = {
  [MetroStationName.Petrogradskaya]: 'Петроградская',
  [MetroStationName.Pionerskaya]: 'Пионерская',
  [MetroStationName.Sportivnaya]: 'Спортивная',
  [MetroStationName.Udelnaya]: 'Удельная',
  [MetroStationName.Zvezdnaya]: 'Звёздная'
} as const;

export const LOCATIONS: Option[] = [
  { value: MetroStationName.Pionerskaya, title: MetroStationTitle[MetroStationName.Pionerskaya] },
  { value: MetroStationName.Petrogradskaya, title: MetroStationTitle[MetroStationName.Petrogradskaya] },
  { value: MetroStationName.Udelnaya, title: MetroStationTitle[MetroStationName.Udelnaya] },
  { value: MetroStationName.Zvezdnaya, title: MetroStationTitle[MetroStationName.Zvezdnaya] },
  { value: MetroStationName.Sportivnaya, title: MetroStationTitle[MetroStationName.Sportivnaya] }
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

export const UserLevelTitle: { [key in UserLevel]: string } = {
  [UserLevel.Amateur]: 'Любитель',
  [UserLevel.Beginner]: 'Новичок',
  [UserLevel.Professional]: 'Профессионал'
} as const;

export const USER_LEVELS: Option[] = [
  { value: UserLevel.Beginner, title: UserLevelTitle[UserLevel.Beginner] },
  { value: UserLevel.Amateur, title: UserLevelTitle[UserLevel.Amateur] },
  { value: UserLevel.Professional, title: UserLevelTitle[UserLevel.Professional] }
];
