import { History } from 'history';
import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AccountRoute, ApiServiceRoute, ILoginUserDto, ITokenPayloadRdo, IQuestionnaireRdo,
  ILoggedUserRdo, ICreateUserDto, IUserRdo, QuestionnaireRoute, ICreateQuestionnaireDto,
  ApiRoute, IUserInfoRdo,
} from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from '../utils/token-store';
import { isErrorNetwork } from '../utils/parse-axios-error';
import { joinUrl } from '../utils/common';
import { multipartFormDataHeader } from '../const';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
  EXIST_QUESTIONNARE: 'user/exist-questionnaire',
  CREATE_QUESTIONNARE: 'user/create-questionnaire',
  GET_USER_INFO: 'user/get-user-ingo'
};

export const existQuestionnaire = createAsyncThunk<boolean, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.FitQuestionnaires, QuestionnaireRoute.Exist);
    const { data } = await api.get<boolean>(url);

    return data;
  }
);

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
    //!
    // eslint-disable-next-line no-console
    console.log('loginUser.begin');
    //!
    const { api, /*history*/ } = extra;
    const url = joinUrl(ApiServiceRoute.Users, AccountRoute.Login);
    const { data } = await api.post<ILoggedUserRdo>(url, { email, password });
    const { accessToken, refreshToken, id: sub, email: dataEmail, name, role } = data;

    AccessTokenStore.save(accessToken);
    RefreshTokenStore.save(refreshToken);

    //! useNavigate не работает
    //! а нужно ли статус же дернется... history.push(AppRoute.Root);

    //!
    // eslint-disable-next-line no-console
    console.log('loginUser.end');

    dispatch(existQuestionnaire());

    return { sub, email: dataEmail, name, role };
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api, /*history*/ } = extra;
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
        //! отладить удаление
        AccessTokenStore.drop();
        RefreshTokenStore.drop();
      }

      //! useNavigate не работает
      //history.push(AppRoute.Intro);
    }
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

export const createQuestionnaire = createAsyncThunk<void, ICreateQuestionnaireDto, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async (dto, { extra }) => {
    const { api } = extra;
    const url = ApiServiceRoute.FitQuestionnaires;

    //! multipartFormDataHeader перепроверить когда будут файлы от тренера, т.к. сейчас нет @UseInterceptors(FileInterceptor(files...?)) в контроллере
    //await api.post<IQuestionnaireRdo>(url, dto, { headers: multipartFormDataHeader });
    await api.post<IQuestionnaireRdo>(url, dto);
  }
);

export const fetchUserInfo = createAsyncThunk<IUserInfoRdo, undefined, { extra: Extra }>(
  Action.GET_USER_INFO,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Users, ApiRoute.GetUserInfo);
    const { data } = await api.get<IUserInfoRdo>(url);

    return data;
  }
);
