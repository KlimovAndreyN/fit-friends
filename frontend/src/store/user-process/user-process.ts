import { createSlice } from '@reduxjs/toolkit';

import type { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../types/types';
import { fetchUserStatus, loginUser, logoutUser } from '../action';
import { StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: ''
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.userEmail = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.userEmail = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userEmail = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userEmail = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
