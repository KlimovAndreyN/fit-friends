import { History } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUpdateUserProfileDto, IQuestionnaireRdo, IUserProfileRdo, ApiServiceRoute,
  IDetailUserProfileRdo, UserProfileRoute, Role, isSportsmanRole
} from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

import { CreateQuestionnaireDto } from '../../types/types';
import { multipartFormDataHeader } from '../../const';

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

export const existQuestionnaire = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.Questionnaire);
    await api.get<boolean>(url, { notFoundToReject: true });
  }
);

//! временно
export function dtoToFormData<T extends object>(dto: T): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(dto)) {
    // если массив, то все значения добавляем отдельно
    if (Array.isArray(value)) {
      value.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append(key, item);
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      formData.append(key, value);
    }
  }

  return formData;
}

export const createQuestionnaire = createAsyncThunk<void, { dto: CreateQuestionnaireDto; userRole: Role }, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async ({ dto, userRole }, { extra }) => {
    const { api } = extra;
    const isSportsman = isSportsmanRole(userRole);
    const subUrl = isSportsman ? UserProfileRoute.QuestionnaireSportsman : UserProfileRoute.QuestionnaireCoach;
    const url = joinUrl(ApiServiceRoute.UserProfiles, subUrl);

    console.log('dtoToFormData(dto)', dtoToFormData(dto));

    //! отладка
    //await api.post<IQuestionnaireRdo>(url, dtoToFormData(dto), { useMultipartFormData: !isSportsman }); //! тест
    //!await api.post<IQuestionnaireRdo>(url, dto, { useMultipartFormData: !isSportsman }); //! тест
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
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.LookForCompany);
    const { data } = await api.get<IUserProfileRdo[]>(url);

    return data;
  }
);

export const fetchUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_USER_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.LookForCompany);
    //! временно, заготовка!
    const { data } = await api.get<IUserProfileRdo[]>(url);
    // eslint-disable-next-line no-console
    console.log('fetchUserProfiles', data);

    return [];//! временно, заготовка!
  }
);
