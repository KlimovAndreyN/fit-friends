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
  Login = '/login',
  Register = '/register',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

//! временно
export const mockData = { authorizationStatus: AuthorizationStatus.NoAuth };
