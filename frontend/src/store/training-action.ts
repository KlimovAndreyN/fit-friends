import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, IDetailTrainingRdo, ITrainingRdo, TrainingRoute } from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_FOR_SPORTSMAN_TRAININGS: 'for-sportsman-trainings/fetch',
  FETCH_SPECIAL_TRAININGS: 'special-trainings/fetch',
  FETCH_POPULAR_TRAININGS: 'popular-trainings/fetch',
  FETCH_TRAININGS: 'trainings/fetch',
  FETCH_DETAIL_TRAINING: 'detail-training/fetch'
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

export const fetchTrainings = createAsyncThunk<ITrainingRdo[], undefined, { extra: Extra }>(
  Action.FETCH_TRAININGS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.Popular)); //! временно и нужны параметры для поиска

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
