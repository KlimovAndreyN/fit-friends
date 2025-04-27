import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITrainingQuery } from '@backend/shared/core';

import { TrainingProcess } from '../../types/process/training.process';
import {
  fetchDetailTraining, fetchTrainings, fetchPopularTrainings,
  fetchForSportsmanTrainings, fetchSpecialTrainings
} from '../actions/training-action';
import { StoreSlice } from '../../const';

const initialState: TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: false,
  forSportsmanTrainings: [],

  isFetchSpecialTrainingsExecuting: false,
  specialTrainings: [],

  isFetchPopularTrainingsExecuting: false,
  popularTrainings: [],

  trainingsFilter: {
    page: 1,
    priceMin: 0,
    ratingMax: 5
  },
  isTrainingsFilterActivate: false,
  isFetchTrainingsExecuting: false,
  trainings: [],
  isHaveMoreTrainings: false,
  trainingsMaxPrice: undefined,

  isFetchDetailTrainingExecuting: false,
  detailTraining: null
};

export const trainingProcess = createSlice(
  {
    name: StoreSlice.TrainingProcess,
    initialState,
    reducers: {
      setTrainingsFilter: (state, action: PayloadAction<ITrainingQuery>) => {
        console.log('setTrainingsFilter - action.payload', action.payload);

        state.trainingsFilter = { ...state.trainingsFilter, ...action.payload };
      },
      setIsTrainingsFilterActivate: (state, action: PayloadAction<boolean>) => {
        state.isTrainingsFilterActivate = action.payload;
      }
    },
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
            state.forSportsmanTrainings = initialState.forSportsmanTrainings;
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
            state.specialTrainings = initialState.specialTrainings;
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
            state.popularTrainings = initialState.popularTrainings;
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
            state.trainings = initialState.trainings;
            state.isFetchTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchTrainings.fulfilled,
          (state, action) => {
            const { entities, currentPage, totalPages, trainingsMaxPrice } = action.payload;

            //! отладка временно отключил!
            //!state.trainings.push(...entities);
            state.trainings = entities;
            state.isHaveMoreTrainings = currentPage < totalPages;
            state.trainingsMaxPrice = trainingsMaxPrice;
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
            state.detailTraining = initialState.detailTraining;
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

export const { setTrainingsFilter, setIsTrainingsFilterActivate } = trainingProcess.actions;
