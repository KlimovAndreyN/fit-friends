import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, IReviewRdo } from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_REVIEWS: 'reviews/fetch'
};

export const fetchReviews = createAsyncThunk<IReviewRdo[], string, { extra: Extra }>(
  Action.FETCH_REVIEWS,
  async (trainingId, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IReviewRdo[]>(joinUrl(ApiServiceRoute.Reviews, trainingId));

    return data;
  }
);
