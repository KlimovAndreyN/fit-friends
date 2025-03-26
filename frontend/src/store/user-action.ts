import { History } from 'history';
import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AccountRoute, ApiServiceRoute, ILoginUserDto, ITokenPayloadRdo, IUserRdo, ILoggedUserRdo, ICreateUserDto } from '@backend/shared';

import { isErrorNetwork } from '../utils/parse-axios-error';
import { joinUrl } from '../utils/common';
import { AccessTokenStore, RefreshTokenStore } from '../utils/token-store';
import { existQuestionnaire } from './user-info-action';
import { multipartFormDataHeader } from '../const';

type Extra = {
  api: AxiosInstance;
  history: History; //! пригодилось?
};

export const Action = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register'
};


export const fetchUserStatus = createAsyncThunk<ITokenPayloadRdo, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra, dispatch }) => {
    // если токена изначально нет, то и проверять не нужно...
    if (!AccessTokenStore.getToken()) {
      return Promise.reject('AccessToken is empty!');
    }

    const { api } = extra;
    const checkUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Check);
    const { data } = await api.get<ITokenPayloadRdo>(checkUrl);

    dispatch(existQuestionnaire());

    return data;
  }
);

export const loginUser = createAsyncThunk<ITokenPayloadRdo, ILoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra, dispatch }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Login);
    const { data } = await api.post<ILoggedUserRdo>(url, { email, password });
    const {
      token: { accessToken, refreshToken },
      id: sub,
      email: dataEmail,
      name,
      role } = data;

    AccessTokenStore.save(accessToken);
    RefreshTokenStore.save(refreshToken);

    dispatch(existQuestionnaire());

    return { sub, email: dataEmail, name, role };
  }
);

export const logoutUser = createAsyncThunk<boolean, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);
    let needDropTokens = true;

    try {
      await api.delete<ITokenPayloadRdo>(url);

    } catch (error) {
      if (error instanceof AxiosError) {
        needDropTokens = !isErrorNetwork(error);
      }
    }

    if (needDropTokens) {
      AccessTokenStore.drop();
      RefreshTokenStore.drop();
    }

    return needDropTokens;
  }
);

export const registerUser = createAsyncThunk<void, ICreateUserDto, { extra: Extra }>(
  Action.REGISTER_USER,
  async (dto, { extra, dispatch }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Register);

    await api.post<IUserRdo>(url, dto, { headers: multipartFormDataHeader });

    const { email, password } = dto;

    dispatch(loginUser({ email, password }));
  }
);
