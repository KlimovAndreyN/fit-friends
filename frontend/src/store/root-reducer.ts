import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process';
import { userProfileProcess } from './user-profile-process';
import { trainingProcess } from './training-process';
import { reviewProcess } from './review-process';
import { StoreSlice } from '../const';

const reducers = {
  [StoreSlice.UserProcess]: userProcess.reducer,
  [StoreSlice.UserProfileProcess]: userProfileProcess.reducer,
  [StoreSlice.TrainingProcess]: trainingProcess.reducer,
  [StoreSlice.ReviewProcess]: reviewProcess.reducer
};

export const rootReducer = combineReducers(reducers);
