import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITrainingQuery } from '@backend/shared/core';

import { TrainingProcess } from '../../types/process/training.process';
import {
  fetchDetailTraining, fetchTrainings, fetchPopularTrainings, crateTraining,
  fetchForSportsmanTrainings, fetchSpecialTrainings, fetchCoachTrainings
} from '../actions/training-action';
import { StoreSlice } from '../../const';

const Default = {
  PAGE: 1,
  LIMIT: 6,
  PRICE_MIN: 0,
  RATING_MAX: 5
} as const;

const initialState: TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: false,
  forSportsmanTrainings: [],

  isFetchSpecialTrainingsExecuting: false,
  specialTrainings: [],

  isFetchPopularTrainingsExecuting: false,
  popularTrainings: [],

  trainingsFilter: {
    page: Default.PAGE,
    limit: Default.LIMIT,
    priceMin: Default.PRICE_MIN,
    ratingMax: Default.RATING_MAX
  },
  isFristPage: true,
  isTrainingsFilterActivate: false,
  isFetchTrainingsExecuting: false,
  trainings: [],
  isHaveMoreTrainings: false,
  trainingsMaxPrice: undefined,

  isFetchDetailTrainingExecuting: false,
  isFetchDetailTrainingError: false,
  detailTraining: null,

  isCreateTrainingExecuting: false,

  isFetchCoachTrainingsExecuting: false,
  coachTrainings: []
};

export const trainingProcess = createSlice(
  {
    name: StoreSlice.TrainingProcess,
    initialState,
    reducers: {
      setTrainingsFilter: (state, { payload }: PayloadAction<ITrainingQuery>) => {
        state.isFristPage = true;
        state.trainingsFilter = { ...state.trainingsFilter, ...payload, page: 1 };
      },
      getNextPage: (state) => {
        const { trainingsFilter: { page }, isHaveMoreTrainings } = state;

        if (page && isHaveMoreTrainings) {
          state.isFristPage = false;
          state.trainingsFilter = { ...state.trainingsFilter, page: page + 1 };
        }
      },
      setIsTrainingsFilterActivate: (state, { payload }: PayloadAction<boolean>) => {
        state.isTrainingsFilterActivate = payload;

        if (!payload) {
          state.trainingsFilter = { ...initialState.trainingsFilter };
        }
      },
      clearDetailTraining: (state) => {
        state.detailTraining = null;
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
          (state, { payload }) => {
            state.forSportsmanTrainings = payload;
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
          (state, { payload }) => {
            state.specialTrainings = payload;
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
          (state, { payload }) => {
            state.popularTrainings = payload;
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
          (state, { payload }) => {
            const { entities, currentPage, totalPages, trainingsMaxPrice } = payload;

            if (state.isFristPage) {
              state.trainings = entities;
            } else {
              state.trainings.push(...entities);
            }

            state.isHaveMoreTrainings = currentPage < totalPages;
            state.trainingsMaxPrice = trainingsMaxPrice;
            state.isFetchTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchDetailTraining.pending,
          (state) => {
            state.isFetchDetailTrainingExecuting = true;
            state.isFetchDetailTrainingError = false;
          }
        )
        .addCase(
          fetchDetailTraining.rejected,
          (state) => {
            state.isFetchDetailTrainingError = true;
            state.isFetchDetailTrainingExecuting = false;
          }
        )
        .addCase(
          fetchDetailTraining.fulfilled,
          (state, { payload }) => {
            state.detailTraining = payload;
            state.isFetchDetailTrainingExecuting = false;
          }
        )
        .addCase(
          crateTraining.pending,
          (state) => {
            state.isCreateTrainingExecuting = true;
          }
        )
        .addCase(
          crateTraining.rejected,
          (state) => {
            state.isCreateTrainingExecuting = false;
          }
        )
        .addCase(
          crateTraining.fulfilled,
          (state) => {
            //! можно ничего не возвращать а направить на мои тренировки
            state.isCreateTrainingExecuting = false;
          }
        )
        .addCase(
          fetchCoachTrainings.pending,
          (state) => {
            state.isFetchCoachTrainingsExecuting = true;
          }
        )
        .addCase(
          fetchCoachTrainings.rejected,
          (state) => {
            state.coachTrainings = initialState.coachTrainings;
            state.isFetchCoachTrainingsExecuting = false;
          }
        )
        .addCase(
          fetchCoachTrainings.fulfilled,
          (state, { payload }) => {
            state.coachTrainings = payload;
            state.isFetchCoachTrainingsExecuting = false;
          }
        );
    }
  }
);

export const { setTrainingsFilter, getNextPage, setIsTrainingsFilterActivate, clearDetailTraining } = trainingProcess.actions;
