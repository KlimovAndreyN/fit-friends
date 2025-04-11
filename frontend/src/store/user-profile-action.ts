import { History } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUpdateUserProfileDto, ICreateQuestionnaireSportsmanDto, IQuestionnaireRdo,
  ApiServiceRoute, IDetailUserProfileRdo, QuestionnaireRoute, UserProfileRoute,
  Role, IUserProfileRdo
} from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

import { multipartFormDataHeader } from '../const';

type Extra = {
  api: AxiosInstance;
  history: History; //! пригодилось?
};

export const Action = {
  EXIST_QUESTIONNARE: 'user-profile/exist-questionnaire',
  CREATE_QUESTIONNARE: 'user-profile/create-questionnaire',
  FETCH_USER_PROFILE: 'user-profile/fetch',
  UPDATE_USER_PROFILE: 'user-profile/update',
  CHANGE_READY: 'user-profile/change-ready',
  FETCH_LOOK_FOR_COMPANY_USER_PROFILES: 'look-for-company-user-profile/fetch',
  FETCH_USER_PROFILES: 'user-profiles/fetch'
};

export const existQuestionnaire = createAsyncThunk<boolean, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, QuestionnaireRoute.Exist);
    const { data } = await api.get<boolean>(url);

    return data;
  }
);

export const createQuestionnaire = createAsyncThunk<void, { dto: ICreateQuestionnaireSportsmanDto; userRole: Role }, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async ({ dto, userRole }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, QuestionnaireRoute.Questionnaire, userRole);

    //! multipartFormDataHeader перепроверить когда будут файлы от тренера, т.к. сейчас нет @UseInterceptors(FileInterceptor(files...?)) в контроллере
    //await api.post<IQuestionnaireRdo>(url, dto, { headers: multipartFormDataHeader });
    await api.post<IQuestionnaireRdo>(url, dto);
  }
);

export const fetchUserProfile = createAsyncThunk<IDetailUserProfileRdo, undefined, { extra: Extra }>(
  Action.FETCH_USER_PROFILE,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IDetailUserProfileRdo>(ApiServiceRoute.UserProfiles);

    return data;
  }
);

export const changeReadyForTraining = createAsyncThunk<boolean, boolean, { extra: Extra }>(
  Action.CHANGE_READY,
  async (ready, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.ReadyForTraining);

    if (ready) {
      await api.post(url);
    } else {
      await api.delete(url);
    }

    return ready;
  }
);

export const updateUserProfile = createAsyncThunk<IDetailUserProfileRdo, IUpdateUserProfileDto, { extra: Extra }>(
  Action.UPDATE_USER_PROFILE,
  async (dto, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<IDetailUserProfileRdo>(ApiServiceRoute.UserProfiles, dto, { headers: multipartFormDataHeader });

    return data;
  }
);

export const fetchLookForCompanyUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_LOOK_FOR_COMPANY_USER_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    //! временно
    const { data } = await api.get<IDetailUserProfileRdo>(ApiServiceRoute.UserProfiles);
    // eslint-disable-next-line no-console
    console.log('fetchLookForCompanyUserProfiles', data);

    return [];
  }
);

export const fetchUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_USER_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    //! временно
    const { data } = await api.get<IDetailUserProfileRdo>(ApiServiceRoute.UserProfiles);
    // eslint-disable-next-line no-console
    console.log('fetchUserProfiles', data);

    return [];
  }
);
