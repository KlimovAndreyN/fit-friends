import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUpdateUserProfileDto, IQuestionnaireRdo, FILE_KEY, IDetailUserProfileRdo,
  Role, UserProfileRoute, ApiServiceRoute, isSportsmanRole, ICertificateRdo
} from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

import { CreateQuestionnaireDto } from '../../types/types';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  EXIST_QUESTIONNARE: 'account/exist-questionnaire',
  CREATE_QUESTIONNARE: 'account/create-questionnaire',
  FETCH_ACCOUNT: 'account/fetch-account',
  UPDATE_ACCOUNT: 'account/update-account',
  CREATE_COACH_CERTIFICATE: 'account/create-coach-certificate',
  UPDATE_COACH_CERTIFICATE: 'account/update-coach-certificate',
  DELETE_COACH_CERTIFICATE: 'account/delete-coach-certificate',
  CHANGE_READY_FOR_TRAINING: 'account/change-ready-for-training'
};

export const existQuestionnaire = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.EXIST_QUESTIONNARE,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Accounts, UserProfileRoute.Questionnaires);
    await api.get<boolean>(url, { notFoundToReject: true });
  }
);

export const createQuestionnaire = createAsyncThunk<void, { dto: CreateQuestionnaireDto; userRole: Role }, { extra: Extra }>(
  Action.CREATE_QUESTIONNARE,
  async ({ dto, userRole }, { extra }) => {
    const { api } = extra;
    const isSportsman = isSportsmanRole(userRole);
    const subUrl = isSportsman ? UserProfileRoute.QuestionnairesSportsman : UserProfileRoute.QuestionnairesCoach;
    const url = joinUrl(ApiServiceRoute.Accounts, subUrl);

    await api.post<IQuestionnaireRdo>(url, dto, { useMultipartFormData: !isSportsman });
  }
);

export const fetchAccount = createAsyncThunk<IDetailUserProfileRdo, undefined, { extra: Extra }>(
  Action.FETCH_ACCOUNT,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IDetailUserProfileRdo>(ApiServiceRoute.Accounts);

    return data;
  }
);

export const changeReadyForTraining = createAsyncThunk<boolean, boolean, { extra: Extra }>(
  Action.CHANGE_READY_FOR_TRAINING,
  async (ready, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Accounts, UserProfileRoute.ReadyForTraining);

    if (ready) {
      await api.post(url);
    } else {
      await api.delete(url);
    }

    return ready;
  }
);

export const updateAccount = createAsyncThunk<IDetailUserProfileRdo, IUpdateUserProfileDto, { extra: Extra }>(
  Action.UPDATE_ACCOUNT,
  async (dto, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<IDetailUserProfileRdo>(ApiServiceRoute.Accounts, dto, { useMultipartFormData: true });

    return data;
  }
);

export const createCoachCertificate = createAsyncThunk<ICertificateRdo, File, { extra: Extra }>(
  Action.CREATE_COACH_CERTIFICATE,
  async (file, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Accounts, UserProfileRoute.Certificates);
    const { data } = await api.post<ICertificateRdo>(url, { [FILE_KEY]: file }, { useMultipartFormData: true });

    return data;
  }
);

//! нужет тип?
export const updateCoachCertificate = createAsyncThunk<ICertificateRdo, { fileId: string; file: File }, { extra: Extra }>(
  Action.UPDATE_COACH_CERTIFICATE,
  async ({ fileId, file }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Accounts, UserProfileRoute.Certificates, fileId);
    const { data } = await api.patch<ICertificateRdo>(url, { [FILE_KEY]: file }, { useMultipartFormData: true });

    return data;
  }
);

export const deleteCoachCertificate = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_COACH_CERTIFICATE,
  async (fileId, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Accounts, UserProfileRoute.Certificates, fileId);

    await api.delete<ICertificateRdo>(url);
  }
);
