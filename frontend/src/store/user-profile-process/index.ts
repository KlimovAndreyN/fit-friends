import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserQuery, TrainingLevel } from '@backend/shared/core';

import { UserProfileProcess } from '../../types/process/user-profile.process';
import { fetchLookForCompanyUserProfiles, fetchUsersProfiles, fetchDetailUserProfile } from '../actions/user-profile-action';
import { StoreSlice } from '../../const';

const Default = {
  PAGE: 1,
  LEVEL: TrainingLevel.Amateur
} as const;

const initialState: UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: false,
  lookForCompanyUserProfiles: [],

  usersProfilesFilter: { page: Default.PAGE, level: Default.LEVEL },
  isFristPage: true,
  isUsersProfilesFilterActivate: false,
  isFetchUsersProfilesExecuting: false,
  usersProfiles: [],
  isHaveMoreUsersProfiles: false,

  isFetchDetailUserProfileExecuting: false,
  isFetchDetailUserProfileError: false,
  detailUserProfile: null
};

export const userProfileProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {
      setUsersProfilesFilter: (state, { payload }: PayloadAction<IUserQuery>) => {
        state.isFristPage = true;
        state.usersProfilesFilter = { ...state.usersProfilesFilter, ...payload, page: Default.PAGE };
      },
      getNextPage: (state) => {
        const { usersProfilesFilter: { page }, isHaveMoreUsersProfiles } = state;

        if (page && isHaveMoreUsersProfiles) {
          state.isFristPage = false;
          state.usersProfilesFilter = { ...state.usersProfilesFilter, page: page + 1 };
        }
      },
      setIsUsersFilterActivate: (state, { payload }: PayloadAction<boolean>) => {
        state.isUsersProfilesFilterActivate = payload;

        if (!payload) {
          state.usersProfilesFilter = { ...initialState.usersProfilesFilter };
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
          fetchUsersProfiles.pending,
          (state) => {
            state.isFetchUsersProfilesExecuting = true;
          }
        )
        .addCase(
          fetchUsersProfiles.rejected,
          (state) => {
            state.usersProfiles = initialState.usersProfiles;
            state.isFetchUsersProfilesExecuting = false;
          }
        )
        .addCase(
          fetchUsersProfiles.fulfilled,
          (state, { payload }) => {
            const { entities, currentPage, totalPages } = payload;

            if (state.isFristPage) {
              state.usersProfiles = entities;
            } else {
              state.usersProfiles.push(...entities);
            }

            state.isHaveMoreUsersProfiles = currentPage < totalPages;
            state.isFetchUsersProfilesExecuting = false;
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

export const { setUsersProfilesFilter, getNextPage, setIsUsersFilterActivate, clearDetailUserProfile, resetUserProfileProcess } = userProfileProcess.actions;
