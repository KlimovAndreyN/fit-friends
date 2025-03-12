import { AccountRoute, ApiServiceRoute, joinUrl, GlobalRoute } from './types/backend';

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

const Route = {
  Users: joinUrl(GlobalRoute.Global, ApiServiceRoute.Users)
} as const;

export const ApiRoute = {
  Login: joinUrl(Route.Users, AccountRoute.Login),
  Check: joinUrl(Route.Users, AccountRoute.Check),
  Refresh: joinUrl(Route.Users, AccountRoute.Refresh),
  Logout: joinUrl(Route.Users, AccountRoute.Logout),
  Register: joinUrl(Route.Users, AccountRoute.Refresh),
} as const;

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

