import { createSlice } from '@reduxjs/toolkit';

import { UserProfileProcess } from '../../types/process/user-profile.process';
import { fetchLookForCompanyUserProfiles, fetchUserProfiles, fetchDetailUserProfile } from '../actions/user-profile-action';
import { StoreSlice } from '../../const';

const initialState: UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: false,
  lookForCompanyUserProfiles: [],

  isFetchUserProfilesExecuting: false,
  userProfiles: [],

  isFetchDetailUserProfileExecuting: false,
  isFetchDetailUserProfileError: false,
  detailUserProfile: null
};

export const userProfileProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {
      clearDetailUserProfile: (state) => {
        state.detailUserProfile = null;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(
          fetchLookForCompanyUserProfiles.pending,
          (state) => {
            state.isFetchLookForCompanyUserProfilesExecuting = true;
          }
        )
        .addCase(
          fetchLookForCompanyUserProfiles.rejected,
          (state) => {
            state.lookForCompanyUserProfiles = initialState.lookForCompanyUserProfiles;
            state.isFetchLookForCompanyUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchLookForCompanyUserProfiles.fulfilled,
          (state, { payload }) => {
            state.lookForCompanyUserProfiles = payload;
            state.isFetchLookForCompanyUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchUserProfiles.pending,
          (state) => {
            state.isFetchUserProfilesExecuting = true;
          }
        )
        .addCase(
          fetchUserProfiles.rejected,
          (state) => {
            state.userProfiles = initialState.userProfiles;
            state.isFetchUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchUserProfiles.fulfilled,
          (state, { payload }) => {
            state.userProfiles = payload;
            state.isFetchUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchDetailUserProfile.pending,
          (state) => {
            state.isFetchDetailUserProfileExecuting = true;
            state.isFetchDetailUserProfileError = false;
          }
        )
        .addCase(
          fetchDetailUserProfile.rejected,
          (state) => {
            state.isFetchDetailUserProfileError = true;
            state.isFetchDetailUserProfileExecuting = false;
          }
        )
        .addCase(
          fetchDetailUserProfile.fulfilled,
          (state, { payload }) => {
            state.detailUserProfile = payload;
            state.isFetchDetailUserProfileExecuting = false;
          }
        );
    }
  }
);

export const { clearDetailUserProfile } = userProfileProcess.actions;
