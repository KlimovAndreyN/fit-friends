import { History } from 'history';
import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ILoginUserDto, IDetailUserRdo, ITokenPayloadRdo, ILoggedUserRdo, ICreateUserDto } from '@backend/shared/core';

import { isErrorNetwork } from '../../utils/parse-axios-error';
import { AccessTokenStore, RefreshTokenStore } from '../../utils/token-store';
import { existQuestionnaire } from './user-profile-action';
import { ApiRoute } from '../../const';

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
    const { data } = await api.get<ITokenPayloadRdo>(ApiRoute.CHECK);

    dispatch(existQuestionnaire());

    return data;
  }
);

export const loginUser = createAsyncThunk<ITokenPayloadRdo, ILoginUserDto, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<ILoggedUserRdo>(ApiRoute.LOGIN, { email, password });
    const {
      tokens: { accessToken, refreshToken },
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
    let needDropTokens = true;

    try {
      await api.delete<ITokenPayloadRdo>(ApiRoute.LOGOUT);

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

    await api.post<IDetailUserRdo>(ApiRoute.REGISTER, dto, { useMultipartFormData: true });

    const { email, password } = dto;

    dispatch(loginUser({ email, password }));
  }
);
