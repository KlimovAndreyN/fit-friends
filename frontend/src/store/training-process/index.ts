import { createSlice } from '@reduxjs/toolkit';

import { TrainingProcess } from '../../types/process/training.process';
import { fetchDetailTraining, fetchForSportsmanTrainings, fetchPopularTrainings, fetchSpecialTrainings, fetchTrainings } from '../actions/training-action';
import { StoreSlice } from '../../const';

const initialState: TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: false,
  forSportsmanTrainings: [],
  isFetchSpecialTrainingsExecuting: false,
  specialTrainings: [],
  isFetchPopularTrainingsExecuting: false,
  popularTrainings: [],
  isFetchTrainingsExecuting: false,
  trainings: [],
  isFetchDetailTrainingExecuting: false,
  detailTraining: null
};

export const trainingProcess = createSlice(
  {
    name: StoreSlice.TrainingProcess,
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
        )
        .addCase(
          fetchSpecialTrainings.pending,
          (state) => {
            state.isFetchSpecialTrainingsExecuting = true;
          }
        )
        .addCase(
          fetchSpecialTrainings.rejected,
          (state) => {
            state.isFetchSpecialTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchSpecialTrainings.fulfilled,
          (state, action) => {
            state.specialTrainings = action.payload;
            state.isFetchSpecialTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchPopularTrainings.pending,
          (state) => {
            state.isFetchPopularTrainingsExecuting = true;
          }
        )
        .addCase(
          fetchPopularTrainings.rejected,
          (state) => {
            state.isFetchPopularTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchPopularTrainings.fulfilled,
          (state, action) => {
            state.popularTrainings = action.payload;
            state.isFetchPopularTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchTrainings.pending,
          (state) => {
            state.isFetchTrainingsExecuting = true;
          }
        )
        .addCase(
          fetchTrainings.rejected,
          (state) => {
            state.isFetchTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchTrainings.fulfilled,
          (state, action) => {
            state.trainings = action.payload;
            state.isFetchTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchDetailTraining.pending,
          (state) => {
            state.isFetchDetailTrainingExecuting = true;
          }
        )
        .addCase(
          fetchDetailTraining.rejected,
          (state) => {
            state.isFetchDetailTrainingExecuting = false;
          }
        )
        .addCase(
          fetchDetailTraining.fulfilled,
          (state, action) => {
            state.detailTraining = action.payload;
            state.isFetchDetailTrainingExecuting = false;
          }
        );
    }
  }
);
