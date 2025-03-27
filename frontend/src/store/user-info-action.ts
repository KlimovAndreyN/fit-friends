import { History } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, ICreateQuestionnaireSportsmanDto, IQuestionnaireRdo, IUpdateUserInfoDto, IUserInfoRdo, QuestionnaireRoute, UserInfoRoute, UserRole } from '@backend/shared';

import { joinUrl } from '../utils/common';

type Extra = {
  api: AxiosInstance;
  history: History; //! пригодилось?
};

export const Action = {
  EXIST_QUESTIONNARE: 'user-info/exist-questionnaire',
  CREATE_QUESTIONNARE: 'user-info/create-questionnaire',
  GET_USER_INFO: 'user-info/get',
  UPDATE_USER_INFO: 'user-info/update',
  CHANGE_READY: 'user-info/change-ready'
};

export const existQuestionnaire = createAsyncThunk<boolean, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserInfo, QuestionnaireRoute.Exist);
    const { data } = await api.get<boolean>(url);

    return data;
  }
);

export const createQuestionnaire = createAsyncThunk<void, { dto: ICreateQuestionnaireSportsmanDto; userRole: UserRole }, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async ({ dto, userRole }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserInfo, QuestionnaireRoute.Questionnaire, userRole);

    //! multipartFormDataHeader перепроверить когда будут файлы от тренера, т.к. сейчас нет @UseInterceptors(FileInterceptor(files...?)) в контроллере
    //await api.post<IQuestionnaireRdo>(url, dto, { headers: multipartFormDataHeader });
    await api.post<IQuestionnaireRdo>(url, dto);
  }
);

export const fetchUserInfo = createAsyncThunk<IUserInfoRdo, undefined, { extra: Extra }>(
  Action.GET_USER_INFO,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IUserInfoRdo>(ApiServiceRoute.UserInfo);

    return data;
  }
);

export const changeReadyForTraning = createAsyncThunk<boolean, boolean, { extra: Extra }>(
  Action.CHANGE_READY,
  async (ready, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserInfo, UserInfoRoute.ReadyForTraining);

    if (ready) {
      await api.post(url);
    } else {
      await api.delete(url);
    }

    return ready;
  }
);

export const updateUserInfo = createAsyncThunk<IUserInfoRdo, IUpdateUserInfoDto, { extra: Extra }>(
  Action.UPDATE_USER_INFO,
  async (dto, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<IUserInfoRdo>(ApiServiceRoute.UserInfo, dto);

    return data;
  }
);
