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

export enum ApiRoute {
  Login = '/users/login',
  Check = '/users/check',
  Logout = '/users/logout',
  Register = 'users/register'
}

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  NoAuth = 401
}
