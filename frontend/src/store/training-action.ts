import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, ITrainingRdo, TrainingRoute } from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_FOR_SPORTSMAN_TRAININGS: 'for-sportsman-trainings/fetch'
};

export const fetchForSportsmanTrainings = createAsyncThunk<ITrainingRdo[], undefined, { extra: Extra }>(
  Action.FETCH_FOR_SPORTSMAN_TRAININGS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ITrainingRdo[]>(joinUrl(ApiServiceRoute.Trainings, TrainingRoute.ForSportsman));

    return data;
  }
);
