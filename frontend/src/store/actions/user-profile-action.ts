import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUserProfileRdo, IDetailUserProfileRdo, UserProfileRoute, IPageQuery,
  ApiServiceRoute, IUsersProfilesWithPaginationRdo, IUserProfileQuery,
  ICreateTrainingRequestDto, ITrainingRequestRdo
} from '@backend/shared/core';
import { getQueryString, joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_LOOK_FOR_COMPANY_USERS_PROFILES: 'user-profile/fetch-look-for-company-users-profiles',
  FETCH_USERS_PROFILES: 'user-profile/fetch-users-profiles',
  FETCH_FRIENDS: 'user-profile/fetch-friends',
  FETCH_USER_PROFILE: 'user-profile/fetch-user-profile',
  CHANGE_IS_FRIEND_USER_PROFILE: 'user-profile/change-is-friend-user-profile',
  CREATE_PERSONAL_TRAINING_REQUEST: 'user-profile/create-personal-training-request'
};

export const fetchLookForCompanyUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_LOOK_FOR_COMPANY_USERS_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, UserProfileRoute.LookForCompany);
    const { data } = await api.get<IUserProfileRdo[]>(url);

    return data;
  }
);

export const fetchUsersProfiles = createAsyncThunk<IUsersProfilesWithPaginationRdo, IUserProfileQuery, { extra: Extra }>(
  Action.FETCH_USERS_PROFILES,
  async (query, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, getQueryString(query));
    const { data } = await api.get<IUsersProfilesWithPaginationRdo>(url);

    return data;
  }
);

export const fetchFriends = createAsyncThunk<IUsersProfilesWithPaginationRdo, IPageQuery, { extra: Extra }>(
  Action.FETCH_FRIENDS,
  async (query, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, UserProfileRoute.Friends, getQueryString(query));
    const { data } = await api.get<IUsersProfilesWithPaginationRdo>(url);

    return data;
  }
);

export const fetchDetailUserProfile = createAsyncThunk<IDetailUserProfileRdo, string, { extra: Extra }>(
  Action.FETCH_USER_PROFILE,
  async (userId, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IDetailUserProfileRdo>(joinUrl(ApiServiceRoute.UsersProfiles, userId));

    return data;
  }
);

export const changeIsFriendUserProfile = createAsyncThunk<boolean, { userId: string; isFriend: boolean }, { extra: Extra }>(
  Action.CHANGE_IS_FRIEND_USER_PROFILE,
  async ({ userId, isFriend }, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, UserProfileRoute.Friends);

    if (isFriend) {
      await api.post(url, { userId });
    } else {
      await api.delete(joinUrl(url, userId));
    }

    return isFriend;
  }
);

export const createPersonalTrainingRequest = createAsyncThunk<ITrainingRequestRdo, ICreateTrainingRequestDto, { extra: Extra }>(
  Action.CREATE_PERSONAL_TRAINING_REQUEST,
  async (dto, { extra }) => {
    const { api } = extra;
    const { data: trainingRequest } = await api.post<ITrainingRequestRdo>(ApiServiceRoute.TrainingsRequests, dto);

    return trainingRequest;
  }
);
