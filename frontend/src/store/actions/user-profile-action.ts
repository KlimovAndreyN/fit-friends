import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUserProfileRdo, IDetailUserProfileRdo, UserProfileRoute,
  ApiServiceRoute, IUsersProfilesWithPaginationRdo, IUserProfileQuery
} from '@backend/shared/core';
import { getQueryString, joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_LOOK_FOR_COMPANY_USERS_PROFILES: 'user-profile/fetch-look-for-company-users-profiles',
  FETCH_USERS_PROFILES: 'user-profile/fetch-users-profiles',
  FETCH_USER_PROFILE: 'user-profile/fetch-user-profile'
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

export const fetchDetailUserProfile = createAsyncThunk<IDetailUserProfileRdo, string, { extra: Extra }>(
  Action.FETCH_USER_PROFILE,
  async (userId, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IDetailUserProfileRdo>(joinUrl(ApiServiceRoute.UsersProfiles, userId));

    return data;
  }
);
