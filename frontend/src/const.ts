import { MetroStationName, Specialisation, UserGender, UserRole } from '@backend/shared';
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
  GENDER: UserGender.Female
} as const;

export const UserRoleOption: { [key in UserRole]: { sortOrder: number; title: string; svgIcon: string; endingClassName: string } } = {
  [UserRole.Sportsman]: { sortOrder: 2, title: 'Я хочу тренироваться', svgIcon: '#icon-weight', endingClassName: 'user' },
  [UserRole.Coath]: { sortOrder: 1, title: 'Я хочу тренировать', svgIcon: '#icon-cup', endingClassName: 'coath' }
} as const;

export const SORTED_USER_ROLES = Object.values(UserRole).sort((a, b) => (UserRoleOption[a].sortOrder - UserRoleOption[b].sortOrder));

export const UserGenderOption: { [key in UserGender]: { sortOrder: number; title: string } } = {
  [UserGender.Male]: { sortOrder: 1, title: 'Мужской' },
  [UserGender.Female]: { sortOrder: 2, title: 'Женский' },
  [UserGender.NotMatter]: { sortOrder: 3, title: 'Неважно' }
} as const;

export const SORTED_USER_GENDERS = Object.values(UserGender).sort((a, b) => (UserGenderOption[a].sortOrder - UserGenderOption[b].sortOrder));

export const MetroStationOption: { [key in MetroStationName]: { sortOrder: number; title: string } } = {
  [MetroStationName.Petrogradskaya]: { sortOrder: 2, title: 'Петроградская' },
  [MetroStationName.Pionerskaya]: { sortOrder: 1, title: 'Пионерская' },
  [MetroStationName.Sportivnaya]: { sortOrder: 5, title: 'Спортивная' },
  [MetroStationName.Udelnaya]: { sortOrder: 3, title: 'Удельная' },
  [MetroStationName.Zvezdnaya]: { sortOrder: 4, title: 'Звёздная' }
} as const;

export const LOCATIONS: Option[] = Object.values(MetroStationName)
  .sort((a, b) => (MetroStationOption[a].sortOrder - MetroStationOption[b].sortOrder))
  .map(
    (item) => ({
      value: item,
      title: MetroStationOption[item].title
    })
  );

//! еще будет для тренера и должно подменятся при изменении роли
export const USER_BACKGROUND_PATHS: Option[] = [
  { value: '/img/content/user-card-photo1.jpg', title: 'Фоновая картинка №1' },
  { value: '/img/content/user-card-photo2.jpg', title: 'Фоновая картинка №2' }
];

export const SpecialisationOption: { [key in Specialisation]: { sortOrder: number; title: string; defaultChecked: boolean } } = {
  [Specialisation.Aerobics]: { sortOrder: 4, title: 'Аэробика', defaultChecked: false },
  [Specialisation.Boxing]: { sortOrder: 6, title: 'Бокс', defaultChecked: true },
  [Specialisation.Crossfit]: { sortOrder: 5, title: 'Кроссфит', defaultChecked: true },
  [Specialisation.Pilates]: { sortOrder: 7, title: 'Пилатес', defaultChecked: false },
  [Specialisation.Power]: { sortOrder: 3, title: 'Силовые', defaultChecked: true },
  [Specialisation.Running]: { sortOrder: 2, title: 'Бег', defaultChecked: false },
  [Specialisation.Stretching]: { sortOrder: 8, title: 'Стрейчинг', defaultChecked: false },
  [Specialisation.Yoga]: { sortOrder: 1, title: 'Йога', defaultChecked: false }
} as const;

export const SORTED_SPECIALISATIONS = Object.values(Specialisation).sort((a, b) => (SpecialisationOption[a].sortOrder - SpecialisationOption[b].sortOrder));
