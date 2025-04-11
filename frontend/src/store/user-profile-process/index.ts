import { createSlice } from '@reduxjs/toolkit';

import { UserProfileProcess } from '../../types/user-profile-process';
import { changeReadyForTraining, createQuestionnaire, existQuestionnaire, fetchUserProfile, updateUserProfile } from '../user-profile-action';
import { StoreSlice } from '../../const';

const initialState: UserProfileProcess = {
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserProfileExecuting: false,
  isUpdateUserProfileExecuting: false,
  isUpdateUserProfileError: false,
  isReadyForTrainingChangeExecuting: false,
  existQuestionnaire: false,
  userProfile: null,
  readyForTraining: undefined
};

export const userProfileProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
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
          fetchUserProfile.pending,
          (state) => {
            state.isFetchUserProfileExecuting = true;
          }
        )
        .addCase(
          fetchUserProfile.rejected,
          (state) => {
            state.isFetchUserProfileExecuting = false;
          }
        )
        .addCase(
          fetchUserProfile.fulfilled,
          (state, action) => {
            state.userProfile = action.payload;
            state.readyForTraining = action.payload.questionnaire.readyForTraining;
            state.isFetchUserProfileExecuting = false;
          }
        )
        .addCase(
          updateUserProfile.pending,
          (state) => {
            state.isUpdateUserProfileError = false;
            state.isUpdateUserProfileExecuting = true;
          }
        )
        .addCase(
          updateUserProfile.rejected,
          (state) => {
            state.isUpdateUserProfileError = true;
            state.isUpdateUserProfileExecuting = false;
          }
        )
        .addCase(
          updateUserProfile.fulfilled,
          (state, action) => {
            state.userProfile = action.payload;
            state.isUpdateUserProfileError = false;
            state.isUpdateUserProfileExecuting = false;
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
