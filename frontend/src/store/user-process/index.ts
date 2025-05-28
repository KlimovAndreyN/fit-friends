import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProcess } from '../../types/process/user.process';
import { AuthorizationStatus } from '../../types/types';
import { fetchUserStatus, loginUser, logoutUser, registerUser } from '../actions/user-action';
import { AppRoute, DefaultUser, StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSingInExecuting: false,
  isSingUpExecuting: false,
  userRole: DefaultUser.ROLE,

  prevLocation: AppRoute.Index,

  isIndexPageActivate: false
};

export const userProcess = createSlice(
  {
    name: StoreSlice.UserProcess,
    initialState,
    reducers: {
      setPrevLocation: (state, { payload }: PayloadAction<AppRoute>) => {
        state.prevLocation = payload;
      },
      setIsIndexPageActivate: (state, { payload }: PayloadAction<boolean>) => {
        state.isIndexPageActivate = payload;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(
          fetchUserStatus.rejected,
          (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          fetchUserStatus.fulfilled,
          (state, { payload: { role } }) => {
            state.userRole = role;
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
          (state, { payload: { role } }) => {
            state.isSingInExecuting = false;
            state.userRole = role;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          logoutUser.fulfilled,
          (state, { payload }) => {
            if (payload) {
              state.authorizationStatus = AuthorizationStatus.NoAuth;
            }
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

export const { setPrevLocation, setIsIndexPageActivate } = userProcess.actions;
