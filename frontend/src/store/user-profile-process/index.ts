import { createSlice } from '@reduxjs/toolkit';

import { UserInfoProcess } from '../../types/user-profile-process';
import { changeReadyForTraining, createQuestionnaire, existQuestionnaire, fetchUserInfo, updateUserInfo } from '../user-profile-action';
import { StoreSlice } from '../../const';

const initialState: UserInfoProcess = {
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserInfoExecuting: false,
  isUpdateUserInfoExecuting: false,
  isUpdateUserInfoError: false,
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
          updateUserInfo.pending,
          (state) => {
            state.isUpdateUserInfoError = false;
            state.isUpdateUserInfoExecuting = true;
          }
        )
        .addCase(
          updateUserInfo.rejected,
          (state) => {
            state.isUpdateUserInfoError = true;
            state.isUpdateUserInfoExecuting = false;
          }
        )
        .addCase(
          updateUserInfo.fulfilled,
          (state, action) => {
            state.userInfo = action.payload;
            state.isUpdateUserInfoError = false;
            state.isUpdateUserInfoExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraining.pending,
          (state) => {
            state.isReadyForTrainingChangeExecuting = true;
          }
        )
        .addCase(
          changeReadyForTraining.rejected,
          (state) => {
            state.isReadyForTrainingChangeExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraining.fulfilled,
          (state, action) => {
            state.readyForTraining = action.payload;
            state.isReadyForTrainingChangeExecuting = false;
          }
        );
    }
  }
);
