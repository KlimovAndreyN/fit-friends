import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUpdateUserProfileDto, IQuestionnaireRdo, IUserProfileRdo, Role,
  FILE_KEY, IDetailUserProfileRdo, UserProfileRoute, ApiServiceRoute,
  isSportsmanRole, ICertificateRdo
} from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

import { CreateQuestionnaireDto } from '../../types/types';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  EXIST_QUESTIONNARE: 'account/exist-questionnaire',
  CREATE_QUESTIONNARE: 'account/create-questionnaire',
  FETCH_USER_PROFILE: 'account/fetch',
  UPDATE_USER_PROFILE: 'account/update',
  CREATE_COACH_CERTIFICATE: 'account/create-certificate',
  UPDATE_COACH_CERTIFICATE: 'account/update-certificate',
  DELETE_COACH_CERTIFICATE: 'account/delete-certificate',
  CHANGE_READY: 'account/change-ready',
  FETCH_LOOK_FOR_COMPANY_USER_PROFILES: 'look-for-company-account/fetch',
  FETCH_USER_PROFILES: 'accounts/fetch'
};

export const existQuestionnaire = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.Questionnaires);
    await api.get<boolean>(url, { notFoundToReject: true });
  }
);

export const createQuestionnaire = createAsyncThunk<void, { dto: CreateQuestionnaireDto; userRole: Role }, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async ({ dto, userRole }, { extra }) => {
    const { api } = extra;
    const isSportsman = isSportsmanRole(userRole);
    const subUrl = isSportsman ? UserProfileRoute.QuestionnairesSportsman : UserProfileRoute.QuestionnairesCoach;
    const url = joinUrl(ApiServiceRoute.UserProfiles, subUrl);

    await api.post<IQuestionnaireRdo>(url, dto, { useMultipartFormData: !isSportsman });
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
    const { data } = await api.patch<IDetailUserProfileRdo>(ApiServiceRoute.UserProfiles, dto, { useMultipartFormData: true });

    return data;
  }
);

export const createCoachCertificate = createAsyncThunk<ICertificateRdo, File, { extra: Extra }>(
  Action.CREATE_COACH_CERTIFICATE,
  async (file, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.Certificates);
    const { data } = await api.post<ICertificateRdo>(url, { [FILE_KEY]: file }, { useMultipartFormData: true });

    return data;
  }
);

//! нужет тип?
export const updateCoachCertificate = createAsyncThunk<ICertificateRdo, { fileId: string; file: File }, { extra: Extra }>(
  Action.UPDATE_COACH_CERTIFICATE,
  async ({ fileId, file }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.Certificates, fileId);
    const { data } = await api.patch<ICertificateRdo>(url, { [FILE_KEY]: file }, { useMultipartFormData: true });

    return data;
  }
);

export const deleteCoachCertificate = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_COACH_CERTIFICATE,
  async (fileId, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserProfiles, UserProfileRoute.Certificates, fileId);

    await api.delete<ICertificateRdo>(url);
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
