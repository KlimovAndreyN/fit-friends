import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenStore } from '../utils/token-store';
import { LoginUserDto, Token, User } from '../types/backend';
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

export const fetchUserStatus = createAsyncThunk<User['name'], undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<User>(ApiRoute.Check);

      return data.name;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        TokenStore.drop();
      }

      return Promise.reject(error);
    }
  }
);

export const loginUser = createAsyncThunk<User['name'], LoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ login, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User & Token>(ApiRoute.Login, { login, password });
    const { accessToken, name } = data;

    TokenStore.save(accessToken);
    history.push(AppRoute.Root);

    return name;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  () => {
    TokenStore.drop();
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
