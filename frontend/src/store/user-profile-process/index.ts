import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserQuery, TrainingLevel } from '@backend/shared/core';

import { UserProfileProcess } from '../../types/process/user-profile.process';
import { fetchLookForCompanyUserProfiles, fetchUsers, fetchDetailUserProfile } from '../actions/user-profile-action';
import { StoreSlice } from '../../const';

const Default = {
  PAGE: 1,
  LEVEL: TrainingLevel.Amateur
} as const;

const initialState: UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: false,
  lookForCompanyUserProfiles: [],

  usersFilter: { page: Default.PAGE, level: Default.LEVEL },
  isFristPage: true,
  isUsersFilterActivate: false,
  isFetchUsersExecuting: false,
  users: [],
  isHaveMoreUsers: false,

  isFetchDetailUserProfileExecuting: false,
  isFetchDetailUserProfileError: false,
  detailUserProfile: null
};

export const userProfileProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {
      setUsersFilter: (state, { payload }: PayloadAction<IUserQuery>) => {
        state.isFristPage = true;
        state.usersFilter = { ...state.usersFilter, ...payload, page: Default.PAGE };
      },
      getNextPage: (state) => {
        const { usersFilter: { page }, isHaveMoreUsers } = state;

        if (page && isHaveMoreUsers) {
          state.isFristPage = false;
          state.usersFilter = { ...state.usersFilter, page: page + 1 };
        }
      },
      setIsUsersFilterActivate: (state, { payload }: PayloadAction<boolean>) => {
        state.isUsersFilterActivate = payload;

        if (!payload) {
          state.usersFilter = { ...initialState.usersFilter };
        }
      },
      clearDetailUserProfile: (state) => {
        state.detailUserProfile = initialState.detailUserProfile;
      },
      resetUserProfileProcess: () => initialState
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
          fetchUsers.pending,
          (state) => {
            state.isFetchUsersExecuting = true;
          }
        )
        .addCase(
          fetchUsers.rejected,
          (state) => {
            state.users = initialState.users;
            state.isFetchUsersExecuting = false;
          }
        )
        .addCase(
          fetchUsers.fulfilled,
          (state, { payload }) => {
            const { entities, currentPage, totalPages } = payload;

            if (state.isFristPage) {
              state.users = entities;
            } else {
              state.users.push(...entities);
            }

            state.isHaveMoreUsers = currentPage < totalPages;
            state.isFetchUsersExecuting = false;
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

export const { setUsersFilter, getNextPage, setIsUsersFilterActivate, clearDetailUserProfile, resetUserProfileProcess } = userProfileProcess.actions;
