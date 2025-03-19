import { History } from 'history';
import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AccountRoute, ApiServiceRoute, ILoginUserDto, ITokenPayloadRdo,
  ILoggedUserRdo, ICreateUserDto, IUserRdo, IUserTokenRdo
} from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from '../utils/token-store';
import { isErrorNetwork } from '../utils/parse-axios-error';
import { joinUrl } from '../utils/common';
import { AppRoute, HttpCode, multipartFormDataHeader } from '../const';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register'
};

export const fetchUserStatus = createAsyncThunk<ITokenPayloadRdo, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    // если токена изначально нет, то и проверять не нужно...
    if (!AccessTokenStore.getToken()) {
      return Promise.reject();
    }

    const { api } = extra;
    const checkUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Check);

    try {
      const { data } = await api.get<ITokenPayloadRdo>(checkUrl);

      return data;
    } catch (checkTokenError) {
      if (checkTokenError instanceof AxiosError) {
        if (checkTokenError.response?.status !== HttpCode.NoAuth) {
          if (!isErrorNetwork(checkTokenError)) {
            AccessTokenStore.drop();
            RefreshTokenStore.drop();
          }

          return Promise.reject();
        }

        // Пробуем получить AccessToken через RefreshToken, если он есть
        if (!RefreshTokenStore.getToken()) {
          AccessTokenStore.drop();

          return Promise.reject();
        }

        const refreshUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh);

        try {
          const { data: { accessToken, refreshToken } } = await api.post<IUserTokenRdo>(refreshUrl);

          AccessTokenStore.save(accessToken);
          RefreshTokenStore.save(refreshToken);

          const { data } = await api.get<ITokenPayloadRdo>(checkUrl);

          return data;
        } catch (refreshTokenError) {
          if (refreshTokenError instanceof AxiosError) {
            if (!isErrorNetwork(refreshTokenError)) {
              AccessTokenStore.drop();
              RefreshTokenStore.drop();
            }

            return Promise.reject();
          }
        }
      }

      return Promise.reject();
    }
  }
);

export const loginUser = createAsyncThunk<ITokenPayloadRdo, ILoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    //!
    // eslint-disable-next-line no-console
    console.log('loginUser.begin');
    //!
    const { api, /*history*/ } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Login);
    const { data } = await api.post<ILoggedUserRdo>(url, { email, password });
    const { accessToken, refreshToken, id: sub, email: dataEmail, name, role, existQuestionnaire } = data;

    AccessTokenStore.save(accessToken);
    RefreshTokenStore.save(refreshToken);

    //! useNavigate не работает
    //! а нужно ли статус же дернется... history.push(AppRoute.Root);

    //!
    // eslint-disable-next-line no-console
    console.log('loginUser.end');

    return { sub, email: dataEmail, name, role, existQuestionnaire };
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api, history } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);
    let needDropTokens = true;

    try {
      //! при выходе могут быть ошибки: связь, 404 ... нужно их обработать... logoutUser.pending logoutUser.rejected
      await api.delete<ITokenPayloadRdo>(url);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!isErrorNetwork(error)) {
          needDropTokens = false;
        }
      }
    } finally {
      if (needDropTokens) {
        AccessTokenStore.drop();
        RefreshTokenStore.drop();
      }

      //! useNavigate не работает
      history.push(AppRoute.Intro);
    }
  }
);

export const registerUser = createAsyncThunk<void, ICreateUserDto, { extra: Extra }>(
  Action.REGISTER_USER,
  async (dto, { extra, dispatch }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Register);

    //! проверка асинхронности действий для вызова dispatch(fetchUserStatus()) перед каждым действием, а может возможно сделать еще middleware? если в там можно вызвать dispatch...
    // eslint-disable-next-line no-console
    console.log('registerUser.before.reg');

    await api.post<IUserRdo>(url, dto, { headers: multipartFormDataHeader });
    //!
    // eslint-disable-next-line no-console
    console.log('registerUser.after.reg');

    const { email, password } = dto;
    //!
    // eslint-disable-next-line no-console
    console.log('registerUser.before.dispatch');
    dispatch(loginUser({ email, password }));
    //!
    // eslint-disable-next-line no-console
    console.log('registerUser.after.dispatch');
  }
);
