import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process';
import { StoreSlice } from '../const';

const reducers = {
  [StoreSlice.UserProcess]: userProcess.reducer
};

export const rootReducer = combineReducers(reducers);
