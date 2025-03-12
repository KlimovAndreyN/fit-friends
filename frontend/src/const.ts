import { UploadedFileRdo } from './types/backend';

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

//! прокинуть через бэк
export enum ApiRoute {
  Login = '/users/login',
  Check = '/users/check',
  Refresh = '/users/refresh',
  Logout = '/users/logout',
  Register = 'users/register'
}

export enum StoreSlice {
  UserProcess = 'USER_PROCESS'
}

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

//! тест RDO
const aaa: UploadedFileRdo = {
  hashName: '',
  id: '',
  originalName: '',
  subDirectory: '',
  mimetype: '',
  size: 0
};

// eslint-disable-next-line no-console
console.log(aaa);
