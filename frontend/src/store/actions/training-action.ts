import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ApiServiceRoute, ICreateTrainingDto, IDetailTrainingRdo, isForFreeSortType,
  ITrainingQuery, ITrainingRdo, ITrainingsWithPaginationRdo, TrainingRoute
} from '@backend/shared/core';
import { getQueryString, joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_FOR_SPORTSMAN_TRAININGS: 'training/fetch-for-sportsman-trainings',
  FETCH_SPECIAL_TRAININGS: 'training/fetch-special-trainings',
  FETCH_POPULAR_TRAININGS: 'training/fetch-popular-trainings',
  FETCH_TRAININGS: 'training/fetch-trainings',
  FETCH_DETAIL_TRAINING: 'training/fetch-detail-training',
  CHANGE_IS_SPECIAL_TRAINING: 'training/change-is-special-training',
  UPDATE_TRAINING: 'training/update-training',
  CREATE_TRAINING: 'training/create-training',
  FETCH_COACH_TRAININGS: 'training/fetch-coach-trainings'
};

//! почти одинаковые запросы, может как то объеденить получение ITrainingRdo[]
export const fetchForSportsmanTrainings = createAsyncThunk<ITrainingRdo[], undefined, { extra: Extra }>(
  Action.FETCH_FOR_SPORTSMAN_TRAININGS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.ForSportsman));

    return data;
  }
);

export const fetchSpecialTrainings = createAsyncThunk<ITrainingRdo[], undefined, { extra: Extra }>(
  Action.FETCH_SPECIAL_TRAININGS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.Special));

    return data;
  }
);

export const fetchPopularTrainings = createAsyncThunk<ITrainingRdo[], undefined, { extra: Extra }>(
  Action.FETCH_POPULAR_TRAININGS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.Popular));

    return data;
  }
);

export const fetchTrainings = createAsyncThunk<ITrainingsWithPaginationRdo, ITrainingQuery, { extra: Extra }>(
  Action.FETCH_TRAININGS,
  async (query, { extra }) => {
    const { api } = extra;
    const { sortType, priceMin: realPriceMin, priceMax: realPriceMax } = query;
    let priceMin = realPriceMin;
    let priceMax = realPriceMax;

    if (isForFreeSortType(sortType)) {
      priceMin = undefined;
      priceMax = undefined;
    }

    const queryString = getQueryString({ ...query, priceMin, priceMax });
    const { data } = await api.get<ITrainingsWithPaginationRdo>(joinUrl(ApiServiceRoute.Trainings, queryString));

    return data;
  }
);

export const fetchDetailTraining = createAsyncThunk<IDetailTrainingRdo, string, { extra: Extra }>(
  Action.FETCH_DETAIL_TRAINING,
  async (trainingId, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IDetailTrainingRdo>(joinUrl(ApiServiceRoute.Trainings, trainingId));

    return data;
  }
);

export const changeIsSpecialTraining = createAsyncThunk<IDetailTrainingRdo, { trainingId: string; isSpecial: boolean }, { extra: Extra }>(
  Action.CHANGE_IS_SPECIAL_TRAINING,
  async ({ trainingId, isSpecial }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Trainings, trainingId);
    //! проверить
    const { data } = await api.patch<IDetailTrainingRdo>(url, { isSpecial });

    return data;
  }
);

//! на вход будет IUpdateTrainingDto вместо IDetailTrainingRdo
export const updateTraining = createAsyncThunk<IDetailTrainingRdo, IDetailTrainingRdo, { extra: Extra }>(
  Action.UPDATE_TRAINING,
  async (dto, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.Trainings, dto.id);

    //! перепроверить когда будет файл
    const { data } = await api.patch<IDetailTrainingRdo>(url, dto, { useMultipartFormData: true });

    return data;
  }
);

export const createTraining = createAsyncThunk<void, ICreateTrainingDto, { extra: Extra }>(
  Action.CREATE_TRAINING,
  async (dto, { extra }) => {
    const { api } = extra;
    await api.post<IDetailTrainingRdo>(ApiServiceRoute.Trainings, dto, { useMultipartFormData: true });
  }
);

export const fetchCoachTrainings = createAsyncThunk<ITrainingRdo[], string, { extra: Extra }>(
  Action.FETCH_COACH_TRAININGS,
  async (coachId, { extra }) => {
    const { api } = extra;
    const query: ITrainingQuery = { coachId };
    const queryString = getQueryString(query);
    const { data: { entities } } = await api.get<ITrainingsWithPaginationRdo>(joinUrl(ApiServiceRoute.Trainings, queryString));

    return entities;
  }
);
