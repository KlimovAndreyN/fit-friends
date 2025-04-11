import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process';
import { userProfileProcess } from './user-profile-process';
import { StoreSlice } from '../const';

const reducers = {
  [StoreSlice.UserProcess]: userProcess.reducer,
  [StoreSlice.UserProfileProcess]: userProfileProcess.reducer
};

export const rootReducer = combineReducers(reducers);
