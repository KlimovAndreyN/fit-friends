import { createSlice } from '@reduxjs/toolkit';

import { UserInfoProcess } from '../../types/user-info-process';
import { changeReadyForTraning, createQuestionnaire, existQuestionnaire, fetchUserInfo } from '../user-info-action';
import { StoreSlice } from '../../const';

const initialState: UserInfoProcess = {
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserInfoExecuting: false,
  isReadyForTrainingChangeExecuting: false,
  existQuestionnaire: false,
  userInfo: null,
  readyForTraining: undefined
};

export const userInfoProcess = createSlice(
  {
    name: StoreSlice.UserInfoProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          existQuestionnaire.pending,
          (state) => {
            state.isExistQuestionnaireExecuting = true;
          }
        )
        .addCase(
          existQuestionnaire.rejected,
          (state) => {
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          existQuestionnaire.fulfilled,
          (state, action) => {
            state.existQuestionnaire = action.payload;
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.pending,
          (state) => {
            state.isCreateQuestionnaireExecuting = true;
          }
        )
        .addCase(
          createQuestionnaire.rejected,
          (state) => {
            state.isCreateQuestionnaireExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.fulfilled,
          (state) => {
            state.existQuestionnaire = true;
            state.isCreateQuestionnaireExecuting = false;
          }
        )
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
