import { createSlice } from '@reduxjs/toolkit';

import { UserProcess } from '../../types/user-process';
import { AuthorizationStatus } from '../../types/types';
import { createQuestionnaire, existQuestionnaire, fetchUserStatus, loginUser, logoutUser, registerUser } from '../user-action';
import { StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSingInExecuting: false,
  isSingUpExecuting: false,
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  existQuestionnaire: false,
  userRole: undefined
};

export const userProcess = createSlice(
  {
    name: StoreSlice.UserProcess,
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
          fetchUserStatus.rejected,
          (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          fetchUserStatus.fulfilled,
          (state, action) => {
            state.userRole = action.payload.role;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          loginUser.pending,
          (state) => {
            state.isSingInExecuting = true;
          }
        )
        .addCase(
          loginUser.rejected,
          (state) => {
            state.isSingInExecuting = false;
          }
        )
        .addCase(
          loginUser.fulfilled,
          (state, action) => {
            state.isSingInExecuting = false;
            state.userRole = action.payload.role;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          logoutUser.pending, //! перепроверить - сразу выйти и удалить
          //! перепроверить - logoutUser.rejected, //! перепроверить - выход после отображения ошибоки удаления
          (state) => {
            state.userRole = undefined;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          logoutUser.fulfilled, //! перепроверить - выход после отображения ошибоки удаления
          (state) => {
            state.userRole = undefined;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          registerUser.pending,
          (state) => {
            state.isSingUpExecuting = true;
          }
        )
        .addCase(
          registerUser.rejected,
          (state) => {
            state.isSingUpExecuting = false;
          }
        )
        .addCase(
          registerUser.fulfilled,
          (state) => {
            state.isSingUpExecuting = false;
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
        );
    }
  }
);
