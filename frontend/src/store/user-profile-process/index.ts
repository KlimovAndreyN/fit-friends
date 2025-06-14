import { createSlice } from '@reduxjs/toolkit';

import { isCoachRole, TrainingLevel } from '@backend/shared/core';

import { UserProfileProcess } from '../../types/process/user-profile.process';
import {
  fetchLookForCompanyUserProfiles, fetchUsersProfiles, fetchFriends, fetchDetailUserProfile,
  changeIsFriendUserProfile, createTrainingRequest, updateTrainingRequest
} from '../actions/user-profile-action';
import { StoreSlice } from '../../const';

const Default = {
  PAGE: 0, //! для друзей и пользователей начнем с 0 чтобы не делать isFriendsActivate / isUsersFilterActive
  FIRST_PAGE: 1,
  LIMIT: 6,
  TRANING_LEVEL: TrainingLevel.Amateur
} as const;

const initialState: UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: false,
  lookForCompanyUserProfiles: [],

  usersProfilesFilter: {
    page: Default.PAGE,
    limit: Default.LIMIT,
    trainingLevel: Default.TRANING_LEVEL
  },
  isFetchUsersProfilesExecuting: false,
  usersProfiles: [],
  isHaveMoreUsersProfiles: false,

  isFetchFriendsExecuting: false,
  friends: [],
  pageFriends: Default.PAGE,
  isHaveMoreFriends: false,

  isFetchDetailUserProfileExecuting: false,
  isFetchDetailUserProfileError: false,
  detailUserProfile: null,
  isFriendUserProfile: false,
  isFriendUserProfileChangeExecuting: false,
  personalTrainingRequest: null,
  isCreateRequestExecuting: false,
  isUpdateRequestExecuting: false
};

export const userProfileProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {
      clearUsersCatalog: (state) => {
        state.usersProfilesFilter = initialState.usersProfilesFilter;
        state.isFetchUsersProfilesExecuting = initialState.isFetchUsersProfilesExecuting;
        state.usersProfiles = initialState.usersProfiles;
        state.isHaveMoreUsersProfiles = initialState.isHaveMoreUsersProfiles;
      },
      clearFriends: (state) => {
        state.isFetchFriendsExecuting = initialState.isFetchFriendsExecuting;
        state.friends = initialState.friends;
        state.pageFriends = initialState.pageFriends;
        state.isHaveMoreFriends = initialState.isHaveMoreFriends;
      },
      clearDetailUserProfile: (state) => {
        state.detailUserProfile = initialState.detailUserProfile;
        state.isFriendUserProfile = initialState.isFriendUserProfile;
        state.personalTrainingRequest = initialState.personalTrainingRequest;
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
          (state, { payload, meta: { arg } }) => {
            const { entities, currentPage, totalPages } = payload;

            if (currentPage === Default.FIRST_PAGE) {
              state.usersProfiles = entities;
              state.usersProfilesFilter = arg;
            } else {
              state.usersProfiles.push(...entities);
            }

            state.usersProfilesFilter.page = currentPage; // если вынести page отдельно, то не будет рендер фильтра, если он будет сделано отдельно
            state.isHaveMoreUsersProfiles = currentPage < totalPages;
            state.isFetchUsersProfilesExecuting = false;
          }
        )
        .addCase(
          fetchFriends.pending,
          (state) => {
            state.isFetchFriendsExecuting = true;
          }
        )
        .addCase(
          fetchFriends.rejected,
          (state) => {
            state.friends = initialState.friends;
            state.isFetchFriendsExecuting = false;
          }
        )
        .addCase(
          fetchFriends.fulfilled,
          (state, { payload }) => {
            const { entities, currentPage, totalPages } = payload;

            // тут как бы без разницы, т.к. нет других фильтров
            if (currentPage === Default.FIRST_PAGE) {
              state.friends = entities;
            } else {
              state.friends.push(...entities);
            }

            state.pageFriends = currentPage;
            state.isHaveMoreFriends = currentPage < totalPages;
            state.isFetchFriendsExecuting = false;
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
            state.isFriendUserProfile = payload.isFriend;
            state.personalTrainingRequest = payload.personalTrainingRequest;
            state.isFetchDetailUserProfileExecuting = false;
          }
        )
        .addCase(
          changeIsFriendUserProfile.pending,
          (state) => {
            state.isFriendUserProfileChangeExecuting = true;
          }
        )
        .addCase(
          changeIsFriendUserProfile.rejected,
          (state) => {
            state.isFriendUserProfileChangeExecuting = false;
          }
        )
        .addCase(
          changeIsFriendUserProfile.fulfilled,
          (state, { payload, meta: { arg: { userId } } }) => {
            state.isFriendUserProfile = payload;
            state.isFriendUserProfileChangeExecuting = false;

            // если удалили из друзей, то удаляем из списка
            if (!payload) {
              state.friends = state.friends.filter((friend) => (friend.id !== userId));
            }
          }
        )
        .addCase(
          createTrainingRequest.pending,
          (state) => {
            state.isCreateRequestExecuting = true;
          }
        )
        .addCase(
          createTrainingRequest.rejected,
          (state) => {
            state.isCreateRequestExecuting = false;
          }
        )
        .addCase(
          createTrainingRequest.fulfilled,
          (state, { payload, meta: { arg: { userId } } }) => {
            // в детальной карточке изменяем статус
            if (state.detailUserProfile && isCoachRole(state.detailUserProfile.user.role)) {
              state.personalTrainingRequest = payload;
            }

            // добавляем запрос в список друзей к нужному другу
            const friend = state.friends.find((item) => (item.id === userId));

            if (friend) {
              if (isCoachRole(friend.role)) {
                friend.personalTrainingRequest = payload;
              } else {
                friend.outJointTrainingRequest = payload;
              }
            }

            state.isCreateRequestExecuting = false;
          }
        )
        .addCase(
          updateTrainingRequest.pending,
          (state) => {
            state.isUpdateRequestExecuting = true;
          }
        )
        .addCase(
          updateTrainingRequest.rejected,
          (state) => {
            state.isUpdateRequestExecuting = false;
          }
        )
        .addCase(
          updateTrainingRequest.fulfilled,
          (state, { payload, meta: { arg: { trainingRequestId } } }) => {
            // добавляем запрос в список друзей к нужному другу
            state.friends.some((friend) => {
              if (friend.inJointTrainingRequest?.id === trainingRequestId) {
                friend.inJointTrainingRequest = payload;

                return true;
              }

              if (friend.personalTrainingRequest?.id === trainingRequestId) {
                friend.personalTrainingRequest = payload;

                return true;
              }
            });

            state.isUpdateRequestExecuting = false;
          }
        );
    }
  }
);

export const { /*setUsersProfilesFilter, getNextPage, setIsUsersFilterActivate,*/ clearUsersCatalog, clearFriends, clearDetailUserProfile, resetUserProfileProcess } = userProfileProcess.actions;
