import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process';
import { accountProcess } from './account-process';
import { trainingProcess } from './training-process';
import { reviewProcess } from './review-process';
import { StoreSlice } from '../const';

const reducers = {
  [StoreSlice.UserProcess]: userProcess.reducer,
  [StoreSlice.UserProfileProcess]: accountProcess.reducer,
  [StoreSlice.TrainingProcess]: trainingProcess.reducer,
  [StoreSlice.ReviewProcess]: reviewProcess.reducer
};

export const rootReducer = combineReducers(reducers);
