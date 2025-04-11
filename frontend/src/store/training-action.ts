import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, Duration, Gender, IDetailTrainingRdo, ITrainingRdo, Specialization, TrainingLevel, TrainingRoute } from '@backend/shared/core';
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

export const fetchDetailTraining = createAsyncThunk<IDetailTrainingRdo, undefined, { extra: Extra }>(
  Action.FETCH_DETAIL_TRAINING,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.ForSportsman)); //! временно и нужен trainingId

    //! временно! отладка!
    // eslint-disable-next-line no-console
    console.log('fetchDetailTraining - data', data);

    const rdo: IDetailTrainingRdo = {
      backgroundPath: '',
      caloriesWaste: 10,
      coach: {
        id: '1112222',
        name: '111111',
        avatarFilePath: '3333'
      },
      createdDate: '2025-01-01',
      description: '',
      duration: Duration.Minutes_10_30,
      gender: Gender.Female,
      id: '1122',
      isSpecial: true,
      price: 100,
      rating: 4,
      specialization: Specialization.Aerobics,
      title: '1111',
      trainingLevel: TrainingLevel.Amateur,
      videoFilePath: ''
    };
    return rdo;
    //

    //!return data;
  }
);
