import { createSlice } from '@reduxjs/toolkit';

import { TrainingProcess } from '../../types/training-process';
import { fetchForSportsmanTrainings } from '../training-action';
import { StoreSlice } from '../../const';

const initialState: TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: false,
  forSportsmanTrainings: []
};

export const trainingProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          fetchForSportsmanTrainings.pending,
          (state) => {
            state.isFetchForSportsmanTrainingsExecuting = true;
          }
        )
        .addCase(
          fetchForSportsmanTrainings.rejected,
          (state) => {
            state.isFetchForSportsmanTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchForSportsmanTrainings.fulfilled,
          (state, action) => {
            state.forSportsmanTrainings = action.payload;
            state.isFetchForSportsmanTrainingsExecuting = false;
          }
        );
    }
  }
);
