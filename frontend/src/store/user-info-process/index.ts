import { createSlice } from '@reduxjs/toolkit';

import { UserInfoProcess } from '../../types/user-info-process';
import { changeReadyForTraning, createQuestionnaire, existQuestionnaire, fetchUserInfo, updateUserInfo } from '../user-info-action';
import { StoreSlice } from '../../const';
import { IUserInfoRdo } from '@backend/shared';

const initialState: UserInfoProcess = {
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserInfoExecuting: false,
  isUpdateUserInfoExecuting: false,
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
            state.isUpdateUserInfoExecuting = true;
          }
        )
        .addCase(
          updateUserInfo.rejected,
          (state) => {
            state.isUpdateUserInfoExecuting = false;
          }
        )
        .addCase(
          updateUserInfo.fulfilled,
          (state, action) => {
            //! state.userInfo = action.payload;
            //! временно
            const aaa: IUserInfoRdo = { questionnaire: { ...(action.payload.questionnaire) }, user: { ...(state.userInfo?.user) } };
            state.userInfo = aaa;
            //! почемуто не прошло обновление данных....
            //
            state.isUpdateUserInfoExecuting = false;
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
