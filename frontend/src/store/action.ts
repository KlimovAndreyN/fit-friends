import { History } from 'history';
import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AccountRoute, ApiServiceRoute, ILoginUserDto, ITokenPayloadRdo, ILoggedUserRdo } from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from '../utils/token-store';
import { joinUrl } from '../utils/common';
import { AppRoute, HttpCode } from '../const';

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
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Check);

    try {
      const { data } = await api.get<ITokenPayloadRdo>(url);

      return data;
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

export const loginUser = createAsyncThunk<ITokenPayloadRdo, ILoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Login);
    const { data } = await api.post<ILoggedUserRdo>(url, { email, password });
    const { accessToken, refreshToken, id: sub, email: dataEmail, name, role } = data;

    AccessTokenStore.save(accessToken);
    RefreshTokenStore.save(refreshToken);

    //! useNavigate не работает
    history.push(AppRoute.Root);

    return { sub, email: dataEmail, name, role };
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api, history } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);

    try {
      await api.delete<ITokenPayloadRdo>(url);
    } finally {
      AccessTokenStore.drop();
      RefreshTokenStore.drop();

      //! useNavigate не работает
      history.push(AppRoute.Intro);
    }
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
