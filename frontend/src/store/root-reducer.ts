import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process';
import { userInfoProcess } from './user-info-process';
import { StoreSlice } from '../const';

const reducers = {
  [StoreSlice.UserProcess]: userProcess.reducer,
  [StoreSlice.UserInfoProcess]: userInfoProcess.reducer
};

export const rootReducer = combineReducers(reducers);
