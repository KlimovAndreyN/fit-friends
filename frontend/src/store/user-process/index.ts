import { createSlice } from '@reduxjs/toolkit';

import { UserProcess } from '../../types/user-process';
import { AuthorizationStatus } from '../../types/types';
import { fetchUserStatus, loginUser, logoutUser, registerUser } from '../action';
import { StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSingInExecuting: false,
  isSingUpExecuting: false,
  isQuestionnaireExecuting: false,
  userInfo: null
};

export const userProcess = createSlice(
  {
    name: StoreSlice.UserProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          fetchUserStatus.rejected,
          (state) => {
            state.userInfo = null;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          fetchUserStatus.fulfilled,
          (state, action) => {
            state.userInfo = action.payload;
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
            state.userInfo = action.payload;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          logoutUser.pending, // сразу выйти и удалить
          //!logoutUser.rejected, // выход после отображения ошибоки удаления
          (state) => {
            state.userInfo = null;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          logoutUser.fulfilled, //! выход после отображения ошибоки удаления
          (state) => {
            state.userInfo = null;
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
        );
    }
  }
);
