import { AccountRoute, ApiServiceRoute } from '@backend/shared/constants/route';

import { joinUrl } from './utils/common';

export const AUTH_NAME = 'authorization';
export const MAIN_TITLE = 'FitFriends';

export const PageTitle = {
  Index: MAIN_TITLE,
  Loading: `Загрузка... — ${MAIN_TITLE}`,
  Intro: `Разводящая — ${MAIN_TITLE}`,
  SignIn: `Войти — ${MAIN_TITLE}`,
  SignUp: `Регистрация — ${MAIN_TITLE}`,
  Questionnaire: `Опросник — ${MAIN_TITLE}`,
  PersonalAccount: `Личный кабинет — ${MAIN_TITLE}`,
  FriendsList: `Список друзей — ${MAIN_TITLE}`,
  NotFound: `404 — ${MAIN_TITLE}`
} as const;

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  PersonalAccount = '/personal-account',
  FriendsList = '/friends-list',
  NotFound = '/404',
}

export const ApiRoute = {
  Login: joinUrl(ApiServiceRoute.Users, AccountRoute.Login),
  Check: joinUrl(ApiServiceRoute.Users, AccountRoute.Check),
  Refresh: joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh),
  Logout: joinUrl(ApiServiceRoute.Users, AccountRoute.Logout),
  Register: joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh)
} as const;

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}
