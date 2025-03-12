import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AccessTokenStore, RefreshTokenStore } from '../utils/token-store';
import { LoggedUserRdo, LoginUserDto, TokenPayloadRdo } from '../types/backend';
import { ApiRoute, AppRoute, HttpCode } from '../const';

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

export const fetchUserStatus = createAsyncThunk<string, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<TokenPayloadRdo>(ApiRoute.Check);

      return data.name;
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.status === HttpCode.NoAuth) {
        AccessTokenStore.drop();
        RefreshTokenStore.drop();
      }

      return Promise.reject(error);
    }
  }
);

export const loginUser = createAsyncThunk<string, LoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<LoggedUserRdo>(ApiRoute.Login, { email, password });
    const { accessToken, refreshToken, email: loggedEmail } = data;

    AccessTokenStore.save(accessToken);
    RefreshTokenStore.save(refreshToken);
    //! useNavigate не работает
    history.push(AppRoute.Root);

    return loggedEmail;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  () => {
    AccessTokenStore.drop();
    RefreshTokenStore.drop();
  }
);
//!
/*
export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name }, { extra }) => {
    const { api, history } = extra;
    const user = { email, password, name };

    await api.post<{ id: string }>(ApiRoute.Register, user);

    history.push(AppRoute.Root);
  }
);
*/
