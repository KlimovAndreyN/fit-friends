import { AccountRoute, ApiServiceRoute } from '../../backend/libs/shared/core/src/lib/constants/route';

import { joinUrl } from './utils/backend';

export const AUTH_NAME = 'authorization';
export const MAIN_TITLE = 'FitFriends';

export const PageTitle = {
  Index: MAIN_TITLE,
  Intro: `Разводящая — ${MAIN_TITLE}`,
  Login: `Войти — ${MAIN_TITLE}`,
  Registration: `Регистрация — ${MAIN_TITLE}`,
  NotFound: `404 — ${MAIN_TITLE}`
} as const;

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  NotFound = '/404'
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
