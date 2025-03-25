import { createSlice } from '@reduxjs/toolkit';

import { UserInfoProcess } from '../../types/user-info-process';
import { changeReadyForTraning, fetchUserInfo } from '../user-info-action';
import { StoreSlice } from '../../const';

const initialState: UserInfoProcess = {
  isFetchUserInfoExecuting: false,
  isReadyForTrainingChangeExecuting: false,
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
            state.readyForTraining = action.payload.questionnaire.readyForTraining;
            state.isFetchUserInfoExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraning.pending,
          (state) => {
            state.isReadyForTrainingChangeExecuting = true;
          }
        )
        .addCase(
          changeReadyForTraning.rejected,
          (state) => {
            state.isReadyForTrainingChangeExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraning.fulfilled,
          (state, action) => {
            state.readyForTraining = action.payload;
            state.isReadyForTrainingChangeExecuting = false;
          }
        );
    }
  }
);
