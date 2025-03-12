import { joinUrl, RouteAlias } from './types/backend';

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
  Login: joinUrl(RouteAlias.Users, RouteAlias.Login),
  Check: joinUrl(RouteAlias.Users, RouteAlias.Check),
  Refresh: joinUrl(RouteAlias.Users, RouteAlias.Refresh),
  Logout: joinUrl(RouteAlias.Users, RouteAlias.Logout),
  Register: joinUrl(RouteAlias.Users, RouteAlias.Refresh),
} as const;

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

