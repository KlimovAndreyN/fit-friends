import { createSlice } from '@reduxjs/toolkit';

import { UserInfoProcess } from '../../types/user-info-process';
import { fetchUserInfo } from '../user-info-action';
import { StoreSlice } from '../../const';

const initialState: UserInfoProcess = {
  isFetchUserInfoExecuting: false,
  userInfo: null
};

export const userInfoProcess = createSlice(
  {
    name: StoreSlice.UserInfoProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          fetchUserInfo.pending,
          (state) => {
            state.isFetchUserInfoExecuting = true;
          }
        )
        .addCase(
          fetchUserInfo.rejected,
          (state) => {
            state.isFetchUserInfoExecuting = false;
          }
        )
        .addCase(
          fetchUserInfo.fulfilled,
          (state, action) => {
            state.userInfo = action.payload;
            state.isFetchUserInfoExecuting = false;
          }
        );
    }
  }
);
